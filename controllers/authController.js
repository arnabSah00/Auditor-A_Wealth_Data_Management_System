const bcrypt = require('bcrypt');
const { findUserByContact, createUser } = require('../models/authModel');
const { generateToken } = require('../utils/token');

exports.register = async (req, res) => {
  const { contact, password } = req.body;

  try {
    const existingUser = await findUserByContact(contact);
    if (existingUser) return res.status(400).json({ error: 'User already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = await createUser(contact, hashedPassword);

    res.status(201).json({ message: 'User registered', userId: newUser.id });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { contact, password } = req.body;

  try {
    const user = await findUserByContact(contact);
    if (!user) return res.status(400).json({ error: 'Invalid contact or password' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid contact or password' });

    const token = generateToken(user.id);
    res.status(200).json({ message: 'Login successful', token });
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
};
