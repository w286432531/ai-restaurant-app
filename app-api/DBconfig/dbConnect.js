import {Pool, Client} from "pg";

const local = process.env.NODE_ENV === "development";
const connectionString = local
  ? process.env.LOCAL_DATABASE
  : process.env.DATABASE_URI;
console.log(connectionString);
const pool = local
  ? new Pool({
      connectionString,
    })
  : new Pool({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });

pool.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  pool.end();
});
const client = local
  ? new Client({
      connectionString,
    })
  : new Client({
      connectionString,
      ssl: {
        rejectUnauthorized: false,
      },
    });

client.connect();
client.query("SELECT NOW()", (err, res) => {
  console.log(err, res);
  client.end();
});