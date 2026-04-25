import app from "./app.js"
import { configDotenv } from "dotenv";

configDotenv()

const port = process.env.PORT || "8088"

app.listen(port, '0.0.0.0',() => {
    console.log(`Server is listning at http://localhost:${port} `);
})