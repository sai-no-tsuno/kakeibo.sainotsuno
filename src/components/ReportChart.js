import React from 'react';
import { Bar, Pie } from 'react-chartjs-2';
import Chart from 'chart.js/auto';

function ReportChart({ data }) {
  // カテゴリ別のデータを整理
  const categoryData = {};
  
  data.forEach(item => {
    if (!categoryData[item.category]) {
      categoryData[item.category] = { income: 0, expense: 0 };
    }
    if (item.type === 'income') {
      categoryData[item.category].income = item.total;
    } else {
      categoryData[item.category].expense = item.total;
    }
  });

  const labels = Object.keys(categoryData);
  const expenseData = labels.map(label => categoryData[label].expense);
  const incomeData = labels.map(label => categoryData[label].income);

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: '収入',
        data: incomeData,
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: '支出',
        data: expenseData,
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      }
    ]
  };

  const pieChartData = {
    labels: labels.filter((_, i) => expenseData[i] > 0),
    datasets: [
      {
        label: '支出分布',
        data: expenseData.filter(d => d > 0),
        backgroundColor: [
          'rgba(255, 99, 132, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(75, 192, 192, 0.6)',
          'rgba(153, 102, 255, 0.6)',
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
        ],
        borderWidth: 1,
      }
    ]
  };

  const barOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'カテゴリ別の収支',
      },
    },
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  const pieOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right',
      },
      title: {
        display: true,
        text: '支出分布',
      },
    },
  };

  return (
    <div className="report-charts">
      <div className="chart-container">
        <Bar data={barChartData} options={barOptions} />
      </div>
      <div className="chart-container">
        <Pie data={pieChartData} options={pieOptions} />
      </div>
    </div>
  );
}

export default ReportChart;
