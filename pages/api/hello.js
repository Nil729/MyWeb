// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

import  excuteQuery  from './db/db.config.js'

export default async function handler(req, res) {
  try {
    const results = await excuteQuery({
      query: 'SELECT * FROM users'
    });
    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

