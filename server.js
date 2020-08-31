// READING ENVOIRMENT
const dotenv = require('dotenv');
dotenv.config({ path: './config.env' });

// RUNNING APP
const app = require('./app.js');

const port = process.env.PORT || 3000;
app.listen(port, () => {
    console.log('App is running');
});
