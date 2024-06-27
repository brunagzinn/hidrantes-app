import authMiddleware from "@/src/authMiddleware";
import { sql } from "@vercel/postgres";


export default async function handler(req, res) {
    return authMiddleware(async (req, res) => {

        if (req.method === 'GET') {
            const { rows } = await sql`select imagem from contatos where id = ${req.query.id}`;

            res.setHeader('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
            res.setHeader('Pragma', 'no-cache');
            res.setHeader('Expires', '0');

            res.json(rows[0] || null);
            return;
        } 

        res.status(405).end();
        return;
    })(req, res);
}