import { List, ListItem, ListItemText } from "@mui/material";
import { useEffect, useState } from "react";

const LiveLogs = () => {
  const [logs, setLogs] = useState([]);

  useEffect(() => {
    // ...existing code to fetch logs or connect to real-time data...
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
                <span role="img" aria-label="logs">📋</span> System Logs
            </Typography>
            
            <List sx={{ 
                maxHeight: '400px', 
                overflowY: 'auto',
                '&::-webkit-scrollbar': {
                    width: '8px',
                },
                '&::-webkit-scrollbar-track': {
                    background: '#f1f1f1',
                    borderRadius: '10px',
                },
                '&::-webkit-scrollbar-thumb': {
                    background: '#888',
                    borderRadius: '10px',
                    '&:hover': {
                        background: '#555'
                    }
                }
            }}>
                {logs.map((log, index) => (
                    <ListItem 
                        key={index}
                        sx={{
                            borderRadius: '8px',
                            mb: 1,
                            backgroundColor: '#f5f5f5',
                            transition: 'all 0.2s',
                            '&:hover': {
                                transform: 'translateX(5px)',
                                backgroundColor: '#e0e0e0'
                            }
                        }}
                    >
                        <ListItemText
                            primary={
                                <Typography sx={{ 
                                    fontFamily: 'monospace',
                                    fontWeight: 500,
                                    color: log.level === 'error' ? '#d32f2f' :
                                           log.level === 'warning' ? '#f57c00' :
                                           log.level === 'info' ? '#1976d2' : 'text.primary'
                                }}>
                                    {log.message}
                                </Typography>
                            }
                            secondary={
                                <Typography 
                                    sx={{ 
                                        color: 'text.secondary',
                                        fontSize: '0.875rem',
                                        fontFamily: 'monospace'
                                    }}
                                >
                                    {log.timestamp}
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

export default LiveLogs;
