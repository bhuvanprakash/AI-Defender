// Sidebar navigation menu
// AI-Defender/frontend/src/components/Sidebar.tsx

import { List, ListItem, ListItemText } from "@mui/material";
import Link from "next/link";
import { CSSProperties } from "react";

interface SidebarProps {
  style?: CSSProperties;
}

const Sidebar: React.FC<SidebarProps> = ({ style }) => {
  const menuItems = [
    { text: 'Dashboard', href: '/dashboard', icon: '📊' },
    { text: 'Threats', href: '/threats', icon: '⚠️' },
    { text: 'Incidents', href: '/incidents', icon: '🚨' },
    { text: 'Settings', href: '/settings', icon: '⚙️' },
  ];
  return (
    <div 
      sx={{
        width: "240px",
        position: "fixed",
        top: 0,
        bottom: 0,
        left: 0,
        background: 'linear-gradient(180deg, #f8f9fa 0%, #e9ecef 100%)',
        borderRight: '1px solid rgba(0, 0, 0, 0.12)',
        boxShadow: '2px 0 5px rgba(0,0,0,0.1)',
        ...style
      }}
    >
      <List sx={{ padding: '1rem' }}>
        {menuItems.map((item, index) => (
          <ListItem 
            key={index}
            button 
            sx={{
              borderRadius: '8px',
              marginBottom: '0.5rem',
              '&:hover': {
                backgroundColor: 'rgba(33, 150, 243, 0.08)',
                transform: 'translateX(5px)',
                transition: 'all 0.2s'
              }
            }}
          >
            <Link href={item.href} passHref legacyBehavior>
              <a style={{ textDecoration: 'none', color: 'inherit', width: '100%', display: 'flex', alignItems: 'center' }}>
                <span style={{ marginRight: '0.5rem', fontSize: '1.2rem' }}>{item.icon}</span>
                <ListItemText 
                  primary={item.text}
                  sx={{
                    '& .MuiTypography-root': {
                      fontWeight: 600,
                      fontSize: '1.1rem'
                    }
                  }}
                />
              </a>
            </Link>
          </ListItem>
        ))}
      </List>
    </div>
  );
};

export default Sidebar;
