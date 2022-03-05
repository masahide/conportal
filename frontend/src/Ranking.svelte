<script lang="ts">
    import {
        Card,
        CardBody,
        //CardFooter,
        CardHeader,
        //CardSubtitle,
        //CardText,
        CardTitle,
    } from "sveltestrap";
    import { Chart, registerables, ChartConfiguration } from "chart.js";
    import { onMount, afterUpdate, onDestroy } from "svelte";

    // https://nagix.github.io/chartjs-plugin-colorschemes/colorchart.html
    // https://github.com/nagix/chartjs-plugin-colorschemes/blob/master/src/colorschemes/colorschemes.tableau.js#L78
    const ClassicAreaRedGreen21 = [
        "#bd1100",
        "#c82912",
        "#d23a21",
        "#dc4930",
        "#e6583e",
        "#ef654d",
        "#f7705b",
        "#fd7e6b",
        "#fe8e7e",
        "#fca294",
        "#e9dabe",
        "#c7e298",
        "#b1de7f",
        "#a0d571",
        "#90cb68",
        "#82c162",
        "#75b65d",
        "#69aa56",
        "#5ea049",
        "#559633",
        "#4a8c1c",
    ];

    Chart.register(...registerables);
    let data = {
        labels: ["team1", "team2", "team3", "team4", "team5", "team6"],
        datasets: [
            {
                //label: "",
                data: [200, 70, 20, 15, 12, 2],
                backgroundColor: ClassicAreaRedGreen21,
                //borderColor: Classic20,
                //borderWidth: 1,
            },
        ],
    };
    let config: ChartConfiguration = {
        type: "bar",
        data,
        options: {
            indexAxis: "y",
            plugins: {
                legend: { display: false },
            },
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    };
    let chart = null;
    let chartRef;
    onMount(() => {
        chart = new Chart(chartRef, config);
    });
    afterUpdate(() => {
        if (!chart) return;
        if (window.matchMedia("(prefers-color-scheme: dark)").matches == true) {
            //dark mode
            config.options.scales.x.grid.borderColor = "rgba(255,255,255,0.7)";
            config.options.scales.y.grid.borderColor = "rgba(255,255,255,0.7)";
            config.options.scales.x.grid.color = "rgba(255,255,255,0.2)";
            config.options.scales.y.grid.color = "rgba(255,255,255,0.2)";
            Chart.defaults.color = "white";
        } else {
            config.options.scales.x.grid.borderColor = "#666";
            config.options.scales.y.grid.borderColor = "#666";
            config.options.scales.x.grid.color = "rgba(0,0,0,0.1)";
            config.options.scales.y.grid.color = "rgba(0,0,0,0.1)";
            Chart.defaults.color = "#666";
        }
        chart.data = data;
        chart.update();
    });
    onDestroy(() => {
        if (chart) chart.destroy();
        chart = null;
    });
</script>

<Card class="mb-3">
    <CardHeader>
        <CardTitle>スコアランキング</CardTitle>
    </CardHeader>
    <CardBody>
        <canvas bind:this={chartRef} />
    </CardBody>
</Card>

<style>
</style>
