// usersModel.js
const { Pool } = require('pg');

const pool = new Pool({
  user: 'ubustrack',
  host: '10.150.208.251',
  database: 'bustrack1',
  password: 'Basu2001@@',
  port: 5444,
});


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
  getUserByUserId: async (user_id) => {
    try {
      const result = await pool.query('SELECT * FROM login WHERE user_id = $1', [user_id]);
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
  forgotPassword: async (userId, updateData) => {
    try {
      // const { reset_token, reset_token_expiry } = updateData;
      const reset_token = updateData.reset_password_token;
      const reset_token_expiry = updateData.reset_password_token_expiry;
      console.log(updateData);
      console.log(reset_token);
      console.log(reset_token_expiry);
  
      const query = `
        INSERT INTO password_reset (user_id, reset_token, reset_token_expiry)
        VALUES ($1, $2, $3)
        ON CONFLICT (user_id)
        DO UPDATE SET reset_token = $2, reset_token_expiry = $3
        RETURNING *;
      `;
  
      const values = [userId, reset_token, reset_token_expiry];
  
      const result = await pool.query(query, values);
  
      if (result.rows.length === 0) {
        throw new Error('User not found');
      }
  
      return result.rows[0];
    } catch (error) {
      console.error('Error updating user:', error.message);
      throw error;
    }
  },
  getUserByResetToken: async (resetToken) => {
    console.log("Reset token um: " + resetToken);
  
    const values = [resetToken];
    console.log("Values "+values);
  
    const result = await pool.query('SELECT * FROM password_reset;');

    console.log("Result from database:", result);
  
    if (result.rows.length === 0) {
      return null;
    }
  
    const userId = result.rows[0].user_id;
    console.log("User id is " + userId);
  
    // Replace the following line with the appropriate function to get a user by ID
    const user = await module.exports.getUserByUserId(userId);
  
    console.log("User retrieved:", user);
  
    if (!user) {
      throw new Error('User not found');
      // console.log("User Not found");
    }
  
    return user;
  },
  

  updatePassword: async (userId, newPassword) => {
    const query = 'UPDATE login SET password_hash = $1 WHERE user_id = $2;';
    const values = [newPassword, userId];

    await pool.query(query, values);
  },

  deleteResetToken: async (userId) => {
    const query = 'DELETE FROM password_reset WHERE user_id = $1;';
    const values = [userId];

    await pool.query(query, values);
  },
  
};



