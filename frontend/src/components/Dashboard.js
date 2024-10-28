import React from 'react';
import "./Dashboard.css"
import { Bar } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';

// Register the necessary components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const Dashboard = ({ analysisData = {}, aiResponses = [] }) => {
    const chartsData = [
        {
            label: 'Year Analysis',
            data: analysisData?.Year ? Object.values(analysisData.Year) : [],
            labels: analysisData?.Year ? Object.keys(analysisData.Year) : [],
        },
        // Add more datasets for different analysis metrics here
    ];

    return (
        <div>
            <h1>Analysis Dashboard</h1>
            <div className="charts-container">
                {chartsData.map((chart, index) => (
                    <div key={index} className="chart">
                        <h3>{chart.label}</h3>
                        <Bar
                            data={{
                                labels: chart.labels,
                                datasets: [
                                    {
                                        label: chart.label,
                                        data: chart.data,
                                        backgroundColor: 'rgba(75, 192, 192, 0.6)',
                                        borderColor: 'rgba(75, 192, 192, 1)',
                                        borderWidth: 1,
                                    },
                                ],
                            }}
                            options={{
                                responsive: true,
                                maintainAspectRatio: true, // Maintain aspect ratio
                                scales: {
                                    x: {
                                        ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 5, // Limit the number of ticks
                                        },
                                    },
                                    y: {
                                        beginAtZero: true,
                                        ticks: {
                                            autoSkip: true,
                                            maxTicksLimit: 5, // Limit the number of ticks
                                        },
                                    },
                                },
                            }}
                        />
                    </div>
                ))}
            </div>
            <h2>AI Responses</h2>
            <ul>
                {aiResponses.map((response, index) => (
                    <li key={index}>{response}</li>
                ))}
            </ul>
        </div>
    );
};

export default Dashboard;
