import express, { Request, Response } from 'express';
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const cors = require('cors');
const mongoose = require('mongoose');
const taskRouter = require('./routes/taskRouter');

dotenv.config();
const app = express();
const PORT = process.env.PORT;

// Enable CORS for all routes
app.use(cors());
app.use(bodyParser.json());


// Connection URI for your MongoDB Atlas cluster
mongoose.connect('mongodb+srv://ram:ram123@cluster0.i15ai48.mongodb.net/dubai?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('Connected to MongoDB Atlas');
})
.catch((err: Error) => {
    console.error('Error connecting to MongoDB Atlas:', err);
});


// Functions 
app.use('/',taskRouter);

// Check for port running or not 
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});


export default app;
