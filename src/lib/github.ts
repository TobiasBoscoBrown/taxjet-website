// Server-only GitHub Contents API helper. The repo IS the CMS datastore:
// commits trigger a Vercel redeploy, so saved posts go live automatically.
const OWNER = 'TobiasBoscoBrown';
const REPO = 'taxjet-website';
const BRANCH = 'main';
const BASE = `https://api.github.com/repos/${OWNER}/${REPO}/contents`;

function headers() {
  const token = process.env.GITHUB_TOKEN;
  if (!token) throw new Error('Server is missing GITHUB_TOKEN.');
  return {
    Authorization: `Bearer ${token}`,
    Accept: 'application/vnd.github+json',
    'User-Agent': 'taxjet-cms',
    'X-GitHub-Api-Version': '2022-11-28',
  } as Record<string, string>;
}

export function checkPassword(provided?: string): boolean {
  const expected = process.env.CMS_PASSWORD;
  return !!expected && typeof provided === 'string' && provided === expected;
}

export interface GhFile {
  sha: string;
  content?: string;
  download_url?: string;
  name: string;
  path: string;
}

export async function getFile(path: string): Promise<GhFile | null> {
  const res = await fetch(`${BASE}/${path}?ref=${BRANCH}`, { headers: headers(), cache: 'no-store' });
  if (res.status === 404) return null;
  if (!res.ok) throw new Error(`GitHub getFile failed (${res.status})`);
  return res.json();
}

export async function listDir(path: string): Promise<GhFile[]> {
  const res = await fetch(`${BASE}/${path}?ref=${BRANCH}`, { headers: headers(), cache: 'no-store' });
  if (res.status === 404) return [];
  if (!res.ok) throw new Error(`GitHub listDir failed (${res.status})`);
  return res.json();
}

export async function putFile(path: string, contentBase64: string, message: string, sha?: string) {
  const res = await fetch(`${BASE}/${path}`, {
    method: 'PUT',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, content: contentBase64, branch: BRANCH, sha }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub putFile failed (${res.status}): ${txt}`);
  }
  return res.json();
}

export async function deleteFile(path: string, message: string, sha: string) {
  const res = await fetch(`${BASE}/${path}`, {
    method: 'DELETE',
    headers: { ...headers(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, branch: BRANCH, sha }),
  });
  if (!res.ok) {
    const txt = await res.text();
    throw new Error(`GitHub deleteFile failed (${res.status}): ${txt}`);
  }
  return res.json();
}

export function parseFrontmatter(raw: string) {
  const match = raw.match(/---\n([\s\S]*?)\n---/);
  const data: Record<string, string> = {};
  if (match) {
    match[1].split('\n').forEach((line) => {
      const idx = line.indexOf(':');
      if (idx > 0) {
        const key = line.slice(0, idx).trim();
        const val = line.slice(idx + 1).trim().replace(/^"|"$/g, '');
        data[key] = val;
      }
    });
  }
  const body = raw.replace(/---\n[\s\S]*?\n---/, '').trim();
  return { data, body };
}
