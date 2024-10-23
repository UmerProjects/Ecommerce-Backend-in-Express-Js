import dotenv from "dotenv";

dotenv.config();

const {PORT, SECRET_ACCESS_TOKEN} = process.env;

export { PORT, SECRET_ACCESS_TOKEN}
