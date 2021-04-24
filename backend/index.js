const express = require('express');
const ConnectDB = require('./config/db');
const dotenv = require('dotenv');
const helmet = require('helmet');
const morgan = require('morgan');
const userRouter = require('./routes/UserRouter');
const authRouter = require('./routes/AuthRouter');
const postRouter = require('./routes/PostRouter');

dotenv.config();
const app = express();
ConnectDB();
//middleware
app.use(express.json());
app.use(helmet());
app.use(morgan('common'));

app.use('/api/users', userRouter);
app.use('/api/auth', authRouter);
app.use('/api/posts', postRouter);

app.listen(8000, () => console.log('Backend server is running...'));
