import type { LatLngExpression, LatLngBoundsExpression } from 'leaflet';

export function markerHoverEffect(node: HTMLImageElement) {
    node.addEventListener('mouseenter', () => {
        node.style.transform = 'scale(1.2)';
        node.style.transition = 'transform 0.3s ease-in-out';
    });

    node.addEventListener('mouseleave', () => {
        node.style.transform = 'scale(1)';
        node.style.transition = 'transform 0.3s ease-in-out';
    });
}

// Define LatLngExpression as an array of numbers
export type LatLngExpressionArray = [number, number];

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

// Bounds for England
export const englandBounds: LatLngBoundsExpression = [
        [49.882531, -6.41861], // Southwest coordinates of England
        [55.813779, 1.77172] // Northeast coordinates of England
    ];

// Center of England
export const initialView: LatLngExpression = [51.5074, -0.1278]; // Center coordinates of London

// Center coordinates of cities
export const cities: { name: string, center: LatLngExpressionArray }[] = [
        { name: 'London', center: [51.5074, -0.1278] },
        { name: 'Edinburgh', center: [55.9533, -3.1883] },
        { name: 'Glasgow', center: [55.8642, -4.2518] },
        { name: 'Birmingham', center: [52.4862, -1.8904] }
];

// Generate random coordinates around all cities
export let allCoordinates: LatLngExpressionArray[] = [];
cities.forEach(city => {
    const cityCoordinates = generateRandomCoordinates(city.center, 100, 200); // Radius of 0.5 degree around each city
    allCoordinates = allCoordinates.concat(cityCoordinates);
});