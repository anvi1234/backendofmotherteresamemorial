 require("dotenv").config();
const mongoose = require("mongoose");
const app = require("./app");
mongoose.connect(process.env.MONGO_URI, {
  family: 4 // 👈 important fix for your error
})
.then(() =>   app.listen(process.env.PORT || 5000, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    }))
.catch(err => console.log(err));
