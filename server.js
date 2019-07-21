const app = require('express')();
const http = require('http').Server(app);
const dotenv = require('dotenv');
dotenv.config();

const telegram = require('./compute/telegram');

const port = process.env.PORT || 3001;

http.listen(port, () => console.log(`Server start on porn ${port}`));
