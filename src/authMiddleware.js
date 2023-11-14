import { headers } from '@/next.config';
import jwt from 'jsonwebtoken'

const chaveSecreta = process.env.JWT_SECRET ?? '123123'

const rotasPublicas = [
    { path: '/api/contatos', method: 'GET' }
]

export default function authMiddleware(handler) {
    return (req, res) => {

        const rotaPublica = rotasPublicas.some(
            (rota) => req.url.startsWith(rota.path) && req.method === rota.method
        );

        if (rotaPublica) {
            return handler(req, res);
        }

        const token = req.headers.authorization?.replace('Bearer ', '');

        if (!token) {
            res.status(401).end();
            return;
        }

        try {
            const { username } = jwt.verify(token, chaveSecreta)
            req.username = username;
        } catch {
            res.status(401).end()
            return;
        }

        return handler(req, res);
    }
}