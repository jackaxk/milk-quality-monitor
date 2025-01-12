const ctxMQ3 = document.getElementById('graphMQ3').getContext('2d');
const ctxMQ4 = document.getElementById('graphMQ4').getContext('2d');
const ctxMQ7 = document.getElementById('graphMQ7').getContext('2d');

const chartMQ3 = new Chart(ctxMQ3, { type: 'line', data: { labels: [], datasets: [{ label: 'MQ-3 vs Temperature', data: [], borderColor: '#ff6384', backgroundColor: 'rgba(255, 99, 132, 0.2)', tension: 0.4 }] } });
const chartMQ4 = new Chart(ctxMQ4, { type: 'line', data: { labels: [], datasets: [{ label: 'MQ-4 vs Temperature', data: [], borderColor: '#36a2eb', backgroundColor: 'rgba(54, 162, 235, 0.2)', tension: 0.4 }] } });
const chartMQ7 = new Chart(ctxMQ7, { type: 'line', data: { labels: [], datasets: [{ label: 'MQ-7 vs Temperature', data: [], borderColor: '#4bc0c0', backgroundColor: 'rgba(75, 192, 192, 0.2)', tension: 0.4 }] } });

async function fetchData() {
  try {
    const response = await fetch('/data');
    const data = await response.json();

    document.getElementById('mq3').textContent = data.mq3;
    document.getElementById('mq4').textContent = data.mq4;
    document.getElementById('mq7').textContent = data.mq7;
    document.getElementById('waterLevel').textContent = data.waterLevel;
    document.getElementById('temperature').textContent = data.temperature;
    document.getElementById('quality').textContent = data.quality;

    const timeLabel = new Date().toLocaleTimeString();

    // Update graphs
    chartMQ3.data.labels.push(timeLabel);
    chartMQ3.data.datasets[0].data.push(data.mq3);
    chartMQ4.data.labels.push(timeLabel);
    chartMQ4.data.datasets[0].data.push(data.mq4);
    chartMQ7.data.labels.push(timeLabel);
    chartMQ7.data.datasets[0].data.push(data.mq7);

    if (chartMQ3.data.labels.length > 20) chartMQ3.data.labels.shift();
    if (chartMQ4.data.labels.length > 20) chartMQ4.data.labels.shift();
    if (chartMQ7.data.labels.length > 20) chartMQ7.data.labels.shift();

    chartMQ3.update();
    chartMQ4.update();
    chartMQ7.update();
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

function showGraph(graphId) {
  document.querySelectorAll('.graph-container').forEach(container => container.style.display = 'none');
  document.getElementById(graphId).style.display = 'block';

  document.querySelectorAll('.buttons button').forEach(button => button.classList.remove('active'));
  document.querySelector(`#btn${graphId.replace('graph', '')}`).classList.add('active');
}

document.getElementById('btnMQ3').addEventListener('click', () => showGraph('graphMQ3Container'));
document.getElementById('btnMQ4').addEventListener('click', () => showGraph('graphMQ4Container'));
document.getElementById('btnMQ7').addEventListener('click', () => showGraph('graphMQ7Container'));

setInterval(fetchData, 1000);
fetchData();
