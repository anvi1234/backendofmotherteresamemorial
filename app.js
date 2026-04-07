const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/banner", require("./routes/banner.routes"));
app.use("/api/event", require("./routes/event.routes"));
app.use("/api/calender", require("./routes/calender.routes"));
app.use("/api/popup", require("./routes/popup.routes"));
app.use("/api/academic", require("./routes/academic.routes"));
app.use("/api/contact", require("./routes/contact.routes"));

module.exports = app;