// Mock mind map data — mirrors exact backend response shape.
// Delete this file and point mindMapService.js to real endpoints when backend is ready.

export const mockMindMap = {
  mindmap_id: 'map-1',
  document_id: 'doc-1',
  title: "The Web's Evolving Landscape: From Read-Only to User-Owned",
  source_count: 1,
  document_name: 'web-evolution.pdf',
  root: {
    id: 'root',
    label: 'Web Evolution',
    summary: 'Evolution of the internet from Web 1.0 to Web3, tracing how user control and interactivity changed at each stage.',
    has_children: true,
    source_reference: null,
    children: [
      {
        id: 'web-1',
        label: 'Web 1.0',
        summary: 'The original read-only web. Static pages, basic HTML, no user interaction.',
        has_children: true,
        source_reference: { page: 1, section: 'Introduction', chunk_id: 'chunk-1' },
        children: [
          { id: 'web-1-read-only', label: 'Read-only pages', summary: 'Content was static and only authors could publish.', has_children: false, source_reference: { page: 1, section: 'Web 1.0' }, children: [] },
          { id: 'web-1-connectivity', label: 'Basic connectivity', summary: 'Dial-up modems and early ISPs.', has_children: false, source_reference: { page: 1, section: 'Web 1.0' }, children: [] },
          { id: 'web-1-linking', label: 'Web interlinking', summary: 'Hyperlinks connecting documents across servers.', has_children: false, source_reference: { page: 2, section: 'Web 1.0' }, children: [] },
          { id: 'web-1-design', label: 'Fundamental web design', summary: 'Tables, frames, and basic CSS.', has_children: false, source_reference: { page: 2, section: 'Web 1.0' }, children: [] },
        ],
      },
      {
        id: 'web-2',
        label: 'Web 2.0',
        summary: 'The interactive and social web. Platforms, user-generated content, and the rise of big tech.',
        has_children: true,
        source_reference: { page: 3, section: 'Web 2.0', chunk_id: 'chunk-3' },
        children: [
          { id: 'web-2-social', label: 'Social media platforms', summary: 'Facebook, Twitter, YouTube emerged.', has_children: false, source_reference: { page: 3, section: 'Web 2.0' }, children: [] },
          { id: 'web-2-ugc', label: 'User-generated content', summary: 'Anyone could create and publish.', has_children: false, source_reference: { page: 3, section: 'Web 2.0' }, children: [] },
          { id: 'web-2-apps', label: 'Web applications', summary: 'Gmail, Google Maps — full apps in the browser.', has_children: false, source_reference: { page: 4, section: 'Web 2.0' }, children: [] },
          { id: 'web-2-data', label: 'Centralized data silos', summary: 'Platforms collected and owned user data.', has_children: false, source_reference: { page: 4, section: 'Web 2.0' }, children: [] },
        ],
      },
      {
        id: 'web-3-semantic',
        label: 'Web 3.0 (Semantic Web)',
        summary: 'AI-readable, machine-understandable web. Structured data and intelligent agents.',
        has_children: true,
        source_reference: { page: 5, section: 'Web 3.0', chunk_id: 'chunk-5' },
        children: [
          { id: 'web-3-intelligent', label: 'More connected and intelligent', summary: 'AI interprets and links information semantically.', has_children: false, source_reference: { page: 5, section: 'Web 3.0' }, children: [] },
          { id: 'web-3-pods', label: 'Data stored in solid pods', summary: 'Tim Berners-Lee\'s Solid project for personal data.', has_children: false, source_reference: { page: 6, section: 'Web 3.0' }, children: [] },
          { id: 'web-3-http', label: 'Advances HTTP/HTTPS interchange', summary: 'Richer metadata in HTTP headers.', has_children: false, source_reference: { page: 6, section: 'Web 3.0' }, children: [] },
          { id: 'web-3-client', label: 'Client/server distribution model', summary: 'More balanced computing between client and server.', has_children: false, source_reference: { page: 7, section: 'Web 3.0' }, children: [] },
          {
            id: 'web-3-cont',
            label: 'Continuation of web evolution',
            summary: 'Builds on Web 2.0 interactivity with semantic context.',
            has_children: true,
            source_reference: { page: 7, section: 'Web 3.0' },
            children: [
              { id: 'web-3-cont-1', label: 'Ontologies and RDF', summary: 'Machine-readable linked data.', has_children: false, source_reference: null, children: [] },
              { id: 'web-3-cont-2', label: 'SPARQL query language', summary: 'Query structured linked data.', has_children: false, source_reference: null, children: [] },
            ],
          },
          { id: 'web-3-ownership', label: 'User ownership and control of data', summary: 'Users control where and how data is stored.', has_children: false, source_reference: { page: 8, section: 'Web 3.0' }, children: [] },
        ],
      },
      {
        id: 'web3',
        label: 'Web3',
        summary: 'Decentralized blockchain-powered web. Crypto, NFTs, DAOs, and DeFi.',
        has_children: true,
        source_reference: { page: 9, section: 'Web3', chunk_id: 'chunk-9' },
        children: [
          { id: 'web3-blockchain', label: 'Blockchain infrastructure', summary: 'Ethereum, Solana, and others power decentralized apps.', has_children: false, source_reference: { page: 9, section: 'Web3' }, children: [] },
          { id: 'web3-nft', label: 'NFTs and digital ownership', summary: 'Tokens prove ownership of digital assets.', has_children: false, source_reference: { page: 10, section: 'Web3' }, children: [] },
          { id: 'web3-dao', label: 'DAOs and governance', summary: 'Decentralized autonomous organizations.', has_children: false, source_reference: { page: 10, section: 'Web3' }, children: [] },
          { id: 'web3-defi', label: 'DeFi protocols', summary: 'Decentralized finance without banks.', has_children: false, source_reference: { page: 11, section: 'Web3' }, children: [] },
        ],
      },
      {
        id: 'goal',
        label: 'Common Goal',
        summary: 'Despite differing approaches, all phases share a goal of putting more control and benefit in users\' hands.',
        has_children: true,
        source_reference: { page: 12, section: 'Conclusion', chunk_id: 'chunk-12' },
        children: [
          { id: 'goal-ownership', label: 'User takes full ownership of data', summary: 'No platform should own your personal data.', has_children: false, source_reference: { page: 12, section: 'Conclusion' }, children: [] },
          { id: 'goal-beneficiary', label: 'User is the beneficiary', summary: 'Economic value created flows back to users.', has_children: false, source_reference: { page: 12, section: 'Conclusion' }, children: [] },
        ],
      },
    ],
  },
};

export default mockMindMap;
