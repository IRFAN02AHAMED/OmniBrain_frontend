import React from 'react';
import { Box } from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledGlassBox = styled(Box)(({ theme }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    background: isDark ? theme.palette.background.card : 'rgba(255, 255, 255, 0.45)',
    backdropFilter: isDark ? 'none' : 'blur(24px)',
    WebkitBackdropFilter: isDark ? 'none' : 'blur(24px)',
    border: isDark ? `1px solid ${theme.palette.background.border}` : '1px solid rgba(255, 255, 255, 0.6)',
    boxShadow: isDark ? '0 4px 20px 0 rgba(0, 0, 0, 0.15)' : '0 8px 32px 0 rgba(59, 103, 88, 0.08)',
    borderTop: isDark ? `1px solid ${theme.palette.background.border}` : '1px solid rgba(255, 255, 255, 0.8)',
    borderLeft: isDark ? `1px solid ${theme.palette.background.border}` : '1px solid rgba(255, 255, 255, 0.8)',
    borderRadius: '24px',
    transition: 'transform 0.3s ease-in-out, box-shadow 0.3s ease-in-out, background-color 0.2s',
  };
});

const GlassCard = ({ children, className = '', ...props }) => {
  return (
    <StyledGlassBox className={className} {...props}>
      {children}
    </StyledGlassBox>
  );
};

export default GlassCard;
