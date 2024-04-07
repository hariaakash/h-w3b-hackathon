<!-- +page.svelte -->
<script lang="ts">
	import Leaflet from '$lib/Leaflet.svelte';
	import Marker from '$lib/Marker.svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Chart from '$lib/Chart.svelte';
	import { allCoordinates, englandBounds, initialView, markerHoverEffect, londonAreas } from '../helpers/map';
	import { getRandomInt } from '../helpers/chart';

	let dialogOpen = false;
  let currentClicked = -1;

	function getRandomIcon(key: number): string {
		return key % 2 === 0 ? 'check-mark.png' : 'danger.png';
	}

	function markerClickHandler(key: number) {
		dialogOpen = true;
    currentClicked = key;
    console.log(currentClicked)
	}

  function getOneLondonArea() {
    return londonAreas[getRandomInt(0, londonAreas.length - 1)];
  }

  function isNoOverflow() {
    return currentClicked % 2 === 0;
  }
</script>

<div class="h-screen w-full">
	<Leaflet bounds={englandBounds} zoom={10} view={initialView}>
		{#each allCoordinates as latLng, key(latLng)}
			<Marker {latLng} width={40} height={40}>
				<img
					src={`${getRandomIcon(key)}`}
					alt="Marker Icon"
					use:markerHoverEffect
					on:click={() => markerClickHandler(key)}
				/>
			</Marker>
		{/each}
	</Leaflet>
</div>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="h-2/3">
		<Dialog.Header>
			<Dialog.Title>Area: {getOneLondonArea()}</Dialog.Title>
			<Dialog.Description>
        Overflow Status: { isNoOverflow() ? 'No Overflow' : 'Overflow' }
			</Dialog.Description>
		</Dialog.Header>
		<div class="h-full w-full">
			<Chart />
		</div>
	</Dialog.Content>
</Dialog.Root>
