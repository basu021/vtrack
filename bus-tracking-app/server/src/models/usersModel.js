// usersModel.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubustrack',
  host: '10.150.208.251',
  database: 'bustrack1',
  password: 'Basu2001@@',
  port: 5444,
});

// module.exports = {
//   getUserByEmail: async (email) => {
//     const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
//     return result.rows.length > 0 ? result.rows[0] : null;
//   },
// getUserByLoginId: async (loginId) => {
//     const result = await pool.query('SELECT * FROM login WHERE login_id = $1', [loginId]);
//     return result.rows.length > 0 ? result.rows[0] : null;
//   },
//   createUser: async (user) => {
//     const { login_id, password, role_id } = user;
//     const result = await pool.query(
//       'INSERT INTO users (login_id, password, role_id) VALUES ($1, $2, $3) RETURNING *',
//       [login_id, password, role_id]
//     );
//     return result.rows[0];
//   },
// };

module.exports = {
  getUserByEmail: async (email) => {
    try {
      const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error("Error in getUserByEmail:", error.message);
      throw error;
    }
  },
  getUserByLoginId: async (login_id) => {
    try {
      const result = await pool.query('SELECT * FROM login WHERE login_id = $1', [login_id]);
      console.log('Number of rows:', result.rows.length);
      console.log('First row:', result.rows[0]);
      return result.rows.length > 0 ? result.rows[0] : null;
    } catch (error) {
      console.error('Error fetching user by login ID:', error.message);
      throw new Error('Internal server error: ' + error.message);
    }
  },
  createUser: async (user) => {
    try {
      const { login_id, email } = user;
      console.log("The login id and email are ..................... ",login_id,email);
      const result = await pool.query(
        'INSERT INTO users (username, email) VALUES ($1, $2) RETURNING *',
        [login_id, email]
      );
      return result.rows[0];
    } catch (error) {
      // Handle or log the error here
      console.error("Error in createUser:", error.message);
      throw error;
    }
  },
  createLogin: async (login) => {
    try {
      console.log("Yes comming to usermodellogin");
      const { user_id, login_id, password, role_id, verification_token } = login;
      const result = await pool.query(
        'INSERT INTO login (user_id, login_id, password_hash, role_id, verification_token) VALUES ($1, $2, $3, $4, $5) RETURNING *',
        [user_id, login_id, password, role_id, verification_token]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error creating login:', error.message);
      throw error;
    }
  },
  verifyEmail: async (verificationToken) => {
    // Check if a token is valid for email verification. If it is, update the user's status to "active".
    try {
      // Get the user with the given `login_id` from the database. Throw an error if no such user exists.
      const user = await pool.query('SELECT * FROM login WHERE verification_token = $1', [verificationToken]);
      if (user.rows.length === 0) {
        throw new Error('Invalid token');
      }
      // update is_verified column to true
      const result = await pool.query(
        'UPDATE login SET is_verified = true WHERE verification_token = $1 RETURNING *',
        [verificationToken]
      );
      return result.rows[0];
    } catch (error) {
      console.error('Error verifying email:', error.message);
      throw error;
    }
    // The function parameter should be an object containing the properties of the user that you want to add/update.

  },
  
};



