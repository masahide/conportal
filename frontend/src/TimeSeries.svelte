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
    import autocolors from "chartjs-plugin-autocolors";

    Chart.register(...registerables);
    Chart.register(autocolors);
    let data = {
        labels: [
            "14:01:01",
            "14:01:02",
            "14:01:03",
            "14:01:05",
            "14:01:07",
            "14:01:09",
            "14:01:12",
            "14:01:22",
            "14:01:32",
        ],
        datasets: [
            {
                label: "team1",
                data: [18, 12, 6, 9, 12, 3, 9, 50, 50],
                //backgroundColor: Classic20,
                //borderColor: Classic20,
                //borderWidth: 1,
            },
            {
                label: "team2",
                data: [1, 2, 16, 3, 2, 13, 19, 0],
            },
            {
                label: "team3",
                data: [0, 0, 0, 0, 1, 2, 3, 4, 10],
            },
            {
                label: "team4",
                data: [8, 3, 10, 13, 12, 14, 11, 13, 15],
            },
        ],
    };
    let config: ChartConfiguration = {
        type: "line",
        data,
        options: {
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
        drowchart()
    });
    afterUpdate(() => {
    });
    onDestroy(() => {
        if (chart) chart.destroy();
        chart = null;
    });
    function drowchart(){
        if (window.matchMedia("(prefers-color-scheme: dark)").matches == true) {
            Chart.defaults.color = "white";
        } else {
            Chart.defaults.color = "#666";
        }
        chart = new Chart(chartRef, config);
        if (!chart) return;
        if (window.matchMedia("(prefers-color-scheme: dark)").matches == true) {
            //dark mode
            config.data.datasets[0].backgroundColor =
                config.data.datasets[0].borderColor;
            config.options.scales.x.grid.borderColor = "rgba(255,255,255,0.7)";
            config.options.scales.y.grid.borderColor = "rgba(255,255,255,0.7)";
            config.options.scales.x.grid.color = "rgba(255,255,255,0.2)";
            config.options.scales.y.grid.color = "rgba(255,255,255,0.2)";
        } else {
            config.options.scales.x.grid.borderColor = "#666";
            config.options.scales.y.grid.borderColor = "#666";
            config.options.scales.x.grid.color = "rgba(0,0,0,0.1)";
            config.options.scales.y.grid.color = "rgba(0,0,0,0.1)";
        }
        chart.data = data;
        chart.update();
    }
</script>

<Card class="mb-3">
    <CardHeader>
        <CardTitle>スコア時系列</CardTitle>
    </CardHeader>
    <CardBody>
        <canvas bind:this={chartRef} />
    </CardBody>
</Card>

<style>
</style>
