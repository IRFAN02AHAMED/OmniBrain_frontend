import React, { useEffect, useState } from 'react';
import { Box, Typography, LinearProgress } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';

const STEPS = [
  'Reading document...',
  'Extracting important topics...',
  'Generating mind map...',
  'Arranging branches...',
];

const MindMapLoading = () => {
  const [stepIdx, setStepIdx] = useState(0);
  const [progress, setProgress] = useState(5);

  useEffect(() => {
    const interval = setInterval(() => {
      setStepIdx((prev) => {
        const next = Math.min(prev + 1, STEPS.length - 1);
        setProgress(((next + 1) / STEPS.length) * 100);
        return next;
      });
    }, 900);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      sx={{
        flexGrow: 1, display: 'flex', flexDirection: 'column',
        alignItems: 'center', justifyContent: 'center',
        gap: 3, bgcolor: '#181818', px: 4,
      }}
    >
      <Box
        sx={{
          width: 72, height: 72, borderRadius: '20px',
          bgcolor: '#5B567B',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          boxShadow: '0 8px 32px rgba(91,86,123,0.4)',
        }}
      >
        <MaterialIcon name="auto_awesome" style={{ color: '#F5F5F5', fontSize: 36 }} />
      </Box>

      <Box sx={{ textAlign: 'center', maxWidth: 340 }}>
        <Typography sx={{ fontSize: 20, fontWeight: 700, color: '#F5F5F5', mb: 1 }}>
          Building Your Mind Map
        </Typography>
        <Typography sx={{ fontSize: 14, color: '#A8A8A8', mb: 3 }}>
          {STEPS[stepIdx]}
        </Typography>
        <LinearProgress
          variant="determinate"
          value={progress}
          sx={{
            height: 4, borderRadius: 2, bgcolor: '#303646',
            '& .MuiLinearProgress-bar': { bgcolor: '#6C5CE7', borderRadius: 2 },
          }}
        />
      </Box>
    </Box>
  );
};

export default MindMapLoading;
