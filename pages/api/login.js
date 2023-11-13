import jwt from 'jsonwebtoken'

const chaveSecreta = process.env.JWT_SECRET ?? '123123'
export default function handler(req, res) {
    if (req.method === 'POST') {
        const { username, password } = req.body
        if (username === 'admin' && password === 'admin') {
            const token = jwt.sign({ username }, chaveSecreta, { expiresIn: '24h' })
            res.status(200).json({ token })
        } else {
            res.status(401).end();
        }
    } else {
        res.status(405).end();
    }
}