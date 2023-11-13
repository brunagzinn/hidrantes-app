import jwt from 'jsonwebtoken'

const chaveSecreta = process.env.JWT_SECRET ?? '123123'
export default function authMiddleware(handler) {
    return (req, res) => {
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