import React, { useState } from 'react';
import { Box, Typography, Button, TextField, InputAdornment, Link, IconButton, Tooltip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useGoogleLogin } from '@react-oauth/google';
import MaterialIcon from '../components/common/MaterialIcon';
import GlassCard from '../components/common/GlassCard';
import { useAppStore } from '../store/store';
import { useThemeStore } from '../store/themeStore';
import useDocumentStore from '../store/useDocumentStore';
import authService from '../services/authService';

const SignInPage = () => {
  const { startOtpTimer } = useAppStore();
  const { setGoogleAccessToken } = useDocumentStore();
  const navigate = useNavigate();
  const { mode, toggleTheme } = useThemeStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!email) return;

    setLoading(true);
    try {
      await authService.sendOtp(email);
      startOtpTimer();
      navigate('/verify');
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const loginGoogle = useGoogleLogin({
    onSuccess: (tokenResponse) => {
      setGoogleLoading(false);
      setGoogleAccessToken(tokenResponse.access_token);
      useAppStore.getState().login();
      navigate('/chat');
    },
    onError: (error) => {
      setGoogleLoading(false);
      console.error('Google Login Failed', error);
    },
    onNonOAuthError: () => {
      setGoogleLoading(false);
    },
    scope: 'https://www.googleapis.com/auth/drive.file https://www.googleapis.com/auth/drive.readonly'
  });

  const handleGoogleLogin = () => {
    setGoogleLoading(true);
    loginGoogle();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
        position: 'relative',
        overflow: 'hidden',
        background: (theme) =>
          theme.palette.mode === 'dark'
            ? 'radial-gradient(at 0% 0%, #0d1423 0px, transparent 50%), radial-gradient(at 100% 0%, #151d2c 0px, transparent 50%)'
            : `
              radial-gradient(at 0% 0%, rgba(189, 237, 218, 0.4) 0px, transparent 50%),
              radial-gradient(at 100% 0%, rgba(255, 220, 197, 0.3) 0px, transparent 50%),
              radial-gradient(at 100% 100%, rgba(252, 146, 155, 0.2) 0px, transparent 50%),
              radial-gradient(at 0% 100%, rgba(172, 219, 201, 0.4) 0px, transparent 50%)
            `,
        bgcolor: 'background.default',
      }}
    >
      {/* Background Blobs */}
      <Box
        sx={{
          position: 'absolute',
          width: 600,
          height: 600,
          top: -100,
          left: -100,
          zIndex: 1,
          filter: 'blur(65px)',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(108, 92, 231, 0.05) 0%, transparent 70%)',
        }}
      />

      {/* Header Anchor */}
      <Box component="header" sx={{ width: '100%', height: 80, display: 'flex', alignItems: 'center', justifyContent: 'space-between', px: 4, pt: 3, zIndex: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MaterialIcon name="hub" style={{ color: '#6C5CE7', fontSize: '32px' }} filled />
          <Typography variant="h2" sx={{ fontSize: '32px', color: (theme) => theme.palette.mode === 'dark' ? '#F8FAFC' : 'primary.main', fontWeight: 800 }}>
            OmniBrain
          </Typography>
        </Box>
        <Tooltip title={mode === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}>
          <IconButton
            onClick={toggleTheme}
            sx={{
              color: 'text.secondary',
              '&:hover': { color: 'primary.main' }
            }}
          >
            <MaterialIcon name={mode === 'dark' ? 'light_mode' : 'dark_mode'} style={{ fontSize: '24px' }} />
          </IconButton>
        </Tooltip>
      </Box>

      {/* Form Card */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 3, zIndex: 10 }}>
        <GlassCard sx={{ width: '100%', maxWidth: 448, p: { xs: 4, md: 6 }, borderRadius: '32px' }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography variant="h2" sx={{ fontSize: '28px', mb: 1, fontWeight: 700 }}>
              Welcome
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Access your intelligent knowledge workspace.
            </Typography>
          </Box>

          <Button
            fullWidth
            onClick={handleGoogleLogin}
            disabled={googleLoading}
            variant="outlined"
            startIcon={
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB2UnnMSpaRF36azoFl_sWshTVab2tMcEe6SnVB1_SmUzpw8bZMWQkJzHejQ7Koh9bsrGmt3bYudmf7H_1WhN4klHCtCQV45e1rsCDbpvuF1Gq4AynnkBPMw0CKtD8O8FidWQSlIRCcCFSJ1wyHsSyPRA8FQxODIdfTKw5cpQQ9W5mdOsakaSgkM63pN76JVWigoPx_96tgdbmjl1Bcp6nh1jaHa6MMk-XKw-5FtzWhNucVu9v09vXdWMr_CmLq2S-dsTyhRpGB4Io"
                alt="Google"
                style={{ width: 20, height: 20 }}
              />
            }
            sx={{
              borderColor: 'outline.main',
              color: 'text.primary',
              py: 1.25,
              fontSize: '14px',
              borderRadius: '12px',
              bgcolor: (theme) => theme.palette.mode === 'dark' ? '#0d1423' : '#ffffff',
              '&:hover': {
                bgcolor: 'background.containerLow',
                borderColor: 'outline.main',
              },
            }}
          >
            {googleLoading ? 'Connecting...' : 'Continue with Google'}
          </Button>

          <Box sx={{ position: 'relative', my: 4, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ position: 'absolute', width: '100%', borderTop: '1px solid rgba(192, 200, 195, 0.3)' }} />
            <Typography
              variant="caption"
              sx={{
                position: 'relative',
                px: 2,
                bgcolor: (theme) => theme.palette.mode === 'dark' ? '#151d2c' : 'rgba(255, 255, 255, 0.45)',
                color: 'text.secondary',
                fontSize: '12px',
                fontWeight: 600,
                letterSpacing: '0.05em',
                backdropFilter: 'blur(8px)',
              }}
            >
              OR EMAIL
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3.5 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Typography variant="button" sx={{ color: 'text.secondary', pl: 1, fontSize: '13px' }}>
                  Email Address
                </Typography>
                <TextField
                  fullWidth
                  placeholder="name@company.com"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MaterialIcon name="mail" style={{ color: '#717975' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', px: 1 }}>
                  <Typography variant="button" sx={{ color: 'text.secondary', fontSize: '13px' }}>
                    Password
                  </Typography>
                  <Link href="#" sx={{ fontSize: '12px', color: 'primary.main', fontWeight: 600, textDecoration: 'none', '&:hover': { textDecoration: 'underline' } }}>
                    Forgot password?
                  </Link>
                </Box>
                <TextField
                  fullWidth
                  placeholder="••••••••"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        <MaterialIcon name="lock" style={{ color: '#717975' }} />
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Button
                type="submit"
                fullWidth
                disabled={loading}
                variant="contained"
                color="primary"
                sx={{ py: 1.5, fontSize: '14px', borderRadius: '12px', mt: 1 }}
              >
                {loading ? 'Sending Code...' : 'Sign In'}
              </Button>
            </Box>
          </form>
        </GlassCard>
      </Box>

      {/* Footer */}
      <Box
        component="footer"
        sx={{
          width: '100%',
          p: 3,
          display: 'flex',
          flexDirection: { xs: 'column', md: 'row' },
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 2,
          borderTop: (theme) => `1px solid ${theme.palette.mode === 'dark' ? '#273244' : 'rgba(255, 255, 255, 0.2)'}`,
          backdropFilter: 'blur(10px)',
          zIndex: 10,
        }}
      >
        <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
          © 2024 OmniBrain AI. All rights reserved.
        </Typography>
        <Box sx={{ display: 'flex', gap: 3 }}>
          <Link href="#" sx={{ fontSize: '12px', color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Privacy Policy</Link>
          <Link href="#" sx={{ fontSize: '12px', color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Terms of Service</Link>
          <Link href="#" sx={{ fontSize: '12px', color: 'text.secondary', textDecoration: 'none', '&:hover': { color: 'primary.main' } }}>Contact</Link>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MaterialIcon name="language" style={{ color: '#94A3B8', fontSize: '18px' }} />
          <Typography variant="caption" sx={{ color: 'text.secondary', fontWeight: 500 }}>
            English (US)
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default SignInPage;
