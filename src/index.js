const express = require('express');
const mysql = require("mysql");

const db_config = {
    host: process.env.DB_HOST || '127.0.0.1',
    user: process.env.DB_USER || 'root',
    password: process.env.DB_PASS || '',
    database: process.env.DB_NAME || 'test_docker',
};

const app = express();
const con = mysql.createConnection(db_config);



app.get('/', (_, res) => {
    res.send("if you see this nodejs is working with nginx just fine !");
});

app.get("/test", (_, res) => {

    res.send("Test new routes works !")
});

app.get('/fetch', (_, res) => {
    const q = `SELECT * from names`;
    con.query(q, (err, results) => {
        if (err) throw err;
        console.log("res => ", results);
        res.json(results);
    });

});

app.get("/add/:name", (req, res) => {
    console.log("prams => ", req.params);
    if (!req.params.name) {
        res.send("invalid name !");
        return;
    }
    const q = `INSERT INTO names(named) VALUES ('${req.params.name}')`;
    con.query(q, (err, results) => {
        if (err) throw err;
        res.send("1 Row Created Successfuly !");
    });
});

app.listen(4000, () => {
    console.log("Server running on http://localhost:4000");
})