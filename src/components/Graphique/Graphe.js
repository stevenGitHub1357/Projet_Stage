import React, { useState } from "react";
import { Bar, Line, Pie } from "react-chartjs-2";
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';


export function LineChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  // Fonction pour générer des données aléatoires
  const generateRandomData = () => {
    const dates = [];
    for (let i = 0; i < 12; i++) {
      dates.push(new Date().setMonth(i));
    }

    const values = Array.from({ length: 12 }, () => Math.floor(Math.random() * 100));

    return {
      labels: dates,
      datasets: [{
        label: 'Valeur',
        data: values
      }]
    };
  };

  // Générer les données aléatoires au chargement du composant
  React.useEffect(() => {
    setChartData(generateRandomData());
  }, []);

  return (
    <Line
      data={chartData}
      options={{
        title: {
          display: true,
          text: 'Graphique en ligne avec données aléatoires'
        },
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'month'
            },
            display: true,
            scaleLabel: {
              display: true,
              labelString: 'Date X'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Valeur Y'
            }
          }]
        }
      }}
    />
  );
}


export function ColumnChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const generateRandomData = () => {
    const categories = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3', 'Catégorie 4', 'Catégorie 5'];
    const values = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));

    return {
      labels: categories,
      datasets: [{
        label: 'Valeur',
        data: values
      }]
    };
  };

  React.useEffect(() => {
    setChartData(generateRandomData());
  }, []);

  return (
    <Bar
      data={chartData}
      options={{
        title: {
          display: true,
          text: 'Graphique en colonnes avec données aléatoires'
        },
        scales: {
          xAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Catégorie X'
            }
          }],
          yAxes: [{
            scaleLabel: {
              display: true,
              labelString: 'Valeur Y'
            }
          }]
        }
      }}
    />
  );
}


export function PieChart() {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: []
  });

  const generateRandomData = () => {
    const categories = ['Catégorie 1', 'Catégorie 2', 'Catégorie 3', 'Catégorie 4', 'Catégorie 5'];
    const values = Array.from({ length: 5 }, () => Math.floor(Math.random() * 100));

    return {
      labels: categories,
      datasets: [{
        label: 'Pourcentage',
        data: values,
        backgroundColor: categories.map(() => getRandomColor()),
        borderColor: categories.map(() => getRandomColor()),
        borderWidth: 1
      }]
    };
  };

  const getRandomColor = () => {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  React.useEffect(() => {
    setChartData(generateRandomData());
  }, []);

  return (
    <div>
      <Pie
        data={chartData}
        options={{
          title: {
            display: true,
            text: 'Graphique en camembert avec données aléatoires'
          },
          plugins: {
            tooltip: {
              enabled: true
            }
          }
        }}
      />
    </div>
  );
}
