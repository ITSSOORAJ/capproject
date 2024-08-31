const express = require('express');
const app = express();
const cors = require('cors');
const connectDB = require('./config/database.js');
const port = 3000;
const rootRouter = require('./routes/index.js')
require('dotenv').config();

app.use(express.json());
app.use(cors());

app.use("/api",rootRouter)
app.get('/', (req, res) => {
    res.send('Hello World!');
});
async function startServer() {
try {
    

    // First, connect to the database
    await connectDB();

    app.listen(port, () => {
        console.log(`Server is running on port http://localhost:${port}`);

    });
  } catch (error) {
    console.error("Server failed to start:", error);
    process.exit(1);
  }
};

startServer();
