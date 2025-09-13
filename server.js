const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database connection
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected'))
.catch(err => console.log('MongoDB connection error:', err));

// Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/summary', require('./routes/summary'));
app.use('/api/commercial', require('./routes/commercial'));
app.use('/api/dc', require('./routes/dc'));
app.use('/api/drsite', require('./routes/drsite'));
app.use('/api/sizing', require('./routes/sizing'));
app.use('/api/queries', require('./routes/queries'));
app.use('/api/raci', require('./routes/raci'));
app.use('/api/discount', require('./routes/discount'));
app.use('/api/export', require('./routes/export'));

// Serve static files from React app
if (process.env.NODE_ENV === 'production') {
  const buildPath = path.join(__dirname, 'client/build');
  console.log('Build path:', buildPath);
  console.log('Build directory exists:', require('fs').existsSync(buildPath));
  
  app.use(express.static(buildPath));
  
  app.get('*', (req, res) => {
    const indexPath = path.join(buildPath, 'index.html');
    console.log('Serving index.html from:', indexPath);
    console.log('Index file exists:', require('fs').existsSync(indexPath));
    res.sendFile(indexPath);
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});