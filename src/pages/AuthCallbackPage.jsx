import { useEffect } from 'react';
import { Box, CircularProgress, Typography } from '@mui/material';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { useAppStore } from '../store/store';

const AuthCallbackPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const login = useAppStore((state) => state.login);

  useEffect(() => {
    const token = searchParams.get('token');

    if (!token) {
      navigate('/signin', { replace: true });
      return;
    }

    localStorage.setItem('auth_token', token);
    login();
    navigate('/chat', { replace: true });
  }, [login, navigate, searchParams]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 2,
      }}
    >
      <CircularProgress />
      <Typography variant="body1" color="text.secondary">
        Signing you in...
      </Typography>
    </Box>
  );
};

export default AuthCallbackPage;
