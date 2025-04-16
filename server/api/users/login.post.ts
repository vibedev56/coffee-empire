import { readFileSync } from 'fs'
import { join } from 'path'
import { defineEventHandler, readBody } from 'h3';

type User = {
  credentials?: {
    username: string;
    passphrase: string;
  };
  _comment?: string;
};

export default defineEventHandler(async (event) => {
  try {
    const body = await readBody(event);
    console.log('Login request body:', body);
    const { login, password } = body;
    let file;
    try {
      file = readFileSync(join(process.cwd(), 'users.json'), 'utf-8');
    } catch (e) {
      console.error('Cannot read users.json:', e);
      return { success: false, error: 'users.json not found or unreadable' };
    }
    let users: User[] = [];
    try {
      users = JSON.parse(file);
    } catch (e) {
      console.error('users.json is not valid JSON:', e);
      return { success: false, error: 'users.json is not valid JSON' };
    }
    const user = users.find(u =>
      u.credentials &&
      u.credentials.username === login &&
      (u.credentials.passphrase === password || u._comment?.includes(`паролем '${password}'`))
    );
    console.log('User found:', user);
    if (user && user.credentials) {
      const { credentials, ...userSafe } = user;
      return { success: true, user: { ...userSafe, username: credentials.username } };
    }
    return { success: false, error: 'Invalid credentials' };
  } catch (err) {
    console.error('Login API error:', err);
    let errorMessage = 'Internal server error';
    if (err instanceof Error) {
      errorMessage = err.message;
    }
    return { success: false, error: errorMessage };
  }
});
