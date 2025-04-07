//core module

//external module
const express= require('express');
const dotenv = require('dotenv');
const cors = require('cors');

//local module
const authRoutes = require('./routes/authRouter');


//handler
const app=express();
dotenv.config();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);

// Root route
app.get('/', (req, res) => res.send('Wealth Management System API'));

//server listen
app.listen(PORT,()=>{
    console.log(`this app is serve at : http://localhost${PORT}`);
})
