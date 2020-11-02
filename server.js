const express = require("express");
const app = express();
const connectToDatabase = require("./config/connectToDatabase");
const cors = require("cors");
const path = require("path");

let PORT = process.env.PORT || 5000;

app.use(cors());

connectToDatabase();

app.use(express.json({ extended: false }));



if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'client/build')));

  // Handle React routing, return all requests to React app
  app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'client/build', 'index.html'));
  });
}

app.use("/api/users", require("./routes/users"));

app.listen(PORT, () => console.log(`Server is running on port: ${PORT}`));
