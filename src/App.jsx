import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme/index';
import { useThemeStore } from './store/themeStore';
import ProtectedRoute from './components/routing/ProtectedRoute';

import SignInPage from './pages/SignInPage';
import VerificationPage from './pages/VerificationPage';
import AuthCallbackPage from './pages/AuthCallbackPage';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';
import MindMapPage from './pages/MindMapPage';

function App() {
  const { mode } = useThemeStore();
  const activeMuiTheme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={activeMuiTheme}>
      <CssBaseline />
      <Routes>
        {/* Public routes */}
        <Route path="/signin" element={<SignInPage />} />
        <Route path="/verify" element={<VerificationPage />} />
        <Route path="/auth/callback" element={<AuthCallbackPage />} />

        {/* Protected routes */}
        <Route element={<ProtectedRoute />}>
          <Route path="/chat" element={<ChatPage />} />
          <Route path="/chat/:sessionId" element={<ChatPage />} />
          <Route path="/documents" element={<DocumentsPage />} />
          <Route path="/mindmap" element={<MindMapPage />} />
        </Route>

        {/* Catch-all: redirect root to /signin */}
        <Route path="/" element={<Navigate to="/signin" replace />} />
        <Route path="*" element={<Navigate to="/signin" replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;
