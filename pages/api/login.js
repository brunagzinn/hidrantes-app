import jwt from 'jsonwebtoken'
import { sql } from "@vercel/postgres"

const chaveSecreta = process.env.JWT_SECRET ?? '123123'

export default async function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body

        if (!username || !password) {
            return res.status(400).json({ error: "Preencha todos os campos no body da requisição" })
        }

        const { rows } = await sql`SELECT * FROM usuarios WHERE username = ${username} AND password = ${password}`;

        if (rows.length > 0) {
            const { username, perfil } = rows[0];
            const token = jwt.sign({ username, perfil }, chaveSecreta, { expiresIn: '24h' })
            res.status(200).json({ token })
        } else {
            res.status(401).end();
        }
    } else {
        res.status(405).end();
    }
}
