import { create } from 'zustand';
import { AVAILABLE_CONNECTORS } from '../data/connectors';

export const useConnectorStore = create((set) => ({
  connectors: AVAILABLE_CONNECTORS,
  activeConnector: null,
  modalOpen: false,

  openModal: (connector) => set({ activeConnector: connector, modalOpen: true }),
  closeModal: () => set({ activeConnector: null, modalOpen: false }),

  fetchConnectors: async () => {
    const { connectorService } = await import('../services/connectorService');
    const connectors = await connectorService.getConnectors();
    set({ connectors });
  },

  toggleConnector: (connectorId) => set((state) => ({
    connectors: state.connectors.map((c) =>
      c.id === connectorId ? { ...c, connected: !c.connected } : c
    )
  }))
}));
export default useConnectorStore;
