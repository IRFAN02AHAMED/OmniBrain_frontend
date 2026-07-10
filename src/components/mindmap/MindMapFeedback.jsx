import React from 'react';
import { Box, Button } from '@mui/material';
import MaterialIcon from '../common/MaterialIcon';
import useMindMapStore from '../../store/useMindMapStore';

const MindMapFeedback = () => {
  const feedback = useMindMapStore((s) => s.feedback);
  const submitFeedback = useMindMapStore((s) => s.submitFeedback);

  const btnBase = {
    borderRadius: '8px', textTransform: 'none', fontSize: 13, fontWeight: 500,
    px: 2, py: 0.75, gap: 0.75,
    border: '1px solid #4A5363', color: '#A8A8A8', bgcolor: '#303646',
    '&:hover': { bgcolor: '#394150', color: '#F5F5F5', borderColor: '#6C7280' },
  };

  return (
    <Box sx={{ position: 'absolute', bottom: 20, left: 20, zIndex: 10, display: 'flex', gap: 1 }}>
      <Button
        sx={{
          ...btnBase,
          ...(feedback === 'good' && { bgcolor: 'rgba(76,175,138,0.15)', borderColor: '#4CAF8A', color: '#4CAF8A' }),
        }}
        onClick={() => submitFeedback('good')}
        startIcon={<MaterialIcon name="thumb_up" filled={feedback === 'good'} style={{ fontSize: 16 }} />}
      >
        Good content
      </Button>

      <Button
        sx={{
          ...btnBase,
          ...(feedback === 'bad' && { bgcolor: 'rgba(186,26,26,0.12)', borderColor: '#FF6B6B', color: '#FF6B6B' }),
        }}
        onClick={() => submitFeedback('bad')}
        startIcon={<MaterialIcon name="thumb_down" filled={feedback === 'bad'} style={{ fontSize: 16 }} />}
      >
        Bad content
      </Button>
    </Box>
  );
};

export default MindMapFeedback;
