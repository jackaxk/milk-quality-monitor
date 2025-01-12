// Example for Chart.js
document.addEventListener("DOMContentLoaded", () => {
  const ctx = document.getElementById('myChart').getContext('2d');
  const myChart = new Chart(ctx, {
    type: 'line',
    data: {
      labels: ['January', 'February', 'March'],
      datasets: [{
        label: 'MQ-3 PPM',
        data: [12, 19, 3],
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1
      }]
    }
  });
});
