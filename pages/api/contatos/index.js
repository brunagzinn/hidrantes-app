import authMiddleware from "@/src/authMiddleware";
import { sql } from "@vercel/postgres";
import formidable from "formidable";
import fs from "fs";

export const config = {
  api: {
    bodyParser: false
  }
};

const parseForm = (req) => {
  const form = formidable({ multiples: false });
  return new Promise((resolve, reject) => {
    form.parse(req, (err, fields, files) => {
      if (err) {
        reject(err);
      } else {
        // Convert fields with single values from arrays to strings
        for (const key in fields) {
          if (Array.isArray(fields[key])) {
            fields[key] = fields[key][0];
          }
        }
        resolve({ fields, files });
      }
    });
  });
};

export default async function handler(req, res) {
  return authMiddleware(async (req, res) => {
    if (req.method === 'GET') {
      res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
      res.setHeader('Pragma', 'no-cache');
      res.setHeader('Expires', '0');

      if (req.query.bairro || req.query.logradouro || req.query.nome || req.query.tipo) {
        const bairroLike = req.query.bairro ? `%${req.query.bairro}%` : `%`;
        const logradouroLike = req.query.logradouro ? `%${req.query.logradouro}%` : `%`;
        const nomeLike = req.query.nome ? `%${req.query.nome}%` : `%`;
        const tipoLike = req.query.tipo ? `%${req.query.tipo}%` : `%`;
        const { rows } = await sql`SELECT * 
                                   FROM contatos 
                                   WHERE 1=1
                                   AND upper(bairro) LIKE upper(${bairroLike})
                                   AND upper(logradouro) LIKE upper(${logradouroLike})
                                   AND upper(nome) LIKE upper(${nomeLike}) 
                                   AND upper(tipo) LIKE upper(${tipoLike}) 
                                   ORDER BY nome`;
        res.json(rows);
      } else {
        const { rows } = await sql`SELECT * 
                                   FROM contatos 
                                   ORDER BY nome`;
        res.json(rows);
      }
      return;
    } else if (req.method === 'POST') {
      try {
        const { fields, files } = await parseForm(req);

        const {
          nome,
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
        } = fields;

        let imagemBase64 = null;        
        if (files.image) {
          const imageFile = files.image[0];
          const imageBuffer = fs.readFileSync(imageFile.filepath);          
          imagemBase64 = imageBuffer.toString("base64");
        }        

        await sql`INSERT INTO contatos (nome, logradouro, bairro, cidade, uf, longitude, latitude, tipo, observacao, pressao, vazao, data, imagem) 
                  VALUES (${nome}, ${logradouro}, ${bairro}, ${cidade}, ${uf}, ${longitude}, ${latitude}, ${tipo}, ${observacao}, ${pressao}, ${vazao}, ${data}, ${imagemBase64})`;
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
