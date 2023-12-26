require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const sls = require('serverless-http');
const cors = require('cors');
const logger = require('morgan');
const helmet = require('helmet');
const compression = require('compression');
const errorHandler = require('./middleware/errorHandler');
const { PORT } = require('./config');
const app = express();
global.appRoot = path.resolve(__dirname);
const publicPath = path.join(__dirname, 'public');

//connect db
require('./db/conn');

//middlewares
app.use(logger('dev'));
app.use(helmet());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(publicPath));
app.use(
  cors({
    origin: '*', // Replace with the actual client URL
  })
);
app.use(compression());

//start
app.get('/', (req, res) => {
  res.send('Welcome to this Api....');
});

//routes
app.use('/api/auth/', require('./routes/auth'));
app.use('/api/roles/', require('./routes/roles'));
app.use('/api/posts/', require('./routes/posts'));
app.use('/api/organizations/', require('./routes/organizations'));
app.use('/api/workers/', require('./routes/worker'));
app.use('/api/stockin/', require('./routes/stockIn'));

app.use('/api/items/', require('./routes/item'));
app.use('/api/programs/', require('./routes/program'));
app.use('/api/workerIssue/', require('./routes/workerIssue'));
app.use(
  '/api/checkingWorkerReceived/',
  require('./routes/checkingWorkerReceived')
);
app.use('/api/checkingWorkerIssue/', require('./routes/checkingWorkerIssue'));
app.use('/api/pressIssue/', require('./routes/pressIssue'));
app.use('/api/deliveryIssue/', require('./routes/deliveryIssue'));

// CELEBRATE ERROR HANDLING
app.use(errorHandler);

app.listen(PORT, (req, res) => {
  console.log(`🚀 App running on: http://localhost:${PORT}`);
});

module.exports.server = sls(app);
