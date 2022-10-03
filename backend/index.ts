import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";

dotenv.config();

const app: Express = express();
const port = 8080;
//process.env.PORT

app.get("/api/assignment3/johnsalinas", (req: Request, res: Response) => {
  res.send("HTTP API for John Salinas -> working");
});

app.get("/api/assignment3/vunguyen", (req: Request, res: Response) => {
  res.send("Hello Worlddddddddddddddddddd");
});

app.get("/api/assignment3/brandonmoya", (req: Request, res: Response) => {
  res.send("HTTP API for Brandon Moya -> Trabajando! Whats up guys.");
});

app.get('/api/assignment3/brandontiet', (req, res) => {
    res.send("HTTP API for Brandon Tiet -> Hello there :)")
});

app.get('/api/assignment3/aamirsajjad', (req, res) => {
    res.send("HTTP API for Aamir Sajjad -> Got it to work")
});

app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
