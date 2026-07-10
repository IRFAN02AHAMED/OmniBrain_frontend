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
   * Simulates uploading document files.
   * @param {Array<File>} files 
   */
  uploadDocuments: async (files) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    
    // Real API integration:
    // const formData = new FormData();
    // files.forEach(file => formData.append('files', file));
    // const response = await apiClient.post('/documents/upload', formData, {
    //   headers: { 'Content-Type': 'multipart/form-data' }
    // });
    // return response.data;

    return files.map(file => ({
      name: file.name,
      size: file.size,
      uploadedAt: new Date().toISOString()
    }));
  }
};
export default documentService;
