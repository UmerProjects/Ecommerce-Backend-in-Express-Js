import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import { PORT } from "./Config/config.js";
import Router from "./Routes/index.js";


const server = express();

server.use(cors())

server.use(express.json())




main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/ProductsApi');
  console.log("mongoose is connected");
}


Router(server);

console.log(PORT);


server.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
})
