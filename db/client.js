const {Client} = require('pg');
const client = new Client ('postgres://kayhsu@localhost:5432/block33'); 

module.exports = client;