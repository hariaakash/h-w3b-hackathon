<!-- +page.svelte -->
<script lang="ts">
    import Leaflet from '$lib/Leaflet.svelte';
    import Marker from '$lib/Marker.svelte';
    import * as Dialog from "$lib/components/ui/dialog";
	import Chart from '$lib/Chart.svelte';
	import { allCoordinates, englandBounds, initialView, markerHoverEffect } from '../helpers/map';

    let dialogOpen = true;

    function getRandomIcon(): string {
        const icons = ['check-mark.png', 'danger.png'];
        const randomIndex = Math.floor(Math.random() * icons.length);
        return icons[randomIndex];
    }

    function markerClickHandler() {
        dialogOpen = true;
    }
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
      <div class="w-full h-full">
        <Chart />
      </div>
    </Dialog.Content>
  </Dialog.Root>
