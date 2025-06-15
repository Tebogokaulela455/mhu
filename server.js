const express = require('express');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const authRoutes = require('./routes/auth');
const cors = require('cors');
const app = express();

dotenv.config();




const adminRoutes = require('./routes/admin');
app.use('/api/admin', adminRoutes);



const investmentRoutes = require('./routes/investments');
app.use('/api/investments', investmentRoutes);







const txRoutes = require('./routes/transactions');
app.use('/api/transactions', txRoutes);

// Middleware
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log('MongoDB connected'))
  .catch(err => console.error(err));

// Routes
app.use('/api/auth', authRoutes);

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));