const db = require('../db');

class UserController {
	async createUser(req, res) {
		const { email, password, nickname, firstName, lastName } = req.body;
		const newUser = await db.query(`INSERT INTO users (email, password, nickname, first_name, last_name) VALUES ($1, $2, $3, $4, $5) RETURNING *`, [email, password, nickname, firstName, lastName]);
		res.json(newUser.rows[0]);
	}

	async getUsers(_, res) {
		const users = await db.query('SELECT * FROM users');
		res.json(users.rows);
	}

	async getOneUser(req, res) {
		const id = req.params.id;
		const user = await db.query('SELECT * FROM users WHERE id = $1', [id]);
		res.json(user.rows[0]);
	}

	async updateUser(req, res) {
		const { id, email, password, nickname, firstName, lastName } = req.body;
		const user = await db.query(
				'UPDATE users SET email = $1, password = $2, nickname =$3, first_name = $4, last_name = $5 WHERE id = $6 RETURNING *',
				[email, password, nickname, firstName, lastName, id]
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
