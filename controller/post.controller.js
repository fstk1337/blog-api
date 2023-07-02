const db = require('../db');

class PostController {
  async createPost(req, res) {
    const { title, date, content, userId } = req.body;
    const timestamp = new Date(new Date(date) + (1000*60*(-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
    const newPost = await db.query(`INSERT INTO posts (title, date, content, user_id) VALUES ($1, $2, $3, $4) RETURNING *`, [title, timestamp, content, userId]);
    res.json(newPost.rows[0]);
  }

  async getPosts(req, res) {
    const id = req.query.userId;
    let posts;
    if (id) {
      posts = await db.query(`SELECT * FROM posts WHERE user_id = $1`, [id]);
    } else {
      posts = await db.query('SELECT * FROM posts');
    }
    res.json(posts.rows);
  }

	async getOnePost(req, res) {
		const id = req.params.id;
		const post = await db.query('SELECT * FROM posts WHERE id = $1', [id]);
		res.json(post.rows[0]);
	}

  async updatePost(req, res) {
		const { id, title, date, content, userId } = req.body;
    const timestamp = new Date(new Date(date) + (1000*60*(-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
		const post = await db.query(
				'UPDATE posts SET title = $1, date = $2, content = $3, user_id = $4 WHERE id = $5 RETURNING *',
				[title, timestamp, content, userId, id]
		);
		res.json(post.rows[0]);
	}

	async deletePost(req, res) {
		const id = req.params.id;
		const post = await db.query('DELETE FROM posts WHERE id = $1', [id]);
		res.json(post.rows[0]);
	}
}

module.exports = new PostController();
