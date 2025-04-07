const { pool } = require('../config/db');

exports.findUserByContact = async (contact) => {
  const res = await pool.query('SELECT * FROM "USER" WHERE contact = $1', [contact]);
  return res.rows[0];
};

exports.createUser = async (contact, hashedPassword) => {
  const res = await pool.query(
    'INSERT INTO "USER" (contact, password, create_at) VALUES ($1, $2, NOW()) RETURNING *',
    [contact, hashedPassword]
  );
  return res.rows[0];
};
