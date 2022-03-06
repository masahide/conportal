<script lang="ts">
    import { Button, Col, Container, Row } from "sveltestrap";
</script>

<Container>
    <Row class="justify-content-sm-center">
        <Col sm={10} class="docSearch-content">
            <div class="py-3">
                <slot name="info" />
                <div class="border p-3">
                    <Button color="primary">Run benchmark</Button>
                    <h6 class="text-muted">Benchmark log..</h6>
                    <Row>
                        <Col md="12">
                        </Col>
                        <Col md="12">
                            <pre><code class="bash" tabindex="0"
                                                    >15:01:11 start benchmark..
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
15:01:11 score 11214 success 2324454, failure: 0
                            </code></pre>
                        </Col>
                    </Row>
                </div>
            </div>
        </Col>
    </Row>
</Container>

<style>
    .bash {
        background: #373e47;
        padding: 1em;
        margin: 0.5em 0;
        overflow: auto;
        border-radius: 0.3em;

        color: #f8f8f2;
        text-shadow: 0 1px rgb(0 0 0 / 30%);
        font-family: Consolas, Monaco, "Andale Mono", "Ubuntu Mono", monospace;
        font-size: 1em;
        text-align: left;
        white-space: pre;
        word-spacing: normal;
        word-break: normal;
        word-wrap: normal;
        line-height: 1.5;
        tab-size: 4;
        hyphens: none;

        --bs-gutter-x: 1.5rem;
        --bs-gutter-y: 0;
        display: flex;
        flex-wrap: wrap;
        margin-top: calc(var(--bs-gutter-y) * -1);
        margin-right: calc(var(--bs-gutter-x) * -0.5);
        margin-left: calc(var(--bs-gutter-x) * -0.5);

        margin: 0;
        -webkit-text-size-adjust: 100%;
        -webkit-tap-highlight-color: transparent;
    }
</style>
