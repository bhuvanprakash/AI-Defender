import { Card, CardContent, Typography } from "@mui/material";

// Summary of security metrics

const StatsPanel = () => {
  return (
    <Card 
      sx={{
        margin: "20px",
        borderRadius: "16px",
        background: 'linear-gradient(135deg, #ffffff 0%, #f8f9fa 100%)',
        boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
        transition: 'transform 0.3s',
        '&:hover': {
          transform: 'translateY(-5px)'
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
            marginBottom: '1.5rem'
          }}
        >
          Security Stats
        </Typography>
        <div style={{ 
          display: "flex", 
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: "1rem"
        }}>
          <Typography 
            sx={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#e3f2fd',
              fontWeight: 500
            }}
          >
            Total Threats: 42
          </Typography>
          <Typography 
            sx={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#ffebee',
              color: '#d32f2f',
              fontWeight: 500
            }}
          >
            Critical: 3
          </Typography>
          <Typography 
            sx={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#fff3e0',
              color: '#f57c00',
              fontWeight: 500
            }}
          >
            High: 8
          </Typography>
          <Typography 
            sx={{
              padding: '0.5rem 1rem',
              borderRadius: '8px',
              backgroundColor: '#e8f5e9',
              color: '#388e3c',
              fontWeight: 500
            }}
          >
            Medium/Low: 31
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default StatsPanel;