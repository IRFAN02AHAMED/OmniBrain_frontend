import apiClient from './apiClient';
import { GLOBAL_DOCUMENTS } from '../data/globalDocuments';

export const documentService = {
  /**
   * Fetches global document records.
   */
  getGlobalDocuments: async () => {
    // Simulated promise delay
    await new Promise((resolve) => setTimeout(resolve, 400));
    
    // Real API integration (commented out for reference):
    // const response = await apiClient.get('/documents/global');
    // return response.data;
    
    return GLOBAL_DOCUMENTS;
  },

  /**
   * Upload document files to Google Drive.
   * @param {Array<File>} files 
   */
  uploadDocuments: async (files) => {
    const uploadedResults = [];

    for (const file of files) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await apiClient.post('/google/drive/upload', formData);
        uploadedResults.push(response.data?.data || response.data);
      } catch (err) {
        console.error("Failed to upload file:", file.name, err);
      }
    }

    return uploadedResults;
  }
};
export default documentService;
