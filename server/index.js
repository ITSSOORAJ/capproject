const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const rootRouter = require('./routes/index.js')

app.use(cors());
app.use("/api",rootRouter)
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});saxaxaxass