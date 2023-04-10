if (process.env.NODE_ENV !== 'production') {
    require('dotenv').config()
}
const mongoose = require("mongoose")
const express = require("express")
const cors = require("cors")
const app = express()

const port = process.env.PORT || 3000;
const db = process.env.MONGO_URI;

const Url = require("./url");

app.use(cors())
app.use(express.json())

app.get("/:index", (req, res) => {
    Url.findOne({ index: req.params.index })
        .then(result => res.redirect(result.url))
        .catch(err => console.log(err));
})

app.post("/", (req, res) => {
    Url.find()
        .sort({ _id: -1 })
        .limit(1)
        .then((result) => {
            let index = 0;
            result[0] ? (index = result[0].index + 1) : (index = 1);
            const url = new Url({ index: index, url: req.body.url });
            url
                .save()
                .then((result) => {
                    const newUrl = req.protocol + "://" + req.get("host") + "/" + result.index;
                    return res.json({ newUrl });
                });
        })
        .catch(err => console.log(err));
})

mongoose
    .connect(db)
    .then(() => app.listen(port))
    .then(() => console.log(`Server ready. Listening on port ${port}`))
    .catch(err => console.log(err));