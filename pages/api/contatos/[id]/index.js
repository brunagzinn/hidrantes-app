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
            const { rows } = await sql`select * from contatos where id = ${req.query.id}`;

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            res.json(rows[0] || null);
            return;
        } else if (req.method === 'PUT') {

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

            try {
                if (!imagemBase64) {
                    await sql`
                        update contatos
                        set nome = ${nome},
                        logradouro = ${logradouro}, 
                        bairro = ${bairro}, 
                        cidade = ${cidade}, 
                        uf = ${uf}, 
                        latitude = ${latitude}, 
                        longitude = ${longitude}, 
                        tipo = ${tipo},
                        observacao = ${observacao},
                        pressao = ${pressao},
                        vazao = ${vazao},
                        data = ${data}
                        where id = ${req.query.id}
                    `
                } else {
                    await sql`
                        update contatos
                        set nome = ${nome},
                        logradouro = ${logradouro}, 
                        bairro = ${bairro}, 
                        cidade = ${cidade}, 
                        uf = ${uf}, 
                        latitude = ${latitude}, 
                        longitude = ${longitude}, 
                        tipo = ${tipo},
                        observacao = ${observacao},
                        pressao = ${pressao},
                        vazao = ${vazao},
                        data = ${data},
                        imagem = ${imagemBase64}
                        where id = ${req.query.id}
                    `
                }
                res.status(201).end();
            }
            catch (error) {
                res.status(500).json({ error: error.message })
            }
            return;
        } else if (req.method === 'DELETE') {
            try {
                await sql`delete from contatos where id = ${req.query.id}`;
                res.status(201).end();
            }
            catch (error) {
                res.status(500).json({ error: error.message })
            }
            return;
        }

        res.status(405).end();
        return;
    })(req, res);
}