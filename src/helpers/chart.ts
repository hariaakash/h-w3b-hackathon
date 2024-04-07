export const timestampDiff = 5000;
export function generatePreviousTimestamps(x: number) {
    const timestamps = [];
    let currentTimestamp = Date.now(); // Get the current timestamp in milliseconds

    for (let i = 0; i < x; i++) {
        timestamps.unshift(new Date(currentTimestamp)); // Add timestamp to the beginning of the array
        currentTimestamp -= timestampDiff; // Subtract 5 seconds (in milliseconds) to go back in time
    }

    return timestamps;
}
function getRandomInt (min: number, max: number) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
export function generateSmoothNumbers(count: number) {
    const smoothNumbers = [];
    for (let i = 0; i < count; i++) {
        smoothNumbers.push(getRandomInt(50, 80));
    }
    return smoothNumbers;
}

export const lineChartOpts = {
    fill: true,
    lineTension: 0.3,
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
    options: {
        scales: {
            x: {
                type: 'timeseries',
            }
        }
    }
};