import * as cdk from "@aws-cdk/core";
import { CloudFrontToApiGatewayToLambda } from '@aws-solutions-constructs/aws-cloudfront-apigateway-lambda';
import * as lambda from "@aws-cdk/aws-lambda";
import * as path from "path";
import { spawnSync, SpawnSyncOptions } from "child_process";
import * as dynamodb from "@aws-cdk/aws-dynamodb";



// import * as sqs from 'aws-cdk-lib/aws-sqs';

export class CdkStack extends cdk.Stack {
    constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
        super(scope, id, props);


        const handlerName = "bootstrap"
        const buildEnv = { CGO_ENABLED: "0", GOOS: "linux", GOARCH: "amd64" };
        const commandsEntry = path.join(__dirname, "../functions/api");




        const table = new dynamodb.Table(this, 'Table', {
            partitionKey: { name: 'id', type: dynamodb.AttributeType.STRING },
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            readCapacity: 1,
            writeCapacity: 1,
        });
        // 実行時環境変数
        const commandsEnv = {
            TABLENAME: table.tableName,
        };

        const cfagwl = new CloudFrontToApiGatewayToLambda(this, 'test-cloudfront-apigateway-lambda', {
            lambdaFunctionProps: {
                runtime: lambda.Runtime.GO_1_X,
                // This assumes a handler function in lib/lambda/index.js
                code: code(commandsEntry, handlerName, buildEnv),
                handler: handlerName,
            }
        });

        table.grantFullAccess(cfagwl.lambdaFunction);

        new cdk.CfnOutput(this,"API_URL",{value: cfagwl.apiGateway.url})
        new cdk.CfnOutput(this,"CF_URL",{value: cfagwl.cloudFrontWebDistribution.toString()})


    }
}

/*
import { Stack, StackProps } from 'aws-cdk-lib';
import { Construct } from 'constructs';

export class CdkStack extends Stack {
constructor(scope: Construct, id: string, props?: StackProps) {
super(scope, id, props);


// The code that defines your stack goes here

// example resource
// const queue = new sqs.Queue(this, 'CdkQueue', {
//   visibilityTimeout: cdk.Duration.seconds(300)
// });
}
}

*/

function exec(command: string, options?: SpawnSyncOptions) {
    const proc = spawnSync("bash", ["-c", command], options);

    if (proc.error) {
        throw proc.error;
    }

    if (proc.status != 0) {
        if (proc.stdout || proc.stderr) {
            throw new Error(
                `[Status ${proc.status}] stdout: ${proc.stdout
                    ?.toString()
                    .trim()}\n\n\nstderr: ${proc.stderr?.toString().trim()}`
            );
        }
        throw new Error(`go exited with status ${proc.status}`);
    }

    return proc;
}

function code(codePath: string, handlerName: string, buildEnvs: { [key: string]: string }): lambda.AssetCode {
    return lambda.Code.fromAsset(codePath, {
        bundling: {
            // try to bundle on the local machine
            local: {
                tryBundle(outputDir: string) {
                    // make sure that we have all the required
                    // dependencies to build the executable locally.
                    // In this case we just check to make sure we have
                    // go installed
                    try {
                        exec("go version", {
                            stdio: [
                                // show output
                                "ignore", //ignore stdio
                                process.stderr, // redirect stdout to stderr
                                "inherit", // inherit stderr
                            ],
                        });
                    } catch {
                        // if we don't have go installed return false which
                        // tells the CDK to try Docker bundling
                        return false;
                    }

                    exec(
                        [
                            "go get -v ./...", // get package
                            "go test -v", // run tests first
                            `go build -o ${path.join(outputDir, handlerName)}`,
                        ].join(" && "),
                        {
                            env: { ...process.env, ...buildEnvs }, // environment variables to use when running the build command
                            stdio: [
                                // show output
                                "ignore", //ignore stdio
                                process.stderr, // redirect stdout to stderr
                                "inherit", // inherit stderr
                            ],
                            cwd: codePath, // where to run the build command from
                        }
                    );
                    return true;
                },
            },
            image: lambda.Runtime.GO_1_X.bundlingImage, // lambci/lambda:build-go1.x
            command: [
                "bash",
                "-c",
                [
                    "go get -v ./...",
                    "go test -v",
                    `go build -o /asset-output/${handlerName}`,
                ].join(" && "),
            ],
            environment: buildEnvs,
        },
    })
}
