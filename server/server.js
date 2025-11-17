import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import multer from 'multer';
import resumeRouter from '../server/router/rsumeDataRouter.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express());

app.get('/', (req, res) => {
    res.send({ message: "Server is running...." });
    console.log("Server is runnig..")
});

app.use('/api', resumeRouter);

app.listen(PORT, ()=> {
    console.log(`Server is listening on port ${PORT}`);
});
