const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubustrack',
  host: '10.150.208.253',
  database: 'bustrack1',
  password: 'Basu2001@@',
  port: 5444,

  });

module.exports = pool;
