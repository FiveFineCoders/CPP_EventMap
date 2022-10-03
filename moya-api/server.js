const express = require('express');
const app = express();
const memberRouter = require('./routes/members');
app.get('/', (req, res) => {
    res.send("Brandon Moya's HTTP API for A3")
})
app.use('/members', memberRouter);
const port = process.env.PORT || 5000;
app.listen(port, () => 'Server running on port $(port)');
