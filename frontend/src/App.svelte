<script lang="ts">
    import { Alert } from "sveltestrap";
    import TimeSeries from "./TimeSeries.svelte";
    import Ranking from "./Ranking.svelte";
    import Benchmarker from "./Benchmarker.svelte";
    import {
        Card,
        CardBody,
        CardFooter,
        CardHeader,
        CardSubtitle,
        //CardText,
        CardTitle,
    } from "sveltestrap";
    export let name: string;
    const colors: any = [
        "primary",
        "secondary",
        "success",
        "danger",
        "warning",
        "info",
        "light",
        "dark",
    ];
</script>

<main>
    <h1 class="title_hello">Hello {name}!</h1>
    <p class="example_message">
        Visit the <a href="https://svelte.dev/tutorial">Svelte tutorial</a> to learn
        how to build Svelte apps.
    </p>
    <Benchmarker />
    <Ranking />
    <TimeSeries />

    {#each colors as color}
        <Alert {color}>
            <h4 class="alert-heading text-capitalize">{color}</h4>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit.
            <a href="#todo" class="alert-link">
                Also, alert-links are colored to match
            </a>
            .
        </Alert>
    {/each}
</main>

<style>
    .title_hello {
        text-align: center;
        padding: 1em;
        margin: 0 auto;

        color: #ff3e00;
        text-transform: uppercase;
        font-size: 4em;
        font-weight: 100;
    }
    .example_message {
        text-align: center;
        padding: 1em;
        margin: 0 auto;
    }


    @media (min-width: 640px) {
        main {
            max-width: none;
        }
    }
</style>
