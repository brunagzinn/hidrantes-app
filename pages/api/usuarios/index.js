import authMiddleware from "@/src/authMiddleware";
import { sql } from "@vercel/postgres"

export default async function handler(req, res) {
  return authMiddleware(async (req, res) => {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      const { rows } = await sql`SELECT * 
                                  FROM usuarios
                                  ORDER BY username`;
      res.json(rows);
      return;
    } else if (req.method === 'POST') {
      const { username, password, perfil } = req.body;

      try {
        await sql`INSERT INTO usuarios (username, password, perfil) 
                VALUES (${username}, ${password}, ${perfil})`;
        res.status(201).end();
      } catch (error) {
        res.status(500).json({ error: error.message });
      }
      return;
    }

    res.status(405).end();
    return;
  })(req, res);
}
