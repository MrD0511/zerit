import Express from "express"


const app = Express();

app.get("/", (req, res) => {

    res.json({
        message: "Hello, World!"
    });

})

export default app;