const mongoose = require('mongoose')
require('dotenv').config()

const mongoString = process.env.MONGODB_URI
if (!mongoString) {
  console.error('MongoDB URI is not set in the environment variables.');
} else {
mongoose.connect(mongoString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB successfully!')
})
.catch((error) => {
  console.error('Error connecting to MongoDB:', error.message)
})}