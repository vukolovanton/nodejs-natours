const mongoose = require('mongoose');
// READING ENVOIRMENT
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

const app = require('./app.js');

// MAKING DB CONNECTION
const DB = process.env.DATABASE.replace('<PASSWORD>', process.env.PASSWORD);
mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log('Connection to DB');
  });

// RUNNING APP
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log('App is running');
});
