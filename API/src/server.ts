import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';

const app = express();

// import routes
import userRoute from './routes/user';
import productRoute from './routes/product';

const port = 8000;

// initialize server
app.listen(port, () => {
  console.log('server is running');
});
// middlewares
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser());

// app routes
app.use('/api', userRoute);
app.use('/api', productRoute);
// export
export default app;
