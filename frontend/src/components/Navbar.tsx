// Top navigation bar

import { AppBar, Toolbar, Typography } from "@mui/material";

const Navbar = () => {
  return (
    <AppBar 
      position="static" 
      sx={{
        background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)',
        boxShadow: '0 3px 5px 2px rgba(33, 203, 243, .3)',
        marginBottom: '1rem'
      }}
    >
      <Toolbar>
        <Typography 
          variant="h5" 
          sx={{
            fontWeight: 'bold',
            color: 'white',
            textShadow: '2px 2px 4px rgba(0,0,0,0.2)',
            '&:hover': {
              transform: 'scale(1.01)',
              transition: 'transform 0.2s'
            }
          }}
        >
          AI-Defender SecureDash
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
