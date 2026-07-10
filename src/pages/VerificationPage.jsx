import React, { useRef, useState, useEffect } from 'react';
import { Box, Typography, Button, Link } from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import MaterialIcon from '../components/common/MaterialIcon';
import GlassCard from '../components/common/GlassCard';
import { useAppStore } from '../store/store';
import authService from '../services/authService';

const shake = keyframes`
  0%, 100% { transform: translateX(0); }
  25% { transform: translateX(-4px); }
  75% { transform: translateX(4px); }
`;

const AnimatedInput = styled('input', {
  shouldForwardProp: (prop) => prop !== 'hasError',
})(({ theme, hasError }) => {
  const isDark = theme.palette.mode === 'dark';
  return {
    width: '48px',
    height: '56px',
    textAlign: 'center',
    fontSize: '28px',
    fontWeight: '600',
    borderRadius: '12px',
    border: `1px solid ${hasError ? '#ba1a1a' : isDark ? '#273244' : 'rgba(192, 200, 195, 0.4)'}`,
    backgroundColor: isDark ? '#0d1423' : 'rgba(255, 255, 255, 0.8)',
    color: isDark ? '#F8FAFC' : '#191c1c',
    transition: 'all 0.3s',
    animation: hasError ? `${shake} 0.2s cubic-bezier(.36,.07,.19,.97) both` : 'none',
    outline: 'none',
    '&:focus': {
      boxShadow: `0 0 0 2px ${isDark ? '#6C5CE7' : '#a2d0bf'}`,
      borderColor: isDark ? '#6C5CE7' : '#3b6758',
    },
    [theme.breakpoints.up('md')]: {
      width: '64px',
      height: '80px',
      fontSize: '32px',
    },
  };
});

const VerificationPage = () => {
  const { otpEmail, otpTimer, login, stopOtpTimer } = useAppStore();
  const [code, setCode] = useState(['', '', '', '', '', '']);
  const [hasError, setHasError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [verified, setVerified] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleChange = (e, index) => {
    const value = e.target.value;
    if (/[^0-9]/.test(value)) return;

    const newCode = [...code];
    newCode[index] = value.substring(value.length - 1);
    setCode(newCode);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === 'Backspace' && !code[index] && index > 0) {
      const newCode = [...code];
      newCode[index - 1] = '';
      setCode(newCode);
      inputRefs.current[index - 1].focus();
    }
  };

  const handleVerify = async (e) => {
    if (e) e.preventDefault();
    const finalCode = code.join('');

    if (finalCode.length === 6) {
      setLoading(true);
      setHasError(false);
      try {
        await authService.verifyOtp(otpEmail, finalCode);
        setVerified(true);
        setTimeout(() => {
          stopOtpTimer();
          login();
        }, 1200);
      } catch (err) {
        setHasError(true);
        setCode(['', '', '', '', '', '']);
        if (inputRefs.current[0]) inputRefs.current[0].focus();
      } finally {
        setLoading(false);
      }
    } else {
      setHasError(true);
    }
  };

  const formatTimer = (seconds) => {
    if (seconds <= 0) return 'Expired';
    const m = Math.floor(seconds / 60).toString().padStart(2, '0');
    const s = (seconds % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: 'background.default',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background Blobs */}
      <Box sx={{ position: 'fixed', inset: 0, overflow: 'hidden', pointerEvents: 'none', zIndex: 0 }}>
        <Box sx={{ position: 'absolute', top: '-10%', left: '-10%', width: 500, height: 500, borderRadius: '50%', bgcolor: 'primary.container', filter: 'blur(80px)', opacity: 0.1 }} />
      </Box>

      {/* Header */}
      <Box component="header" sx={{ position: 'fixed', top: 0, left: 0, width: '100%', height: 64, display: 'flex', alignItems: 'center', px: { xs: 2, md: 8 }, zIndex: 10 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <MaterialIcon name="hub" style={{ color: '#6C5CE7', fontSize: '32px' }} />
          <Typography variant="h2" sx={{ fontSize: '24px', color: (theme) => theme.palette.mode === 'dark' ? '#F8FAFC' : 'primary.main', fontWeight: 800 }}>
            OmniBrain
          </Typography>
        </Box>
      </Box>

      {/* Main card */}
      <Box component="main" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', p: 2, zIndex: 5 }}>
        <GlassCard
          sx={{
            width: '100%',
            maxWidth: 512,
            p: { xs: 4, md: 6 },
            borderRadius: '32px',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            textAlign: 'center',
            position: 'relative',
            boxShadow: 'inset 1px 1px 0px rgba(255, 255, 255, 0.5), 0 8px 32px 0 rgba(59, 103, 88, 0.08)',
          }}
        >
          <Box
            sx={{
              width: 64,
              height: 64,
              bgcolor: 'rgba(108, 92, 231, 0.1)',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mb: 3,
            }}
          >
            <MaterialIcon name="shield_person" style={{ color: '#6C5CE7', fontSize: '32px' }} />
          </Box>

          <Typography variant="h2" sx={{ fontSize: '26px', fontWeight: 700, mb: 1 }}>
            Check your email
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary', maxWidth: 380, mb: 3 }}>
            We've sent a 6-digit security code to <span style={{ fontWeight: 600, color: 'inherit' }}>{otpEmail}</span>. Please enter it below to proceed.
          </Typography>

          <Box component="form" onSubmit={handleVerify} sx={{ width: '100%', mb: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', gap: { xs: 1, md: 2 }, mb: 4 }}>
              {code.map((val, idx) => (
                <AnimatedInput
                  key={idx}
                  ref={(el) => (inputRefs.current[idx] = el)}
                  type="text"
                  maxLength={1}
                  value={val}
                  hasError={hasError}
                  onChange={(e) => handleChange(e, idx)}
                  onKeyDown={(e) => handleKeyDown(e, idx)}
                  autoFocus={idx === 0}
                />
              ))}
            </Box>

            <Button
              type="submit"
              fullWidth
              disabled={loading || verified}
              variant="contained"
              color={verified ? 'secondary' : 'primary'}
              sx={{
                py: 1.5,
                borderRadius: '9999px',
                fontSize: '14px',
                fontWeight: 700,
                boxShadow: '0px 8px 32px 0px rgba(108, 92, 231, 0.25)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 1,
              }}
            >
              {loading ? (
                <>
                  <MaterialIcon name="progress_activity" className="animate-spin" />
                  <span>Verifying...</span>
                </>
              ) : verified ? (
                <>
                  <MaterialIcon name="check_circle" />
                  <span>Verified!</span>
                </>
              ) : (
                <>
                  <span>Verify & Proceed</span>
                  <MaterialIcon name="arrow_forward" />
                </>
              )}
            </Button>
          </Box>

          <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, color: 'text.secondary', fontSize: '14px' }}>
              <MaterialIcon name="schedule" style={{ fontSize: '18px' }} />
              <Typography variant="body2" sx={{ fontSize: '14px' }}>
                Code expires in{' '}
                <span
                  style={{
                    fontWeight: 700,
                    color: otpTimer <= 0 ? '#ba1a1a' : '#6C5CE7',
                  }}
                >
                  {formatTimer(otpTimer)}
                </span>
              </Typography>
            </Box>
            <Box sx={{ display: 'flex', gap: 1, fontSize: '14px' }}>
              <Typography sx={{ color: 'text.secondary', fontSize: '14px' }}>Didn't receive the code?</Typography>
              <Link
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  useAppStore.getState().startOtpTimer();
                }}
                sx={{
                  color: 'primary.main',
                  fontWeight: 700,
                  textDecoration: 'none',
                  borderBottom: '2px solid transparent',
                  '&:hover': {
                    borderBottomColor: 'primary.light',
                  },
                }}
              >
                Resend Code
              </Link>
            </Box>
          </Box>

          <Box
            sx={{
              position: 'absolute',
              bottom: 0,
              left: 0,
              width: '100%',
              height: '4px',
              background: 'linear-gradient(to right, #6C5CE7, #fc929b, #ffdcc5)',
              opacity: 0.5,
            }}
          />
        </GlassCard>
      </Box>

      {/* Footer */}
      <Box component="footer" sx={{ p: 2, display: 'flex', justifyContent: 'center', zIndex: 10 }}>
        <Link
          href="#"
          sx={{
            display: 'flex',
            alignItems: 'center',
            gap: 0.5,
            fontSize: '12px',
            color: 'text.secondary',
            textDecoration: 'none',
            '&:hover': { color: 'primary.main' },
          }}
        >
          <MaterialIcon name="help" style={{ fontSize: '14px' }} />
          <span>Need assistance? Contact OmniBrain Support</span>
        </Link>
      </Box>
    </Box>
  );
};

export default VerificationPage;
