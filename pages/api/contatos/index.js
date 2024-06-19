import authMiddleware from "@/src/authMiddleware";
import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  return authMiddleware(async (req, res) => {

    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      if (req.query.bairro || req.query.logradouro || req.query.nome || req.query.tipo) {
        const bairroLike = req.query.bairro? `%${req.query.bairro}%` : `%`
        const logradouroLike = req.query.logradouro? `%${req.query.logradouro}%` : `%`
        const nomeLike = req.query.nome? `%${req.query.nome}%` : `%`
        const tipoLike = req.query.tipo? `%${req.query.tipo}%` : `%`
        const { rows } = await sql` select * 
                                  from contatos 
                                  where 1=1
                                  and upper(bairro) like upper(${bairroLike})
                                  and upper(logradouro) like upper(${logradouroLike})
                                  and upper(nome) like upper(${nomeLike}) 
                                  and upper(tipo) like upper(${tipoLike}) 
                                  order by nome`;
        res.json(rows);
      } else {
        const { rows } = await sql` select * 
                                  from contatos 
                                  order by nome`;
        res.json(rows);
      }
      return;
    } else if (req.method === 'POST') {
      const { nome, 
        logradouro, 
        bairro, 
        cidade, 
        uf, 
        longitude, 
        latitude, 
        tipo,
        observacao,
        pressao,
        vazao,
        data 
       } = req.body;

      try {
        await sql`insert into contatos (nome, logradouro, bairro, cidade, uf, longitude, latitude, tipo, observacao, pressao, vazao, data) 
                values (${nome}, ${logradouro}, ${bairro}, ${cidade}, ${uf}, ${latitude}, ${longitude}, ${tipo}, ${observacao}, ${pressao}, ${vazao}, ${data})`;
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
