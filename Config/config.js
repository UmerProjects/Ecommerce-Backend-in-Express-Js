import dotenv from "dotenv";

dotenv.config();

const {PORT, SECRET_ACCESS_TOKEN, MONGODB_URL} = process.env;

export { PORT, SECRET_ACCESS_TOKEN, MONGODB_URL}
