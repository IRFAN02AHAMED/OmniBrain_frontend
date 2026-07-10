import React, { useEffect } from 'react';
import { ThemeProvider, CssBaseline } from '@mui/material';
import { lightTheme, darkTheme } from './theme/index';
import { useThemeStore } from './store/themeStore';
import { useAppStore } from './store/store';
import { useChatStore } from './store/chatStore';
import SignInPage from './pages/SignInPage';
import VerificationPage from './pages/VerificationPage';
import ChatPage from './pages/ChatPage';
import DocumentsPage from './pages/DocumentsPage';

function App() {
  const { mode } = useThemeStore();
  const { currentView, isLoggedIn } = useAppStore();
  const { activeRoute } = useChatStore();

  useEffect(() => {
    if (window.location.pathname === '/auth/callback') {
      const urlParams = new URLSearchParams(window.location.search);
      const token = urlParams.get('token');
      if (token) {
        useAppStore.getState().setAuthFromToken(token);
        // Clear token from URL
        window.history.replaceState({}, document.title, '/');
      }
    }
  }, []);

  const renderView = () => {
    if (!isLoggedIn) {
      if (currentView === 'verify') {
        return <VerificationPage />;
      }
      return <SignInPage />;
    }

    if (activeRoute === 'documents') {
      return <DocumentsPage />;
    }
    return <ChatPage />;
  };

  const activeMuiTheme = mode === 'dark' ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={activeMuiTheme}>
      <CssBaseline />
      {renderView()}
    </ThemeProvider>
  );
}

export default App;
