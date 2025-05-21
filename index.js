import express from "express";
import bodyParser from "body-parser";
import pg from "pg";

const app = express();
const port = 3000;

const db = new pg.Client({
  user: "postgres",
  host: "localhost",
  database: "Book",
  password: "369",
  port: 5432,
});
db.connect();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));
app.set("view engine", "ejs");

let currentUserid = 1;

app.get("/", async (req, res) => {
  try {
    const result = await db.query(`
      SELECT bookdetails.*, userdetails.name
      FROM bookdetails
      JOIN userdetails ON bookdetails.userid = userdetails.id
      ORDER BY recency DESC;
    `);

    res.render("index.ejs", {
      books: result.rows,
    });
  } catch (err) {
    console.error(err);
    res.send("Error loading books.");
  }
});

app.post("/add", async (req, res) => {
  const { bname, rating, recency, notes } = req.body;
  try {
    await db.query(
      `INSERT INTO bookdetails (bname, rating, recency, notes, userid)
       VALUES ($1, $2, $3, $4, $5)`,
      [bname, rating, recency, notes, currentUserid]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error adding book.");
  }
});

app.post("/edit", async (req, res) => {
  const { id, bname, rating, recency, notes } = req.body;
  try {
    await db.query(
      `UPDATE bookdetails SET bname = $1, rating = $2, recency = $3, notes = $4
       WHERE id = $5`,
      [bname, rating, recency, notes, id]
    );
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error editing book.");
  }
});

app.post("/delete", async (req, res) => {
  const id = req.body.id;
  try {
    await db.query(`DELETE FROM bookdetails WHERE id = $1`, [id]);
    res.redirect("/");
  } catch (err) {
    console.error(err);
    res.send("Error deleting book.");
  }
});

app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});
