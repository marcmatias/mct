import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";

dotenv.config();

// Initialize App
const app = express();
app.use(cors());
const __dirname = path.resolve();

app.get('/:arg', (req, res) => {
  res.header("Content-Type",'application/json');
  if (req.params.arg.includes(",")){
    const args = req.params.arg.split(",");
    const result = {};
    for (let arg of args) {
      result[arg] = JSON.parse(fs.readFileSync(path.join(__dirname, `./api/${arg}.json`)));
    }
    res.send(result)

    return;
  }

  res.sendFile(path.join(__dirname, `./api/${req.params.arg}.json`));
});

app.get('/UF/:state/:arg', (req, res) => {
  res.header("Content-Type",'application/json');
  if (req.params.arg.includes(",")){
    const args = req.params.arg.split(",");
    const result = {};
    for (let arg of args) {
      result[arg] = JSON.parse(fs.readFileSync(path.join(__dirname, `./api/${arg}.json`)));
    }
    res.send(result)

    return;
  }

  res.sendFile(path.join(__dirname, `./api/UF/${req.params.state}/${req.params.arg}.json`));
});

const port = process.env.SERVER_HOST_PORT;
app.listen(port, () => {
  console.log(`\nServer started at ${port}!\n`);
});

