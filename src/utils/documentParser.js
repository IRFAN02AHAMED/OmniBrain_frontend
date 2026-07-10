/**
 * documentParser.js
 * Client-side document text extraction stubs.
 * For real extraction, delegate to backend /api/v1/documents/{id}/extract
 *
 * When backend is ready, these functions just call the service layer.
 * When backend is unavailable, they return empty strings so the app falls
 * back to mock mind map data.
 */

/**
 * Supported file types for mind map generation.
 */
export const SUPPORTED_TYPES = ['.pdf', '.docx', '.txt', '.md', '.pptx', '.csv', '.xlsx'];

/**
 * Returns true if the file extension is supported.
 */
export function isSupportedDocumentType(filename = '') {
  const ext = filename.toLowerCase().slice(filename.lastIndexOf('.'));
  return SUPPORTED_TYPES.includes(ext);
}

/**
 * Attempt to extract plain text from a File object.
 * Currently only handles .txt and .md — all others return '' and rely on backend.
 *
 * @param {File} file
 * @returns {Promise<string>}
 */
export async function extractClientSideText(file) {
  const name = file.name.toLowerCase();

  if (name.endsWith('.txt') || name.endsWith('.md')) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => resolve(e.target.result || '');
      reader.onerror = () => reject(new Error('File read failed'));
      reader.readAsText(file);
    });
  }

  // PDF, DOCX, PPTX, XLSX → backend-only
  return '';
}

/**
 * Derive a human-readable document title from the file name.
 * Strips extension and replaces hyphens/underscores with spaces.
 */
export function guessDocumentTitle(filename = '') {
  const base = filename.slice(0, filename.lastIndexOf('.')) || filename;
  return base.replace(/[-_]/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
}
