import { useEffect, useState } from "react";
import { Card, CardContent, Typography, List, ListItem, ListItemText } from "@mui/material";
import { fetchThreats } from "../services/api";

const ThreatList = () => {
  const [threats, setThreats] = useState([]);

  useEffect(() => {
    async function getThreats() {
      const data = await fetchThreats();
      setThreats(data.threats);
    }
    getThreats();
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
                <span role="img" aria-label="threats">⚠️</span> Threat Logs
            </Typography>
            
            <List sx={{ maxHeight: '500px', overflowY: 'auto' }}>
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

export default ThreatList;
