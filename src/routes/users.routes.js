const express = require('express');
const bcrypt = require('bcryptjs');
const validateCreateUser = require('../middlewares/validateCreateUser');
const userRepo = require('../repositories/user.repo');

const router = express.Router();

router.post('/', validateCreateUser, async (req, res, next) => {
  try {
    const email = req.body.email.trim().toLowerCase();
    const name = req.body.name.trim();
    const password = req.body.password;

    // ห้ามเก็บ password แบบ plain text -> hash ก่อน
    const passwordHash = await bcrypt.hash(password, 10);

    const user = await userRepo.createUser({ email, name, passwordHash });

    res.status(201).json({
      id: user.id,
      email: user.email,
      name: user.name,
      createdAt: user.created_at,
    });
  } catch (err) {
    // unique_violation (email ซ้ำ)
    if (err && err.code === '23505') {
      return res.status(409).json({ message: 'Email already exists' });
    }
    next(err);
  }
});

module.exports = router;