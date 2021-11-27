const express = require("express");
const path = require("path");
const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const cors = require("cors");
// const auth = require("./src/routes/auth");
// const products = require("./src/routes/product");
// const orders = require("./src/routes/order");
const blog = require("./src/routes/blog");
const fileUpload = require("express-fileupload");
const errrorHandler = require("./src/middleware/error");
const connectDB = require("./config/db");

connectDB();

const app = express();
app.use(cors());
app.use(
  express.json({
    limit: "50mb",
    extended: true,
  })
);
app.use(
  express.urlencoded({
    extended: true,
    limit: "50mb",
  })
);

app.use(
  fileUpload({
    useTempFiles: true,
    preserveExtension: true,
  })
);
app.use("/api/v1/blog", blog);


// app.use(express.static(path.join(__dirname, 'public')))


app.use(errrorHandler);
const PORT = process.env.PORT || 5000;
app.listen(
  PORT,
  console.log(`Server is running in ${process.env.NODE_ENV} on port ${PORT}`)
);
