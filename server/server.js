require("dotenv").config();
const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const contactRoutes = require("./routes/contactRoutes");
const { notFound, errorHandler } = require("./middleware/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (req, res) => res.json({ ok: true }));
app.use("/api/contacts", contactRoutes);
app.use(notFound);
app.use(errorHandler);

connectDB().then(() =>
  app.listen(process.env.PORT || 5000, () => console.log(`API running on port ${process.env.PORT || 5000}`))
);
