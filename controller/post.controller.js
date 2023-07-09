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
    const users = (await db.query('SELECT * FROM users')).rows;
    let posts;
    if (id) {
      let user = users.find(user => user.id === Number(id));
      posts = (await db.query(`SELECT * FROM posts WHERE user_id = $1`, [id])).rows;
      posts = posts.map(post => {
        return {
          id: post.id,
          title: post.title,
          date: post.date,
          content: post.content,
          user: {
            email: user.email,
            nickname: user.nickname,
            first_name: user.first_name,
            last_name: user.last_name
          }
        };
      });
    } else {
      posts = (await db.query('SELECT * FROM posts')).rows;
      posts = posts.map(post => {
        let user = users.find(user => user.id === post.user_id);
        return {
          id: post.id,
          title: post.title,
          date: post.date,
          content: post.content,
          user: {
            email: user.email,
            nickname: user.nickname,
            first_name: user.first_name,
            last_name: user.last_name
          }
        };
      });
    }
    res.json(posts);
  }

	async getOnePost(req, res) {
		const id = req.params.id;
		let post = (await db.query('SELECT * FROM posts WHERE id = $1', [id])).rows[0];
    let user = (await db.query('SELECT * FROM users WHERE id = $1', [post.user_id])).rows[0];
    post = {
      title: post.title,
      date: post.date,
      content: post.content,
      user: {
        id: user.id,
        email: user.email,
        nickname: user.nickname,
        first_name: user.first_name,
        last_name: user.last_name
      }
    };
		res.json(post);
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
