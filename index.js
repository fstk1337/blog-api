const express = require('express');

const PORT = process.env.PORT || 8000;

const app = express();

app.get('/', (req, res) => {
    res.send('Hello from Express JS');
});

app.listen(PORT, () => console.log(`Server started at port ${PORT}`));

