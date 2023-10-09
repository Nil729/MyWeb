import { signOut } from 'next-auth/react';

export default async function handlerLogout(req, res) {
  await signOut({ callbackUrl: '/' });
  res.end();
}