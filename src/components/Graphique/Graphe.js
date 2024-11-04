import React from 'react';
import { Pie } from 'react-chartjs-2';

function PieChart() {
  // Fonction pour générer une couleur aléatoire
  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const data = {
    labels: ['Catégorie A', 'Catégorie B', 'Catégorie C', 'Catégorie D'],
    datasets: [
      {
        label: 'Distribution des Catégories',
        data: [30, 50, 20, 40], // Données pour chaque catégorie
        backgroundColor: Array(4).fill().map(() => getRandomColor()), // Couleurs aléatoires
        hoverBackgroundColor: Array(4).fill().map(() => getRandomColor()) // Couleurs au survol aléatoires
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'bottom'
      }
    }
  };

  return (
    <div>
      <h2>Graphique Camembert</h2>
      <Pie data={data} options={options} />
    </div>
  );
}

export default PieChart;
