<script lang="ts">
    import { Line } from 'svelte-chartjs';
    import { writable } from 'svelte/store';

    import {
        Chart as ChartJS,
        Title,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
        Filler,
    } from 'chart.js';
	import { generatePreviousTimestamps, generateSmoothNumbers, lineChartOpts, timestampDiff } from '../helpers/chart';

    ChartJS.register(
        Title,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
        Filler,
    );


    const initialDataCount = 20;
    // const labels = generatePreviousTimestamps(initialDataCount);
    const labels = Array.from({ length: initialDataCount }, (_, index) => index + 1);
    const data1 = generateSmoothNumbers(initialDataCount);
    const data2 = generateSmoothNumbers(initialDataCount);

    const chartData: any = writable({
        labels: labels,
        datasets: [
            {
                label: 'Sewage Treatment Data',
                data: data1,
                backgroundColor: 'rgb(0, 143, 251, .3)',
                borderColor: 'rgb(0, 143, 251)',
                ...lineChartOpts,
            },
            {
                label: 'Carbon Emissions',
                data: data2,
                backgroundColor: 'rgb(0, 227, 150, 0.3)',
                borderColor: 'rgb(0, 227, 150)',
                ...lineChartOpts,
            },
        ],
        options: {
            scales: {
                xAxes: [{
                    ticks: {
                        display: false //this will remove only the label
                    }
                }, {
                    ticks: {
                        display: false //this will remove only the label
                    }
                }]
            }
        }
    });

    function addData() {
        // Update labels and datasets with new data points
        // labels.push(new Date());
        labels.push(labels.length+1);
        data1.push(...generateSmoothNumbers(1))
        data2.push(...generateSmoothNumbers(1))
        console.log('running updates')
    }

    setInterval(addData, timestampDiff);
</script>

<Line
    data={$chartData}
    width={100}
    height={50}
    options={{ maintainAspectRatio: false }}
/>