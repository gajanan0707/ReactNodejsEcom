import express from 'express';
import mongoose from 'mongoose';
import userRouter from './routers/userRouter.mjs';
import productRouter from './routers/productRouter.mjs';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.mjs';
import path from 'path';
import uploadRouter from './routers/uploadRouter.mjs';


dotenv.config();
const app = express();

app.use(express.json()); //middlware
app.use(express.urlencoded({
    extended: true
})); //middlware

//mongoose connect 
mongoose.connect(process.env.MONGODB_URL || '', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
});


app.use('/api/uploads', uploadRouter); //uploads Image Route
app.use('/api/users', userRouter); //user route
app.use('/api/products', productRouter); //Product Route
app.use('/api/orders', orderRouter); // orders Route
app.get('/api/config/paypal', (req, res) => {
    res.send(process.env.PAYPAL_CLIENT_ID || 'sb');
});

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


//if error show
app.use((err, req, res) => {
    res.status(500).send({
        message: err.message
    });
});

//connect server port
const port = process.env.PORT || 5000;
app.listen(port, () =>
    console.log(`Serve at http://localhost:${port}`),
);