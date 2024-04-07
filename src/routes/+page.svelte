<!-- +page.svelte -->
<script lang="ts">
    import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
    import Leaflet from '$lib/Leaflet.svelte';
    import Marker from '$lib/Marker.svelte';
    import * as Dialog from "$lib/components/ui/dialog";
    import { Line } from 'svelte-chartjs';
    import {
        Chart as ChartJS,
        Title,
        Tooltip,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
        Filler,
    } from 'chart.js';

    ChartJS.register(
        Title,
        Legend,
        LineElement,
        LinearScale,
        PointElement,
        CategoryScale,
        Filler,
    );

    // Define LatLngExpression as an array of numbers
    type LatLngExpressionArray = [number, number];
    let dialogOpen = true;

    // Bounds for England
    const englandBounds: LatLngBoundsExpression = [
        [49.882531, -6.41861], // Southwest coordinates of England
        [55.813779, 1.77172] // Northeast coordinates of England
    ];

    // Center of England
    const initialView: LatLngExpression = [51.5074, -0.1278]; // Center coordinates of London

    // Center coordinates of cities
    const cities: { name: string, center: LatLngExpressionArray }[] = [
        { name: 'London', center: [51.5074, -0.1278] },
        { name: 'Edinburgh', center: [55.9533, -3.1883] },
        { name: 'Glasgow', center: [55.8642, -4.2518] },
        { name: 'Birmingham', center: [52.4862, -1.8904] }
    ];

    // Generate random coordinates within a certain radius from the center
    function generateRandomCoordinates(center: LatLngExpressionArray, radius: number, count: number): LatLngExpressionArray[] {
        const coordinates: LatLngExpressionArray[] = [];
        for (let i = 0; i < count; i++) {
            const lat = center[0] + (Math.random() - 0.5) * (radius / 111.32); // 1 degree of latitude is approximately 111.32 kilometers
            const lng = center[1] + (Math.random() - 0.5) * (radius / (111.32 * Math.cos((center[0] * Math.PI) / 180))); // 1 degree of longitude is approximately 111.32 kilometers * cos(latitude)
            coordinates.push([lat, lng]);
        }
        return coordinates;
    }

    // Generate random coordinates around all cities
    let allCoordinates: LatLngExpressionArray[] = [];
    cities.forEach(city => {
        const cityCoordinates = generateRandomCoordinates(city.center, 100, 200); // Radius of 0.5 degree around each city
        allCoordinates = allCoordinates.concat(cityCoordinates);
    });

    function getRandomIcon(): string {
        const icons = ['check-mark.png', 'danger.png'];
        const randomIndex = Math.floor(Math.random() * icons.length);
        return icons[randomIndex];
    }

    function markerClickHandler() {
        dialogOpen = true;
        console.log(dialogOpen)
    }

    function markerHoverEffect(node: HTMLImageElement) {
        node.addEventListener('mouseenter', () => {
            node.style.transform = 'scale(1.2)';
            node.style.transition = 'transform 0.3s ease-in-out';
        });

        node.addEventListener('mouseleave', () => {
            node.style.transform = 'scale(1)';
            node.style.transition = 'transform 0.3s ease-in-out';
        });
    }

    const chartData = {
  labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
  datasets: [
    {
      label: 'Sewage Treatment Data',
      fill: true,
      lineTension: 0.3,
      backgroundColor: 'rgb(0, 143, 251, .3)',
      borderColor: 'rgb(0, 143, 251)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgb(205, 130,1 58)',
      pointBackgroundColor: 'rgb(255, 255, 255)',
      pointBorderWidth: 10,
      pointHoverRadius: 5,
      pointHoverBackgroundColor: 'rgb(0, 0, 0)',
      pointHoverBorderColor: 'rgba(220, 220, 220,1)',
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 10,
      data: [65, 59, 80, 81, 56, 55, 40],
    },
    {
      label: 'My Second dataset',
      fill: true,
      lineTension: 0.3,
      backgroundColor: 'rgb(0, 227, 150, 0.3)',
      borderColor: 'rgb(0, 227, 150)',
      borderCapStyle: 'butt',
      borderDash: [],
      borderDashOffset: 0.0,
      borderJoinStyle: 'miter',
      pointBorderColor: 'rgb(35, 26, 136)',
      pointBackgroundColor: 'rgb(255, 255, 255)',
      pointBorderWidth: 10,
      pointHoverRadius: 5,
    //   pointHoverBackgroundColor: 'rgb(0, 0, 0)',
    //   pointHoverBorderColor: 'rgba(220, 220, 220, 1)',
      pointHoverBorderWidth: 0,
      pointRadius: 0,
      pointHitRadius: 10,
      data: [28, 48, 40, 19, 86, 27, 90],
    },
  ],
};
</script>

<div class="h-screen w-full">
    <Leaflet bounds={englandBounds} zoom={10} view={initialView}>
        {#each allCoordinates as latLng}
            <Marker {latLng} width={40} height={40}>
                <img src={`${getRandomIcon()}`} alt="Marker Icon" use:markerHoverEffect on:click={markerClickHandler} />
            </Marker>
        {/each}
    </Leaflet>
</div>

<Dialog.Root bind:open={dialogOpen}>
    <Dialog.Content class="h-2/3">
      <Dialog.Header>
        <Dialog.Title>Edit profile</Dialog.Title>
        <Dialog.Description>
          Make changes to your profile here. Click save when you're done.
        </Dialog.Description>
      </Dialog.Header>
      <div class="grid gap-4 py-4">
        <Line
            data={chartData}
            width={100}
            height={50}
            options={{ maintainAspectRatio: false }}
        />
      </div>
    </Dialog.Content>
  </Dialog.Root>
