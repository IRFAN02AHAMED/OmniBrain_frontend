import React from 'react';
import { Box, Typography } from '@mui/material';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';
import MaterialIcon from '../common/MaterialIcon';
import GlassCard from '../common/GlassCard';
import MessageActions from './MessageActions';

const normalizeMarkdownTables = (text) => {
  const lines = (text || '').split('\n');
  const normalized = [];

  const isTableLine = (line) => {
    const trimmed = line.trim();
    return trimmed.startsWith('|') && trimmed.endsWith('|');
  };

  const isTableSeparatorLine = (line) => {
    const trimmed = line.trim();
    return /^\|?[\s:-|]+\|?$/.test(trimmed) && trimmed.includes('-');
  };

  for (let index = 0; index < lines.length; index += 1) {
    const currentLine = lines[index];
    const previousLine = normalized[normalized.length - 1] || '';
    const nextLine = lines[index + 1] || '';
    const trimmed = currentLine.trim();

    if (
      trimmed === '' &&
      (isTableLine(previousLine) || isTableSeparatorLine(previousLine)) &&
      (isTableLine(nextLine) || isTableSeparatorLine(nextLine))
    ) {
      continue;
    }

    normalized.push(currentLine);
  }

  return normalized.join('\n');
};

const markdownComponents = {
  h1: ({ children }) => (
    <Typography
      variant="h1"
      sx={{
        fontSize: '24px',
        fontWeight: 800,
        mb: 1.5,
        color: (theme) => (theme.palette.mode === 'dark' ? '#F8FAFC' : 'text.primary'),
      }}
    >
      {children}
    </Typography>
  ),
  h2: ({ children }) => (
    <Typography
      variant="h2"
      sx={{
        fontSize: '20px',
        fontWeight: 800,
        mt: 2,
        mb: 1.25,
        color: (theme) => (theme.palette.mode === 'dark' ? '#F8FAFC' : 'text.primary'),
      }}
    >
      {children}
    </Typography>
  ),
  h3: ({ children }) => (
    <Typography
      variant="h3"
      sx={{
        fontSize: '17px',
        fontWeight: 700,
        mt: 1.75,
        mb: 1,
        color: (theme) => (theme.palette.mode === 'dark' ? '#F8FAFC' : 'text.primary'),
      }}
    >
      {children}
    </Typography>
  ),
  p: ({ children }) => (
    <Typography
      variant="body2"
      sx={{
        mb: 1.5,
        color: 'text.secondary',
        lineHeight: 1.75,
        fontSize: '14.5px',
        whiteSpace: 'pre-wrap',
      }}
    >
      {children}
    </Typography>
  ),
  ul: ({ children }) => (
    <Box component="ul" sx={{ m: 0, mb: 1.5, pl: 2.5, color: 'text.secondary' }}>
      {children}
    </Box>
  ),
  ol: ({ children }) => (
    <Box component="ol" sx={{ m: 0, mb: 1.5, pl: 2.75, color: 'text.secondary' }}>
      {children}
    </Box>
  ),
  li: ({ children }) => (
    <Box component="li" sx={{ mb: 0.75, pl: 0.25, '& > p': { mb: 0 } }}>
      <Typography variant="body2" sx={{ color: 'text.secondary', lineHeight: 1.7, fontSize: '14.5px' }}>
        {children}
      </Typography>
    </Box>
  ),
  blockquote: ({ children }) => (
    <Box
      sx={{
        mb: 1.75,
        pl: 1.75,
        py: 0.9,
        borderLeft: '3px solid',
        borderColor: 'primary.main',
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(108, 92, 231, 0.08)' : 'rgba(59, 103, 88, 0.06)',
        borderRadius: '0 10px 10px 0',
        '& > p:last-child': { mb: 0 },
      }}
    >
      {children}
    </Box>
  ),
  hr: () => (
    <Box
      sx={{
        height: 1,
        my: 2,
        bgcolor: (theme) =>
          theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.18)' : 'rgba(15, 23, 42, 0.08)',
      }}
    />
  ),
  a: ({ href, children }) => (
    <Box
      component="a"
      href={href}
      target="_blank"
      rel="noreferrer"
      sx={{
        color: 'primary.main',
        textDecoration: 'none',
        fontWeight: 600,
        '&:hover': {
          textDecoration: 'underline',
        },
      }}
    >
      {children}
    </Box>
  ),
  code: ({ inline, className, children }) => {
    const language = className?.replace('language-', '') || '';

    if (inline) {
      return (
        <Box
          component="code"
          sx={{
            fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: '0.9em',
            px: 0.75,
            py: 0.25,
            borderRadius: '6px',
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? 'rgba(148, 163, 184, 0.16)' : 'rgba(15, 23, 42, 0.07)',
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#E2E8F0' : '#1E293B',
          }}
        >
          {children}
        </Box>
      );
    }

    return (
      <Box
        component="pre"
        sx={{
          m: 0,
          mb: 2,
          p: 2,
          borderRadius: '14px',
          overflowX: 'auto',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? '#0F172A' : '#F8FAFC',
          border: (theme) =>
            theme.palette.mode === 'dark' ? '1px solid #243041' : '1px solid #E2E8F0',
        }}
      >
        {language && (
          <Typography
            variant="caption"
            sx={{
              display: 'block',
              mb: 1.25,
              color: 'text.secondary',
              textTransform: 'uppercase',
              letterSpacing: '0.06em',
              fontWeight: 700,
            }}
          >
            {language}
          </Typography>
        )}
        <Box
          component="code"
          sx={{
            fontFamily: '"SFMono-Regular", Consolas, "Liberation Mono", Menlo, monospace',
            fontSize: '13px',
            lineHeight: 1.7,
            color: (theme) =>
              theme.palette.mode === 'dark' ? '#E2E8F0' : '#0F172A',
            whiteSpace: 'pre-wrap',
          }}
        >
          {children}
        </Box>
      </Box>
    );
  },
  table: ({ children }) => (
    <Box sx={{ overflowX: 'auto', mb: 2 }}>
      <Box
        component="table"
        sx={{
          width: '100%',
          borderCollapse: 'collapse',
          fontSize: '14px',
          '& th, & td': {
            border: (theme) =>
              theme.palette.mode === 'dark' ? '1px solid #273244' : '1px solid #E2E8F0',
            px: 1.25,
            py: 0.9,
            textAlign: 'left',
          },
          '& th': {
            bgcolor: (theme) =>
              theme.palette.mode === 'dark' ? '#151D2C' : 'rgba(15, 23, 42, 0.04)',
            color: 'text.primary',
            fontWeight: 700,
          },
          '& td': {
            color: 'text.secondary',
          },
        }}
      >
        {children}
      </Box>
    </Box>
  ),
};

const AssistantMessageCard = ({ text, isStreaming = false, knowledgeSource = null }) => {
  const normalizedText = normalizeMarkdownTables(text);

  return (
    <Box sx={{ display: 'flex', gap: 2, alignItems: 'flex-start' }}>
      <Box
        sx={{
          width: 36,
          height: 36,
          borderRadius: '50%',
          bgcolor: 'primary.main',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#ffffff',
          boxShadow: (theme) =>
            theme.palette.mode === 'dark'
              ? '0 4px 12px rgba(108, 92, 231, 0.3)'
              : '0 4px 12px rgba(59, 103, 88, 0.15)',
          flexShrink: 0,
        }}
      >
        <MaterialIcon name="grain" style={{ fontSize: '18px' }} filled />
      </Box>
      <GlassCard
        sx={{
          p: 2.25,
          borderRadius: '4px 20px 20px 20px',
          maxWidth: '78%',
          bgcolor: (theme) =>
            theme.palette.mode === 'dark' ? 'background.card' : 'rgba(255, 255, 255, 0.65)',
          color: 'text.primary',
          border: (theme) =>
            theme.palette.mode === 'dark'
              ? `1px solid ${theme.palette.background.border}`
              : '1px solid rgba(255, 255, 255, 0.5)',
          boxShadow: '0 4px 16px rgba(0,0,0,0.02)',
        }}
      >
        <Typography
          variant="caption"
          sx={{
            fontWeight: 800,
            fontSize: '11px',
            color: 'primary.main',
            display: 'block',
            mb: 1,
            letterSpacing: '0.05em',
          }}
        >
          OmniBrain AI
        </Typography>

        {knowledgeSource && (
          <Box
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              alignSelf: 'flex-start',
              px: 1,
              py: 0.4,
              mb: 1.25,
              borderRadius: '999px',
              bgcolor: (theme) =>
                knowledgeSource === 'kb'
                  ? theme.palette.mode === 'dark'
                    ? 'rgba(34, 197, 94, 0.16)'
                    : 'rgba(34, 197, 94, 0.1)'
                  : theme.palette.mode === 'dark'
                    ? 'rgba(245, 158, 11, 0.16)'
                    : 'rgba(245, 158, 11, 0.12)',
              color: knowledgeSource === 'kb' ? '#16A34A' : '#D97706',
              border: '1px solid',
              borderColor: knowledgeSource === 'kb' ? 'rgba(34, 197, 94, 0.28)' : 'rgba(245, 158, 11, 0.28)',
            }}
          >
            <Typography variant="caption" sx={{ fontSize: '10px', fontWeight: 800, letterSpacing: '0.04em' }}>
              {knowledgeSource === 'kb' ? 'KB GROUNDED' : 'MODEL KNOWLEDGE'}
            </Typography>
          </Box>
        )}

        <Box sx={{ display: 'flex', flexDirection: 'column' }}>
          <ReactMarkdown remarkPlugins={[remarkGfm]} components={markdownComponents}>
            {normalizedText || ''}
          </ReactMarkdown>
        </Box>

        {isStreaming && (
          <Typography
            variant="caption"
            sx={{ color: 'text.secondary', fontStyle: 'italic', mt: 0.5 }}
          >
            Thinking...
          </Typography>
        )}

        <MessageActions />
      </GlassCard>
    </Box>
  );
};

export default AssistantMessageCard;
