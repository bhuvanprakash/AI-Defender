// ThreatChart.tsx
// AI-Defender/frontend/src/components/ThreatChart.tsx

import { Card, CardContent, Typography } from "@mui/material";
import {
    CategoryScale,
    Chart as ChartJS,
    LinearScale,
    LineElement,
    PointElement,
} from 'chart.js';
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement);

const ThreatChart = ({ threats }) => {
    const data = {
        labels: threats.map((t) => t.timestamp),
        datasets: [
            {
                label: "Threat Severity",
                data: threats.map((t) => t.severity === "Critical" ? 3 : t.severity === "High" ? 2 : 1),
                borderColor: "red",
                backgroundColor: "rgba(255, 0, 0, 0.3)",
            },
        ],
    };

    const options = {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    stepSize: 1,
                    callback: function(value) {
                        return ["Low", "Medium", "High", "Critical"][value];
                    }
                }
            }
        }
    };

    return (
        <Card 
            sx={{
                margin: '1rem',
                borderRadius: '16px',
                background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                transition: 'all 0.3s',
                '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 6px 25px rgba(0,0,0,0.12)'
                }
            }}
        >
            <CardContent>
                <Typography 
                    variant="h5" 
                    gutterBottom 
                    sx={{
                        fontWeight: 'bold',
                        color: '#1976d2',
                        marginBottom: '1.5rem',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }}
                >
                    <span role="img" aria-label="chart">📊</span> Threat Distribution
                </Typography>
                <div style={{ height: '300px', padding: '1rem' }}>
                    <Line 
                        data={{
                            ...data,
                            datasets: [{
                                ...data.datasets[0],
                                borderColor: '#2196F3',
                                backgroundColor: 'rgba(33, 150, 243, 0.1)',
                                borderWidth: 2,
                                pointBackgroundColor: '#1976D2',
                                pointHoverBackgroundColor: '#1976D2',
                                pointHoverRadius: 6,
                                tension: 0.4
                            }]
                        }} 
                        options={{
                            ...options,
                            plugins: {
                                legend: {
                                    labels: {
                                        font: {
                                            family: "'Inter', sans-serif",
                                            weight: '500'
                                        }
                                    }
                                }
                            },
                            scales: {
                                ...options.scales,
                                y: {
                                    ...options.scales.y,
                                    grid: {
                                        color: 'rgba(0, 0, 0, 0.1)'
                                    }
                                },
                                x: {
                                    grid: {
                                        color: 'rgba(0, 0, 0, 0.1)'
                                    }
                                }
                            }
                        }}
                    />
                </div>
            </CardContent>
        </Card>
    );
};

export default ThreatChart;
