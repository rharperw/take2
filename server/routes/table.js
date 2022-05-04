const express = require('express');
const router = express.Router();
const pool = require('../../server/helpers/database');
const table = process.env.DB_TABLE;

/** get request */

router.get('/:id', async function (req, res) {
  try {
    const sqlQuery = `SELECT * FROM ${table} where id=?`;
    const rows = await pool.query(sqlQuery, req.params.id);
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

    res.status(200).send(`Entry has been succesfully added to the database`);
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

router.delete('/:id', async function (req, res) {
  try {
    const delQuery = `DELETE FROM ${table} WHERE id = ?`;
    const rows = await pool.query(delQuery, req.params.id);
    res.status(200).send('Entry deleted from DB');
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
