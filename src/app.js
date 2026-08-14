import express from "express";
import dotenv from "dotenv";
import mongoose from "mongoose";
import dns from "dns";
import cors from "cors";

import AuthRoutes from "./routes/authRoutes.js";
import UserRoutes from "./routes/UsersRoutes.js";

dns.setServers(["8.8.8.8", "8.8.4.4"]);

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

async function main() {
  try {
    await mongoose.connect(process.env.MONGO_URI);

    console.log("Database is connected");

    app.listen(process.env.PORT, () => {
      console.log(`App is running on port ${process.env.PORT}`);
    });

  } catch (error) {
    console.log("Database connection failed:", error.message);
  }
}

app.use("/api/v1/auth", AuthRoutes);
app.use("/api/v1/users", UserRoutes);

main();