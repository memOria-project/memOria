require('dotenv').config();
const express = require('express');
const cors = require('cors');

const router = require('./app/router');

const app = express();


const port = process.env.PORT || 5500;

app.use('/v1', router);

const corsOption = { origin: "https://memoria-oclock.netlify.app" };
app.use(cors(corsOption));

app.listen(port, () => {
    console.log(`Server started on http://localhost:${port}`);
});

