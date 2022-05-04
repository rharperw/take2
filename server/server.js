'use strict';

/** dependencies */
const express = require('express');
const mariadb = require('mariadb');
const dotenv = require('dotenv');
const morgan = require('morgan');

/** server config */
dotenv.config({ path: '.env-local' });

const app = express();
const PORT = process.env.PORT || '3050';

/** middleware */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));

/** listener */

app.listen(PORT, () => {
  console.log(`Listening for requests on ${PORT}`);
});

/** routes */

app.get('/', (req, res) => {
  res.status(200).send('Hello world');
});

const userRouter = require('../server/routes/table');
app.use('/table', userRouter);
