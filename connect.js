const sqlite3 = require("sqlite3").verbose();

const db = new sqlite3.Database(
    "./database_files/test.db",
    sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE,
    (err) => {
        if (err) {
            return console.error(err.message);
        }
        console.log("Connected to the SQlite database")
    }
);

db.serialize(() => {
    const insertSql = `INSERT INTO Players (FirstName, LastName, Hometown) VALUES (?, ?, ?)`;

    const playerOne = [
        "Daniel",
        "Sorrentino",
        "Mount Pocono"
    ];

    const playerTwo = [
        "Roshan",
        "Forde",
        "Pocono Summit"
    ];

    db.run(insertSql, playerOne, function (err) {
        if (err) {
            return console.error(err.message);
        }
        const id = this.lastID; // get the id of last inserted row
        console.log(`Rows inserted, ID ${id}`);
    });

    db.run(insertSql, playerTwo, function (err) {
        if (err) {
            return console.error(err.message);
        }
        const id = this.lastID
        console.log(`Row inserted, ID ${id}`)
    })
})