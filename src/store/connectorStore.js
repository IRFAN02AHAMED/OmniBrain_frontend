import { create } from 'zustand';
import { AVAILABLE_CONNECTORS } from '../data/connectors';

export const useConnectorStore = create((set) => ({
  connectors: AVAILABLE_CONNECTORS,
  activeConnector: null,
  modalOpen: false,

  openModal: (connector) => set({ activeConnector: connector, modalOpen: true }),
  closeModal: () => set({ activeConnector: null, modalOpen: false }),

  toggleConnector: (connectorId) => set((state) => ({
    connectors: state.connectors.map((c) =>
      c.id === connectorId ? { ...c, connected: !c.connected } : c
    )
  }))
}));
export default useConnectorStore;
