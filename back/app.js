// app.js
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const authRoutes = require('./auth');
const accidents = require('./accident');
const forms = require('./form')
require('dotenv').config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use('/auth', authRoutes);
app.use('/api', accidents)
app.use('/post', forms);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
