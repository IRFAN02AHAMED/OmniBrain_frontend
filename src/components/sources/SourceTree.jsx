import React from 'react';
import { Box } from '@mui/material';
import SourceTreeItem from './SourceTreeItem';
import { useSourceStore } from '../../store/sourceStore';

const SourceTree = () => {
  const sourceTree = useSourceStore((state) => state.sourceTree);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5, py: 1 }}>
      <SourceTreeItem node={sourceTree} level={0} />
    </Box>
  );
};

export default SourceTree;
