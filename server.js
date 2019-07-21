const app = require('express')();
const http = require('http').Server(app);
const dotenv = require('dotenv');
dotenv.config();
require('./compute/telegram');

const port = process.env.PORT || 3020;

http.listen(port, () => console.log(`Server start on porn ${port}`));
