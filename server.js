const mongoose = require('mongoose');

// READING ENVOIRMENT
const dotenv = require('dotenv');
const app = require('./app.js');

dotenv.config({ path: './config.env' });

const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    console.log('Connection to DB');
  });

// RUNNING APP
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App is running');
});
