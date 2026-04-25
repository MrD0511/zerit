import Express from "express"
import CORS from "cors"
import multer from "multer"
import sequelize from "./config/db.js";
import "./models/associations.js"
import { fetchOrder, uploadController } from "./controllers/upload.js";

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 10 * 1024 * 1024, // 10MB per file (important even in prototype)
    },
});

const app = Express();

app.use(CORS({
    origin: "https://zerit.vercel.app"
}))

app.use(Express.json({ limit: "20mb" }));
app.use(Express.urlencoded({ limit: "20mb", extended: true }));

app.get("/", (req, res) => {

    res.json({
        message: "Hello, World!"
    });

})

app.post('/api/upload', upload.any(), uploadController)
app.get('/api/fetch-order/:token', fetchOrder);

export default app;