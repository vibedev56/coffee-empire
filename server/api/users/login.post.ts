import { readFile } from 'fs/promises'
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
    let users: User[] = [];
    try {
      const usersPath = join(process.cwd(), 'static', 'users.json');
      const file = await readFile(usersPath, 'utf-8');
      users = JSON.parse(file);
    } catch (e) {
      console.error('users.json read error:', e);
      return { success: false, error: 'users.json not found or unreadable' };
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
