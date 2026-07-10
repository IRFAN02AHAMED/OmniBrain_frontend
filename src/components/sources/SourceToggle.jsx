import React from 'react';
import { Switch } from '@mui/material';

const SourceToggle = ({ checked, indeterminate, onChange, disabled }) => {
  return (
    <Switch
      checked={checked}
      disabled={disabled}
      onChange={(e) => onChange(e.target.checked)}
      sx={{
        width: 38,
        height: 20,
        padding: 0,
        display: 'flex',
        '& .MuiSwitch-switchBase': {
          padding: '2px',
          '&.Mui-checked': {
            transform: 'translateX(18px)',
            color: '#fff',
            '& + .MuiSwitch-track': {
              opacity: 1,
              backgroundColor: (theme) =>
                theme.palette.mode === 'dark' ? '#6C5CE7' : 'primary.main',
            },
          },
        },
        '& .MuiSwitch-thumb': {
          width: 16,
          height: 16,
          boxShadow: 'none',
        },
        '& .MuiSwitch-track': {
          borderRadius: 10,
          opacity: 1,
          backgroundColor: (theme) =>
            theme.palette.mode === 'dark' ? '#273244' : 'rgba(0,0,0,0.12)',
          boxSizing: 'border-box',
        },
      }}
    />
  );
};

export default SourceToggle;
