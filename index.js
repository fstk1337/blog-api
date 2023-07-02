const express = require('express');
const cors = require('cors');

const userRouter = require('./routes/user.routes');
const postRouter = require('./routes/post.routes');

const PORT = process.env.PORT || 8000;

const app = express();

app.use(express.json());
app.use(cors({
  origin: 'http://localhost:5173'
}));
app.use('/api', userRouter);
app.use('/api', postRouter);

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));
