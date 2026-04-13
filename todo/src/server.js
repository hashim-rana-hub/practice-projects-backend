const app = require("./app");
const connectDB = require("./config/db");
const port = 3000;

const taskRoutes = require("./routes/tasks.routes");
app.use("/api", taskRoutes);
connectDB();
app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
