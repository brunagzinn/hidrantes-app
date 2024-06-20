import jwt from 'jsonwebtoken';

const chaveSecreta = process.env.JWT_SECRET ?? '123123';

const rotasPublicas = [
    { path: '/api/contatos', method: 'GET' }
];

const rotasPrivadas = [
    { path: '/api/usuarios', method: 'GET', allowedProfiles: ['Administrador'] },
    { path: '/api/usuarios', method: 'POST', allowedProfiles: ['Administrador'] },
    { path: '/api/usuarios', method: 'PUT', allowedProfiles: ['Administrador'] },
    { path: '/api/usuarios', method: 'DELETE', allowedProfiles: ['Administrador'] },

    { path: '/api/contatos', method: 'GET', allowedProfiles: ['Administrador', 'Padrão'] },
    { path: '/api/contatos', method: 'POST', allowedProfiles: ['Administrador', 'Padrão'] },
    { path: '/api/contatos', method: 'PUT', allowedProfiles: ['Administrador', 'Padrão'] },
    { path: '/api/contatos', method: 'DELETE', allowedProfiles: ['Administrador'] }
];

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
            const { username, perfil } = jwt.verify(token, chaveSecreta);
            req.username = username;
            req.perfil = perfil;

            const rotaPrivada = rotasPrivadas.find(
                (rota) => req.url.startsWith(rota.path) && req.method === rota.method
            );

            if (rotaPrivada && !rotaPrivada.allowedProfiles.includes(perfil)) {
                res.status(403).end();
                return;
            }

        } catch {
            res.status(401).end();
            return;
        }

        return handler(req, res);
    };
}
