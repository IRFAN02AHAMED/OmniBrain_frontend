import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import documentService from '../services/documentService';

export const useDocumentStore = create(
  persist(
    (set, get) => ({
      documents: [],
      uploading: false,
      loadingDocuments: false,
      error: null,

      // Sync specific state
      syncing: false,
      syncError: null,
      syncMessage: null,

      resetStore: () => set({
        documents: [],
        uploading: false,
        loadingDocuments: false,
        error: null,
        syncing: false,
        syncError: null,
        syncMessage: null,
      }),

      addDocument: (doc) => set((state) => ({
        documents: [...state.documents, doc]
      })),

      removeDocument: (docId) => set((state) => ({
        documents: state.documents.filter((d) => d.id !== docId)
      })),

      setUploading: (uploading) => set({ uploading }),
      setError: (error) => set({ error }),
      setDocuments: (documents) => set({ documents }),
      setLoadingDocuments: (loadingDocuments) => set({ loadingDocuments }),

      setSyncing: (syncing) => set({ syncing }),
      setSyncError: (err) => set({ syncError: err }),
      setSyncMessage: (msg) => set({ syncMessage: msg }),

      loadDocuments: async () => {
        set({ loadingDocuments: true, error: null });
        try {
          const documents = await documentService.getGlobalDocuments();
          set({ documents });
        } catch (err) {
          set({ error: err?.response?.data?.detail || err.message || 'Failed to load documents.' });
        } finally {
          set({ loadingDocuments: false });
        }
      },

      syncWithGoogleDrive: async () => {
        set({ syncing: true, syncError: null, syncMessage: null });
        try {
          const result = await documentService.syncGlobalDocuments();
          await get().loadDocuments();

          const filesAdded = result?.results?.files_added ?? 0;
          const filesSkipped = result?.results?.files_skipped ?? 0;
          set({
            syncMessage:
              filesAdded > 0
                ? `Synced ${filesAdded} new document(s) from Global Documents.${filesSkipped ? ` Skipped ${filesSkipped} already indexed file(s).` : ''}`
                : 'Global Documents is already up to date. No new files were indexed.',
          });
        } catch (err) {
          set({ syncError: err?.response?.data?.detail || err.message || 'Failed to sync with Google Drive.' });
        } finally {
          set({ syncing: false });
        }
      }
    }),
    {
      name: 'omnibrain-documents',
      partialize: (state) => ({
        documents: state.documents,
      }),
    }
  )
);

export default useDocumentStore;
