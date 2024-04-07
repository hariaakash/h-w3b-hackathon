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
	  [51.513870009926, 7.473969975241] // ShipBit Office
	];
  </script>
  
  <div class="w-full h-screen">
	<Leaflet bounds={englandBounds} zoom={7} view={initialView}>
	  {#each markerLocations as latLng}
		<Marker {latLng} width={40} height={40}>
		  <!-- ShipBit Icon -->
		  <svg
			xmlns="http://www.w3.org/2000/svg"
			xml:space="preserve"
			style="fill-rule:evenodd;clip-rule:evenodd;stroke-linejoin:round;stroke-miterlimit:2"
			viewBox="0 0 45 40"
		  >
			<path
			  d="m23.046 25.449 9.601 16.885H13.253l9.793-16.885ZM45 23.965H25.702l9.575 16.84L45 23.965ZM44.963 20.923 35.339 4.254l-9.668 16.669h19.292ZM32.771 2.618h-4.17L8.522 37.237l2.08 3.603L32.771 2.618ZM25.084 2.618H11.465L0 22.476l6.768 11.722 18.316-31.58Z"
			  style="fill:#e9204f;fill-rule:nonzero"
			  transform="translate(0 -2.618)"
			/>
		  </svg>
		</Marker>
	  {/each}
	</Leaflet>
  </div>
  