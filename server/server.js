'use strict';

/** dependencies */
const express = require('express');
const dotenv = require('dotenv');
const morgan = require('morgan');
const path = require('path');
const methodOverride = require('method-override');

/** server config */
dotenv.config({ path: '.env-local' });

const app = express();
const PORT = process.env.PORT || '3050';

/** middleware */

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static('views'));
app.use(methodOverride('_method'));
app.use(morgan('dev'));
app.set('view engine', 'pug');
app.set('views', path.join(__dirname, 'views'));

/** listener */

app.listen(PORT, () => {
  console.log(`Listening for requests on ${PORT}`);
});

/** routes */

app.get('/', (req, res) => {
  res.render('test', { root: 'views' });
});

const userRouter = require('../server/routes/table');
app.use('/table', userRouter);
