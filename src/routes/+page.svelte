<!-- +page.svelte -->
<script lang="ts">
	import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet';
	import Leaflet from '$lib/Leaflet.svelte';
	import Marker from '$lib/Marker.svelte';

	// Bounds for England
	const englandBounds: LatLngBoundsExpression = [
		[49.882531, -6.41861], // Southwest coordinates of England
		[55.813779, 1.77172] // Northeast coordinates of England
	];

	// Center of England
	const initialView: LatLngExpression = [52.355, -1.174]; // Center coordinates of England

	const markerLocations: Array<LatLngExpression> = [
		[51.5074, -0.1278], // London
		[55.9533, -3.1883], // Edinburgh
		[55.8642, -4.2518], // Glasgow
		[52.4862, -1.8904] // Birmingham
	];
	function getRandomIcon(): string {
		const icons = ['check-mark.png', 'danger.png'];
		const randomIndex = Math.floor(Math.random() * icons.length);
		return icons[randomIndex];
	}
</script>

<div class="h-screen w-full">
	<Leaflet bounds={englandBounds} zoom={7} view={initialView}>
		{#each markerLocations as latLng}
			<Marker {latLng} width={40} height={40}>
				<img src={`${getRandomIcon()}`} alt="Marker Icon" />
			</Marker>
		{/each}
	</Leaflet>
</div>
