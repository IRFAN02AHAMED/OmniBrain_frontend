import React from 'react';
import { Box, Button, IconButton, InputBase, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import MaterialIcon from '../Common/MaterialIcon';
import GlassCard from '../Common/GlassCard';
import { useAppStore } from '../../store/store';

const StyledInputContainer = styled(GlassCard)(({ theme }) => ({
  border: '1px solid rgba(252, 146, 155, 0.3)',
  boxShadow: '0px 8px 32px 0px rgba(252, 146, 155, 0.08)',
  borderRadius: '16px',
  padding: '6px',
  width: '100%',
  maxWidth: '896px',
  margin: '0 auto',
}));

const ChatInput = () => {
  const { chatInput, setChatInput, sendMessage } = useAppStore();

  const handleSend = () => {
    if (chatInput.trim()) {
      sendMessage(chatInput);
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <Box sx={{ p: 3, background: 'linear-gradient(to top, #f8faf9 70%, rgba(248, 250, 249, 0) 100%)' }}>
      <StyledInputContainer>
        {/* Top Attachment Helpers */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 2, pt: 0.5, pb: 1 }}>
          <Box sx={{ display: 'flex', gap: 1.5 }}>
            <Button
              size="small"
              startIcon={<MaterialIcon name="image" style={{ fontSize: '18px' }} />}
              sx={{
                color: 'text.secondary',
                fontSize: '12px',
                p: '2px 8px',
                '&:hover': { color: 'primary.main', bgcolor: 'rgba(0,0,0,0.02)' },
              }}
            >
              Image
            </Button>
            <Button
              size="small"
              startIcon={<MaterialIcon name="description" style={{ fontSize: '18px' }} />}
              sx={{
                color: 'text.secondary',
                fontSize: '12px',
                p: '2px 8px',
                '&:hover': { color: 'primary.main', bgcolor: 'rgba(0,0,0,0.02)' },
              }}
            >
              Document
            </Button>
          </Box>
          <Typography variant="caption" sx={{ color: 'text.secondary', opacity: 0.4, fontSize: '10px' }}>
            Press Shift + Enter for new line
          </Typography>
        </Box>

        {/* Input Bar */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, px: 1, pb: 0.5 }}>
          <IconButton
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              bgcolor: 'background.containerHighest',
              '&:hover': { bgcolor: 'primary.container', color: 'primary.main' },
            }}
          >
            <MaterialIcon name="add" />
          </IconButton>

          <Box
            sx={{
              flexGrow: 1,
              bgcolor: 'background.containerLow',
              borderRadius: '12px',
              px: 2,
              height: 44,
              display: 'flex',
              alignItems: 'center',
              border: '1px solid transparent',
              transition: '0.2s',
              '&:focus-within': {
                borderColor: 'rgba(59, 103, 88, 0.3)',
                bgcolor: '#ffffff',
              },
            }}
          >
            <InputBase
              fullWidth
              placeholder="Message OmniBrain..."
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={handleKeyDown}
              sx={{
                fontSize: '16px',
                color: 'text.primary',
                '& input::placeholder': {
                  color: 'text.secondary',
                  opacity: 0.4,
                },
              }}
            />
          </Box>

          <IconButton
            onClick={handleSend}
            disabled={!chatInput.trim()}
            sx={{
              width: 40,
              height: 40,
              borderRadius: '12px',
              bgcolor: chatInput.trim() ? 'primary.main' : 'background.containerHighest',
              color: chatInput.trim() ? '#ffffff' : 'text.secondary',
              '&:hover': {
                bgcolor: chatInput.trim() ? '#2e5145' : 'background.containerHighest',
              },
            }}
          >
            <MaterialIcon name="send" filled={!!chatInput.trim()} />
          </IconButton>
        </Box>
      </StyledInputContainer>
    </Box>
  );
};

export default ChatInput;
