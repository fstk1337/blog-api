const db = require('../db');

class CommentController {
  async createComment(req, res) {
    const { userId, postId, date, text } = req.body;
    const timestamp = new Date(new Date(date) + (1000*60*(-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
    const newComment = await db.query(`INSERT INTO comments (user_id, post_id, date, text) VALUES ($1, $2, $3, $4) RETURNING *`, [userId, postId, timestamp, text]);
    res.json(newComment.rows[0]);
  }

  async getComments(req, res) {
    const id = req.query.postId;
    let comments;
    if (id) {
      comments = await db.query(`SELECT * FROM comments WHERE post_id = $1`, [id]);
    } else {
      comments = await db.query('SELECT * FROM comments');
    }
    res.json(comments.rows);
  }

	async getOneComment(req, res) {
		const id = req.params.id;
		const comment = await db.query('SELECT * FROM comments WHERE id = $1', [id]);
		res.json(comment.rows[0]);
	}

  async updateComment(req, res) {
		const { id, userId, postId, date, text } = req.body;
    const timestamp = new Date(new Date(date) + (1000*60*(-(new Date()).getTimezoneOffset()))).toISOString().replace('T', ' ').replace('Z', '');
		const comment = await db.query(
				'UPDATE comments SET user_id = $1, post_id = $2, date = $3, text = $4 WHERE id = $5 RETURNING *',
				[userId, postId, timestamp, text, id]
		);
		res.json(comment.rows[0]);
	}

	async deleteComment(req, res) {
		const id = req.params.id;
		const comment = await db.query('DELETE FROM comments WHERE id = $1', [id]);
		res.json(comment.rows[0]);
	}
}

module.exports = new CommentController();
