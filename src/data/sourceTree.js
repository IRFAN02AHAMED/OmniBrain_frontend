export const INITIAL_SOURCE_TREE = {
  id: 'root-drive',
  name: 'Drive',
  type: 'drive',
  toggled: true,
  expanded: true,
  children: [
    { id: 'gdocs', name: 'Google Docs', type: 'gdocs', toggled: true },
    { id: 'gsheets', name: 'Google Sheets', type: 'gsheets', toggled: true },
    { id: 'gmail', name: 'Gmail', type: 'gmail', toggled: false },
    {
      id: 'folder-omnibrain',
      name: 'OmniBrain AI',
      type: 'folder',
      toggled: true,
      expanded: true,
      children: [
        {
          id: 'folder-global-docs',
          name: 'Global Documents',
          type: 'folder',
          toggled: true,
          expanded: true,
          children: [
            { id: 'file-arch', name: 'Project_Architecture.pdf', type: 'pdf', toggled: true },
            { id: 'file-design', name: 'System_Design.docx', type: 'word', toggled: false },
            { id: 'file-req', name: 'Product_Requirements.pdf', type: 'pdf', toggled: true }
          ]
        },
        {
          id: 'folder-research',
          name: 'Research Papers',
          type: 'folder',
          toggled: false,
          expanded: false,
          children: []
        },
        {
          id: 'folder-reports',
          name: 'Reports',
          type: 'folder',
          toggled: true,
          expanded: true,
          children: [
            { id: 'file-q4-rep', name: 'Q4_Report.pdf', type: 'pdf', toggled: true },
            { id: 'file-market-an', name: 'Market_Analysis.xlsx', type: 'excel', toggled: false }
          ]
        }
      ]
    },
    {
      id: 'folder-chat-docs',
      name: 'Chat Documents',
      type: 'folder',
      toggled: true,
      expanded: true,
      children: [
        {
          id: 'folder-current-chat-files',
          name: 'Current Chat Files',
          type: 'folder',
          toggled: true,
          expanded: true,
          children: [
            { id: 'file-meeting-notes', name: 'meeting_notes.txt', type: 'txt', toggled: true }
          ]
        }
      ]
    }
  ]
};
export default INITIAL_SOURCE_TREE;
