const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');
const mongoose = require('mongoose');
const taskRoutes = require('./routes/tasks');
require('dotenv').config();

const uri = process.env.MONGODB_URI;


async function main() {
  try {
    await mongoose.connect(uri, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongoose connected to MongoDB Atlas!');
    
     } catch (error) {
    console.error('MongoDB connection error:', error)
  }
}

async function startServer() {

  await main();

  const app = express();
  const PORT = process.env.PORT || 5500;

  app.use(cors());
  app.use(express.json());

  app.use('/tasks', taskRoutes);

  app.listen(PORT, () => {
    console.log(`Server is running on localhost:${PORT}`);
  });

};

startServer();
