import sqlite3 from "sqlite3";
import { open, Database} from "sqlite";
import path from "path";

let db = null;

const dbPath = path.resolve(__dirname, './../../../../../database_files/test.db')

export async function GET(req, res) {
    // Check if database exists
    if (!db) {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
    }

    const items = await db.all("SELECT * FROM Teams");

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json"},
        status: 200,
    });
}