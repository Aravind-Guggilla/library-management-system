const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");

dotenv.config();

const {initializeDB} = require('./src/config/db')


const authRoutes = require('./src/routes/authRoutes')
const bookRoutes = require("./src/routes/bookRoutes");

const app = express();

app.use(cors());
app.use(express.json());

//Routes
app.use('/api/auth', authRoutes)
app.use('/api/books', bookRoutes);


app.get("/", (request, response) => {
    response.send("Library Management System API");
});

const PORT = process.env.PORT || 5000;

const initializeServer = async () => {
  try {
    await initializeDB()

    console.log('PostgreSQL Connected Successfully')

    app.listen(process.env.PORT, () => {
      console.log(`Server Running at http://localhost:${process.env.PORT}/`)
    })
  } catch (error) {
    console.log(`DB Error: ${error.message}`)

    process.exit(1)
  }
}

initializeServer()

module.exports = app