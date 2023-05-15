const express = require("express");
const dotenv =  require("dotenv").config();
const errorHandeler = require("./middleware/errorHandeler"); 
const connectdb = require("./config/dbConeection");
connectdb();
const app = express();
const port = process.env.PORT || 5000;

app.use(express.json());
app.use("/api/contacts",require("./routes/contactRoutes"));
app.use("/api/user",require("./routes/userRoutes"));
app.use(errorHandeler);

app.listen(port,() => {
    console.log(`Server running on port ${port}`);
});