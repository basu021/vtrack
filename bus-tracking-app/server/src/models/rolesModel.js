// rolesModel.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubustrack',
  host: '10.150.208.251',
  database: 'bustrack1',
  password: 'Basu2001@@',
  port: 5444,
});


module.exports = {
  getRoleIdByName: async (roleName) => {
    try {
      const result = await pool.query('SELECT role_id FROM roles WHERE role_name = $1', [roleName]);
      return result.rows[0]?.role_id;
    } catch (error) {
      // Handle or log the error here
      console.error("Error in getRoleIdByName:", error.message);
      throw error;
    }
  },
  getRoles: async () => {
    try {
      const result = await pool.query('SELECT * FROM roles WHERE role_name IN ($1, $2)', ['user', 'driver']);
      return result.rows;
    } catch (error) {
      // Handle or log the error here
      console.error("Error in getRoles:", error.message);
      throw error;
    }
  },
};