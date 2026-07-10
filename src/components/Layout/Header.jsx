import React, { useState } from 'react';
import { Box, Typography, Button, Menu, MenuItem, IconButton, TextField, InputAdornment, Chip, Tooltip } from '@mui/material';
import MaterialIcon from '../Common/MaterialIcon';
import { useAppStore } from '../../store/store';
import { useThemeStore } from '../../store/themeStore';

const Header = () => {
  const {
    currentView,
    models,
    selectedModel,
    setSelectedModel,
    searchQuery,
    setSearchQuery
  } = useAppStore();
  const { mode, toggleTheme } = useThemeStore();

  const [anchorEl, setAnchorEl] = useState(null);
  const openMenu = Boolean(anchorEl);

  const handleModelClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleModelClose = (model) => {
    setAnchorEl(null);
    if (model && model.id) {
      setSelectedModel(model);
    }
  };

  return (
    <Box
      component="header"
      sx={{
        height: 64,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        px: 3,
        bgcolor: 'rgba(248, 250, 249, 0.6)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.4)',
        zIndex: 50,
        position: 'sticky',
        top: 0,
      }}
    >
      {/* Context-Sensitive Left Area */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {currentView === 'map' ? (
          <>
            <Typography variant="h2" sx={{ fontSize: '20px', fontWeight: 700, color: 'primary.main' }}>
              The Web's Evolving Landscape
            </Typography>
            <Chip
              label="Auto-Generated"
              size="small"
              sx={{
                bgcolor: 'primary.container',
                color: 'primary.main',
                fontWeight: 700,
                fontSize: '10px',
                height: 20,
              }}
            />
          </>
        ) : (
          <>
            <Typography variant="body2" sx={{ color: 'text.secondary', fontWeight: 500 }}>
              Model:
            </Typography>
            <Button
              onClick={handleModelClick}
              endIcon={<MaterialIcon name="expand_more" />}
              sx={{
                bgcolor: '#ffffff',
                border: '1px solid rgba(0, 0, 0, 0.08)',
                color: 'primary.main',
                px: 2,
                py: 0.5,
                borderRadius: '9999px',
                fontWeight: 750,
                fontSize: '13px',
                '&:hover': {
                  bgcolor: 'rgba(0,0,0,0.02)',
                },
              }}
            >
              <Box
                sx={{
                  width: 8,
                  height: 8,
                  borderRadius: '50%',
                  bgcolor: 'primary.main',
                  mr: 1,
                  display: 'inline-block',
                }}
              />
              {selectedModel.name}
            </Button>
            <Menu anchorEl={anchorEl} open={openMenu} onClose={() => handleModelClose(null)}>
              {models.map((model) => (
                <MenuItem key={model.id} onClick={() => handleModelClose(model)}>
                  {model.name}
                </MenuItem>
              ))}
            </Menu>
          </>
        )}
      </Box>

      {/* Right Action Icons */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
        {currentView === 'map' && (
          <TextField
            placeholder="Search nodes..."
            size="small"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <MaterialIcon name="search" style={{ fontSize: '20px', color: '#717975' }} />
                </InputAdornment>
              ),
            }}
            sx={{
              width: 180,
              '& .MuiOutlinedInput-root': {
                borderRadius: '9999px',
                height: 36,
                backgroundColor: 'background.containerLow',
                '& fieldset': {
                  borderColor: 'rgba(0,0,0,0.06)',
                },
              },
            }}
          />
        )}

        <IconButton size="small" sx={{ color: 'text.secondary' }}>
          <MaterialIcon name="share" style={{ fontSize: '22px' }} />
        </IconButton>

        <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <IconButton
            size="small"
            onClick={toggleTheme}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            <MaterialIcon name={mode === 'dark' ? 'light_mode' : 'dark_mode'} style={{ fontSize: '22px' }} />
          </IconButton>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Header;
