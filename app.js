// index.js or app.js
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const projectRoutes = require('./routes/projectRoutes');
const userRoutes = require('./routes/userRoutes');
const taskRoutes = require('./routes/taskRoutes')
const taskHistoryRoutes = require('./routes/taskhistoryRoutes')
const contactRoutes = require('./routes/contactRoutes')
const correspondenceRoutes =require('./routes/correspondenceroutes')
const invoiceRoutes=require('./routes/invoiceRoutes')
const incomeRoutes=require('./routes/incomeRoutes')
const consolidatedRoutes = require('./routes/consolidatedbillRoutes');
const questionRoutes=require('./routes/questionRoutes')
const setRoutes=require('./routes/setRoutes')
const corRoutes=require('./routes/cor')

const passport = require('passport');
const app = express();
const port = 3000;
const cors = require('cors')
require('./database/db')
app.use(bodyParser.json());
app.use(cors())

require('./auth')

// Middleware for Express
app.use(express.urlencoded({ extended: false }));


// Serve HTML file
// app.get('/', (req, res) => {
//   res.send({message:"server responding"})
// });

//////Auth

// const express = require('express');
// const app = express();
app.use(session({ secret: 'your-secret-key', resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
//Auth Starts here


// API endpoint for sign in
  app.post('/api/signin', (req, res) => {
    // Process sign-in logic here
    res.send('Sign in endpoint reached');
  });
  
  app.get('/auth/google',
    passport.authenticate('google', { scope: ['profile'] }));
  
  app.get('/auth/google/callback',
    passport.authenticate('google', { 
    successRedirect:'/auth/google/protected',
    failureRedirect: '/login' }),
    function(req, res) {
      // Successful authentication, redirect home.
      res.redirect('/');
    });
  
  app.get('/auth/google/protected',(req,res)=>{
      let name=req.user.displayName
      // res.send(req.user)
  
      res.redirect('http://localhost:3001'); // Redirect to localhost:3001 after successful authentication
     
      // res.send(`Hello There ${name}`)
  })

//Auth ends here

// Use asset routes
app.use('/cor',corRoutes)
app.use('/project', projectRoutes);
app.use('/user', userRoutes);
app.use('/task',taskRoutes)
app.use('/history',taskHistoryRoutes)
app.use('/contact',contactRoutes)
app.use('/correspondence',correspondenceRoutes)
app.use('/invoice',invoiceRoutes)
app.use('/income',incomeRoutes)
app.use('/consolidated', consolidatedRoutes);
app.use('/question',questionRoutes)
app.use('./set',setRoutes)
// Start server
const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
  //////////////console.log(`Server is running on port ${PORT}`);
});

const awsServerlessExpress = require('aws-serverless-express');
const server = awsServerlessExpress.createServer(app)

module.exports.handler = (event, context) => awsServerlessExpress.proxy(server, event, context);