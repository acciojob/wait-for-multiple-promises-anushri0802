document.addEventListener("DOMContentLoaded", () => {
    const outputTable = document.getElementById("output");
    
    // Initially show loading row
    outputTable.innerHTML = `<tr><td colspan="2">Loading...</td></tr>`;

    // Function to create a promise that resolves after a random time between 1-3 seconds
    function createPromise(index) {
        const time = Math.random() * 2 + 1; // Generates a time between 1 and 3 seconds
        return new Promise((resolve) => {
            setTimeout(() => resolve({ index, time: time.toFixed(3) }), time * 1000);
        });
    }

    // Create three promises
    const promises = [createPromise(1), createPromise(2), createPromise(3)];

    // Wait for all promises to resolve
    Promise.all(promises).then((results) => {
        // Remove the loading row
        outputTable.innerHTML = "";
        
        let maxTime = 0;
        
        // Populate table with resolved results
        results.forEach(({ index, time }) => {
            maxTime = Math.max(maxTime, parseFloat(time));
            const row = `<tr><td>Promise ${index}</td><td>${time}</td></tr>`;
            outputTable.innerHTML += row;
        });
        
        // Add total row
        outputTable.innerHTML += `<tr><td>Total</td><td>${maxTime.toFixed(3)}</td></tr>`;
    });
});
