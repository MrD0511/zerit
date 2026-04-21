import app from "./app/app.js"
import { configDotenv } from "dotenv";

configDotenv()

const port = process.env.PORT || "8000"

app.listen(port, () => {
    console.log(`Server is listning at http://localhost:${port} `);
})