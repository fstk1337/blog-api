const express = require('express');
const cors = require('cors');
const jwt = require('jsonwebtoken');

const authRouter = require('./routes/auth.routes');
const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');
const commentRouter = require('./routes/comment.routes');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));

app.use('/auth', authRouter);

app.use('/api', function(req, res, next) {
  if (!req.headers.authorization) {
    return res.status(403).json({
      success: false,
      message: 'Auth token was not provided.'
    });
  }
  const token = req.headers.authorization.split(' ')[1];
  jwt.verify(token, process.env.JWT_SECRET, function(err) {
    if (err) {
      return res.status(401).json({
        error: err,
        message: 'Authentication failed'
      })
    }
    next();
  });
});
app.use('/api', userRouter);
app.use('/api', postRouter);
app.use('/api', commentRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
