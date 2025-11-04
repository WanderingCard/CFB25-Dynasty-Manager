import sqlite3 from "sqlite3";
import { open, Database} from "sqlite";
import path from "path";

let db = null;

const dbPath = path.resolve(__dirname, './../../../../../../database_files/test.db');

export async function GET(req, res) {
    // console.log(dbPath);
    console.log("URL Path: ", req.url);
    const id = req.url.split("/")[5];
    console.log("Player ID: ", id);

    // Check if database exists
    if (!db) {
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        });
    }

    const items = await db.all(`SELECT PlayersRosters.PlayerRosterId, PlayersRosters.Year, Players.FirstName, Players.LastName, Players.Suffix, 
        Teams.name AS "TeamName", PlayersRosters.Overall, PlayerClass.Class, 
        PlayersRosters.JerseyNumber, DevTraits.Trait, PlayersRosters.Redshirted, PlayersRosters.PlayerId
        FROM PlayersRosters
        LEFT JOIN Players ON PlayersRosters.PlayerId = Players.PlayerId
        LEFT JOIN Teams ON PlayersRosters.TeamId = Teams.TeamId
        LEFT JOIN PlayerClass ON PlayersRosters.PlayerClassId = PlayerClass.ClassId
        LEFT JOIN DevTraits ON Players.DevTraitId = DevTraits.TraitId
        WHERE PlayersRosters.Year = ?;`, id);

    console.log(id);
    console.log(dbPath);

    return new Response(JSON.stringify(items), {
        headers: { "Content-Type": "application/json"},
        status: 200,
    });
}