import bodyParser from 'body-parser';
import cors from 'cors';
import express from "express";

const app = express()

app.use(cors());
app.use(bodyParser.json());

const port = 4000

let lists:any[] = [];

app.post("/save", (req, res) => {
  console.log(req.body)
  lists = req.body.lists
  return res.json({ success: true })
})

app.get("/load", (req, res) => res.json({ lists }))

app.listen(port, () =>
  console.log(`🚀 running  on http://localhost:${port}!`)
)
