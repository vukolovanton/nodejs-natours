const mongoose = require('mongoose');
const fs = require('fs');
const Tour = require('../../model/tourModel');
// READING ENVOIRMENT
const dotenv = require('dotenv');

dotenv.config({ path: './config.env' });

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

const tour = JSON.parse(fs.readFileSync(`${__dirname}/tours.json`, 'utf-8'));

const importData = async () => {
  try {
    console.log('Start import');
    await Tour.create(tour);
    process.exit();
    console.log('DATA LOADED');
  } catch (e) {
    console.log(e);
  }
};

const deleteData = async () => {
  try {
    await Tour.deleteMany();
    process.exit();
    console.log('DATA DELETED');
  } catch (e) {
    console.log(e);
  }
};

if (process.argv[2] === '--import') {
  importData();
} else if (process.argv[2] === '--delete') {
  deleteData();
}
