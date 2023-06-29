const db = require('../db');

class UserController {
    async createUser(req, res) {
        const { nickname, password, firstName, lastName } = req.body;
	const newUser = await db.query(`INSERT INTO users (nickname, password, first_name, last_name) VALUES ($1, $2, $3, $4) RETURNING *`, [nickname, password, firstName, lastName]);
	res.json(newUser.rows[0]);
    }

    async getUsers(req, res) {
        const users = await db.query('SELECT * FROM users');
	res.json(users.rows);
    }

    async getOneUser(req, res) {
	const id = req.params.id;
	const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
	res.json(user.rows[0]);
    }

    async updateUser(req, res) {
	const { id, nickname, password, firstName, lastName } = req.body;
	const user = await db.query(
	    'UPDATE users SET nickname = $1, password = $2, first_name = $3, last_name = $4 WHERE id = $5 RETURNING *',
	    [nickname, password, firstName, lastName, id]
	);
	res.json(user.rows[0]);
    }

    async deleteUser(req, res) {
	const id = req.params.id;
	const user = await db.query('DELETE FROM users WHERE id = $1', [id]);
	res.json(user.rows[0]);
    }
}

module.exports = new UserController();

