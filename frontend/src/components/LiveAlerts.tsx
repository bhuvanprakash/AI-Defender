// Real-time security alerts
// AI-Defender/frontend/src/components/LiveAlerts.tsx

import { Alert, Card, CardContent, List, ListItem, ListItemText, Typography } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import api from "../services/api";
import { connectWebSocket } from "../services/websocket";
import { Threat } from "../types/threat";

const LiveAlerts = () => {
    const [threats, setLocalThreats] = useState<Threat[]>([]);
    const threatsRef = useRef(threats);
    threatsRef.current = threats;

    // WebSocket for real-time threats
    useEffect(() => {
        const socket = connectWebSocket((newThreat) => {
            setLocalThreats((prevThreats) => [newThreat, ...prevThreats]);
        });

        return () => socket.close();
    }, []);

    // Periodic fetch of latest threats
    // State for error display
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchThreat = async () => {
            try {
                console.log('Fetching threat...');
                const response = await api.get('/api/latest-threat');
                console.log('Response received:', response);
                if (response.data) {
                    setLocalThreats([response.data, ...threatsRef.current]);
                    setError(null);
                }
            } catch (error: any) {
                const errorMessage = error.response?.data?.message || error.message || 'Unknown error';
                console.error("Failed to fetch latest threat:", {
                    message: errorMessage,
                    status: error.response?.status,
                    data: error.response?.data
                });
                setError(`Error: ${errorMessage}`);
            }
        };

        // Initial fetch
        fetchThreat();
        
        const interval = setInterval(fetchThreat, 10000); // Increased to 10s for debugging
        return () => clearInterval(interval);
    }, []);

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
                    <span role="img" aria-label="alert">🚨</span> Live Cyber Threat Alerts
                </Typography>

                {error && (
                    <Alert 
                        severity="error" 
                        sx={{ 
                            marginBottom: 2,
                            borderRadius: '8px'
                        }}
                    >
                        {error}
                    </Alert>
                )}

                <List sx={{ maxHeight: '400px', overflowY: 'auto' }}>
                    {threats.map((threat, index) => (
                        <ListItem 
                            key={index}
                            sx={{
                                borderRadius: '8px',
                                mb: 1,
                                backgroundColor: 
                                    threat.severity === 'Critical' ? '#ffebee' :
                                    threat.severity === 'High' ? '#fff3e0' : '#e8f5e9',
                                transition: 'all 0.2s',
                                '&:hover': {
                                    transform: 'translateX(5px)',
                                    backgroundColor: 
                                        threat.severity === 'Critical' ? '#ffcdd2' :
                                        threat.severity === 'High' ? '#ffe0b2' : '#c8e6c9'
                                }
                            }}
                        >
                            <ListItemText
                                primary={
                                    <Typography sx={{ 
                                        fontWeight: 600,
                                        color: 
                                            threat.severity === 'Critical' ? '#d32f2f' :
                                            threat.severity === 'High' ? '#f57c00' : '#388e3c'
                                    }}>
                                        {threat.threat_type}
                                    </Typography>
                                }
                                secondary={
                                    <Typography sx={{ color: 'text.secondary' }}>
                                        {threat.timestamp} - {threat.severity}
                                    </Typography>
                                }
                            />
                        </ListItem>
                    ))}
                </List>
            </CardContent>
        </Card>
    );
};

export default LiveAlerts;
