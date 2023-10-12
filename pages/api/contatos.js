const sqlite3 = require ("sqlite3").verbose()
let db = new sqlite3.Database("./data/database/db")

export default function handler (req, res){

    db.all('select * from contatos' , (err, rows) => {
iff (err) {
    console.error(err.message)
    res.status(500).send(err.menssage);
return;
}
        res.json(rows)
    })

}