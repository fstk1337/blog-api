const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

const db = require('../db');


class AuthController {
  async checkAuth(req, res) {
    const token = req.query.token;
    if (!token) {
      return res.status(400).json({
        success: false,
        message: 'Token was not provided.'
      });
    }
    try {
      const data = jwt.verify(token, process.env.JWT_SECRET);
      return res.status(200).json({
        success: true,
        data
      });
    } catch(error) {
      return res.status(400).json({
        success: false,
        message: 'Token is probably broken.'
      });
    }
  }

  async login(req, res, next) {
    const { email, password } = req.body;
    const users = (await db.query('SELECT * FROM users')).rows;
    const user = users.find(user => user.email === email);
    if (!user) {
      return next(Error('User with such email do not exists!'));
    }
    const checkPassword = await bcrypt.compare(password, user.password)
      .then(result => {
        return result;
      })
      .catch(error => {
        return next(Error(error.message));
      })
    
    if (!checkPassword) {
      return res.status(403).json({
        message: 'Password is incorrect.'
      });
    }
    
    let token;
    try {
      token = jwt.sign({
        userId: user.id,
        email: user.email,
        is_admin: user.is_admin
      }, process.env.JWT_SECRET, { expiresIn: '1h' });
    } catch (error) {
      return next(Error('Error signing JWT-token.'));
    }
    return res.status(200).json({
      success: true,
      token
    });
  }

  async register(req, res) {
    const { email, password } = req.body;
    const passwordHash = await bcrypt.genSalt(12).then(salt => {
      return bcrypt.hash(password, salt);
    });
    const newUser = await db.query(`INSERT INTO users (email, password, is_admin, nickname, first_name, last_name) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *`, [email, passwordHash, false, email, '', '']);
    res.json(newUser.rows[0]);
  }
}

module.exports = new AuthController();
