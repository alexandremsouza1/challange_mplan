import express from "express";
const cors = require('cors');
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(cors());

app.use(express.json());
app.use("/api", taskRoutes);

export default app;
