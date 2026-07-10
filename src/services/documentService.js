import apiClient from './apiClient';

const formatSize = (bytes) => {
  const numericBytes = Number(bytes || 0);
  if (!numericBytes) return '0 KB';
  const kb = numericBytes / 1024;
  if (kb < 1024) return `${Math.round(kb)} KB`;
  return `${(kb / 1024).toFixed(1)} MB`;
};

const getFileType = (fileName = '', mimeType = '') => {
  const dotIndex = fileName.lastIndexOf('.');
  if (dotIndex !== -1) {
    return fileName.slice(dotIndex + 1).toLowerCase();
  }

  if (mimeType?.includes('/')) {
    return mimeType.split('/').pop().toLowerCase();
  }

  return 'file';
};

export const documentService = {
  getGlobalDocuments: async () => {
    const response = await apiClient.get('/documents/');
    return (response.data || []).map((document) => ({
      id: String(document.id),
      name: document.original_file_name || document.file_name,
      size: formatSize(document.file_size),
      type: getFileType(document.original_file_name || document.file_name, document.mime_type),
      sourceType: document.source_type,
      processingStatus: document.processing_status,
      chunkCount: document.chunk_count,
      driveFileId: document.drive_file_id,
      driveWebUrl: document.drive_web_url,
    }));
  },

  uploadGlobalDocumentToDrive: async (file) => {
    const formData = new FormData();
    formData.append('file', file);

    const response = await apiClient.post('/google/drive/upload', formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    return response.data;
  },

  syncGlobalDocuments: async () => {
    const response = await apiClient.post('/sync/global');
    return response.data;
  },
};
export default documentService;
