const express = require('express');
const router = express.Router();
const methodOverride = require('method-override');
const pool = require('../../server/helpers/database');
const table = process.env.DB_TABLE;
const app = express();

app.use(methodOverride('X-HTTP-Method-Override'));

/** get request */

router.get('/get', async function (req, res) {
  try {
    const { id } = req.body;
    const sqlQuery = `SELECT * FROM ${table} WHERE id=?`;
    const rows = await pool.query(sqlQuery, [id]);
    res.status(200).json(rows);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/** post request */

router.post('/add', async function (req, res) {
  try {
    const { release_year, album, artist, genre, subgenre } = req.body;

    const sqlQuery = `INSERT INTO ${table} (release_year, album, artist, genre, subgenre) VALUES (?,?,?,?,?)`;
    const result = await pool.query(sqlQuery, [
      release_year,
      album,
      artist,
      genre,
      subgenre,
    ]);

    res
      .status(200)
      .send(alert(`Entry has been succesfully added to the database`));
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/** put request */

router.put('/amend', async function (req, res) {
  try {
    const { release_year, album, artist, genre, subgenre, id } = req.body;

    const updateQuery = `UPDATE ${table} SET release_year = ?, album = ?, artist = ?, genre = ?, subgenre = ? WHERE id=?`;
    const result = await pool.query(updateQuery, [
      release_year,
      album,
      artist,
      genre,
      subgenre,
      id,
    ]);

    res.status(200).send(`DB entry has been updated succesfully`);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

/** delete request */

router.delete('/del', async function (req, res) {
  try {
    const delQuery = `DELETE FROM ${table} WHERE id = ?`;
    const rows = await pool.query(delQuery, req.body.id);
    res.status(200).send('Entry deleted from DB');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
