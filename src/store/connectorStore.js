import { create } from 'zustand';
import { AVAILABLE_CONNECTORS } from '../data/connectors';
import connectorService from '../services/connectorService';

export const useConnectorStore = create((set) => ({
  connectors: AVAILABLE_CONNECTORS,
  activeConnector: null,
  modalOpen: false,
  loading: false,

  openModal: (connector) => set({ activeConnector: connector, modalOpen: true }),
  closeModal: () => set({ activeConnector: null, modalOpen: false }),

  loadConnectors: async () => {
    set({ loading: true });
    try {
      const connectors = await connectorService.getConnectors();
      set({ connectors });
    } finally {
      set({ loading: false });
    }
  },

  toggleConnector: (connectorId) => set((state) => ({
    connectors: state.connectors.map((c) =>
      c.id === connectorId ? { ...c, connected: !c.connected } : c
    )
  })),

  setConnectorConnected: (connectorId, connected) => set((state) => ({
    connectors: state.connectors.map((c) =>
      c.id === connectorId ? { ...c, connected } : c
    )
  })),
}));
export default useConnectorStore;
