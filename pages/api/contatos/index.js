const sqlite3 = require("sqlite3").verbose()
let db = new sqlite3.Database("./data/database.db")

export default function handler(req, res) {

  if (req.method === 'GET') {
    db.all(`select * from contatos`, (err, rows) => {
      if (err) {
        console.error(err.message);
        res.status(500).send(err.message);
        return;
      }

      res.json(rows);
    })
    return;
  } else if (req.method === 'POST') {
    // insert into contatos (id, nome, endereco, telefone) values (4, 'Contato 4', 'Rua 4', '+1 55 98765-98765');
    const { nome, endereco, telefone } = req.body;
    db.run('insert into contatos (nome, endereco, telefone) values (?,?,?)', [nome, endereco, telefone],
      (err) => {
        //callback
        if (err) {
          res.status(500).json({ error: err.message });
          return;
        }
        res.status(201).end();
      })
    return;
  }

  res.status(405).end();
  return;
}