/**
 * googleDriveService.js
 * Frontend service to directly interact with Google Drive API.
 */

const EXTENSION_MAP = {
  'application/pdf': 'pdf',
  'application/vnd.openxmlformats-officedocument.wordprocessingml.document': 'docx',
  'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet': 'xlsx',
  'application/vnd.openxmlformats-officedocument.presentationml.presentation': 'pptx',
  'text/plain': 'txt',
  'text/markdown': 'md',
  'text/csv': 'csv'
};

/**
 * Maps Google Drive API mimeType to extension.
 */
export function getExtensionFromMimeType(mimeType, filename = '') {
  if (EXTENSION_MAP[mimeType]) return EXTENSION_MAP[mimeType];
  const dotIndex = filename.lastIndexOf('.');
  if (dotIndex !== -1) return filename.slice(dotIndex + 1).toLowerCase();
  return 'bin';
}

/**
 * Uploads a file directly to Google Drive via multipart upload.
 */
export async function uploadFileToGoogleDrive(file, accessToken) {
  const metadata = {
    name: file.name,
    mimeType: file.type || 'application/octet-stream'
  };

  const boundary = 'foo_bar_boundary';
  const delimiter = `\r\n--${boundary}\r\n`;
  const closeDelim = `\r\n--${boundary}--`;

  const fileData = await new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(new Uint8Array(reader.result));
    reader.onerror = () => reject(new Error('Failed to read file contents.'));
    reader.readAsArrayBuffer(file);
  });

  const metadataPart = `Content-Type: application/json; charset=UTF-8\r\n\r\n${JSON.stringify(metadata)}\r\n`;
  const mediaPartHeaders = `Content-Type: ${file.type || 'application/octet-stream'}\r\n\r\n`;

  const body = new Blob([
    delimiter,
    metadataPart,
    delimiter,
    mediaPartHeaders,
    fileData,
    closeDelim
  ], { type: `multipart/related; boundary=${boundary}` });

  const response = await fetch('https://www.googleapis.com/upload/drive/v3/files?uploadType=multipart', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': `multipart/related; boundary=${boundary}`
    },
    body
  });

  if (!response.ok) {
    const errText = await response.text();
    let errObj;
    try {
      errObj = JSON.parse(errText);
    } catch {
      // Ignored
    }
    throw new Error(errObj?.error?.message || `Google Drive Upload failed: ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Retrieves the list of files from Google Drive.
 * @param {string} accessToken - Google OAuth 2.0 access token.
 * @returns {Promise<object[]>} List of file objects.
 */
export async function listGoogleDriveFiles(accessToken) {
  const response = await fetch('https://www.googleapis.com/drive/v3/files?pageSize=40&fields=files(id,name,size,mimeType)', {
    headers: {
      'Authorization': `Bearer ${accessToken}`
    }
  });

  if (!response.ok) {
    const errText = await response.text();
    let errObj;
    try {
      errObj = JSON.parse(errText);
    } catch {
      // Ignored
    }
    throw new Error(errObj?.error?.message || `Google Drive fetch failed: ${response.statusText}`);
  }

  const data = await response.json();
  return data.files || [];
}
