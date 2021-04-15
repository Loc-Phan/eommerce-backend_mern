const express = require('express');
const env = require('dotenv');
const app = express();
const mongoose = require('mongoose');

//routers 
const userRouters = require('./routes/user');

//to load environment of variable from a .env file
env.config();

//mongodb connection
//mongodb+srv://root:<password>@cluster0.wu1pg.mongodb.net/myFirstDatabase?retryWrites=true&w=majority
mongoose.connect(
    `mongodb+srv://${process.env.MONGO_DB_USER}:${process.env.MONGO_DB_PASSWORD}@cluster0.wu1pg.mongodb.net/${process.env.MONGO_DB_DATABASE}?retryWrites=true&w=majority`,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true
    }
).then(() => {
    console.log('Database connected');
});

app.use(express.json());
app.use('/api', userRouters)

app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
})