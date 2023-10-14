import { sql } from "@vercel/postgres"

export default async function handler(req, res) {

  if (req.method === 'GET') {
    const { rows } = await sql`select * from contatos`;

    res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.setHeader('Pragma', 'no-cache');
    res.setHeader('Expires', '0');

    res.json(rows);
    return;
  } else if (req.method === 'POST') {
    const { nome, logradouro, bairro, cidade, uf, longitude, latitude, tipo } = req.body;

    try {
      await sql`insert into contatos (nome, logradouro, bairro, cidade, uf, longitude, latitude, tipo) 
                values (${nome}, ${logradouro}, ${bairro}, ${cidade}, ${uf}, ${latitude}, ${longitude}, ${tipo})`;
      res.status(201).end();
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
    return;
  }

  res.status(405).end();
}
