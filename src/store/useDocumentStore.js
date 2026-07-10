import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import GLOBAL_DOCUMENTS from '../data/globalDocuments';
import { listGoogleDriveFiles, getExtensionFromMimeType } from '../services/googleDriveService';

export const useDocumentStore = create(
  persist(
    (set, get) => ({
      documents: GLOBAL_DOCUMENTS,
      googleAccessToken: '',
      uploading: false,
      error: null,

      // Sync specific state
      syncing: false,
      syncError: null,
      syncMessage: null,

      setGoogleAccessToken: (token) => set({ googleAccessToken: token }),

      addDocument: (doc) => set((state) => ({
        documents: [...state.documents, doc]
      })),

      removeDocument: (docId) => set((state) => ({
        documents: state.documents.filter((d) => d.id !== docId)
      })),

      setUploading: (uploading) => set({ uploading }),
      setError: (error) => set({ error }),

      setSyncing: (syncing) => set({ syncing }),
      setSyncError: (err) => set({ syncError: err }),
      setSyncMessage: (msg) => set({ syncMessage: msg }),

      syncWithGoogleDrive: async (token) => {
        const activeToken = token || get().googleAccessToken;
        if (!activeToken) {
          set({ syncError: 'No Google OAuth token set.' });
          return;
        }

        set({ syncing: true, syncError: null, syncMessage: null });
        try {
          const files = await listGoogleDriveFiles(activeToken);
          const currentDocs = get().documents;
          const currentIds = new Set(currentDocs.map(d => d.id));
          const currentNames = new Set(currentDocs.map(d => d.name));

          const formatSize = (bytes) => {
            if (!bytes) return '1.2 MB';
            const kb = parseInt(bytes) / 1024;
            if (kb < 1024) return `${Math.round(kb)} KB`;
            return `${(kb / 1024).toFixed(1)} MB`;
          };

          const newDocs = [];
          files.forEach((file) => {
            // Avoid duplicates
            if (currentIds.has(file.id) || currentNames.has(file.name)) return;

            const ext = getExtensionFromMimeType(file.mimeType, file.name);

            newDocs.push({
              id: file.id,
              name: file.name,
              size: formatSize(file.size),
              type: ext
            });
          });

          if (newDocs.length > 0) {
            set({
              documents: [...currentDocs, ...newDocs],
              syncMessage: `Successfully synced ${newDocs.length} new document(s) from Google Drive.`
            });
          } else {
            set({ syncMessage: 'Already up to date. No new documents found to sync.' });
          }
        } catch (err) {
          set({ syncError: err.message || 'Failed to sync with Google Drive.' });
        } finally {
          set({ syncing: false });
        }
      }
    }),
    {
      name: 'omnibrain-documents',
      partialize: (state) => ({
        googleAccessToken: state.googleAccessToken,
        documents: state.documents,
      }),
    }
  )
);

export default useDocumentStore;
