import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import dayjs from "dayjs";

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

app.get('/api/assignment3/brandontiet', (req: Request, res: Response) => {
  res.send("HTTP API for Brandon Tiet -> Hello there :)")
});

const currentDay = dayjs(new Date()).format("hh:mm:ss a")
app.get('/api/assignment4/brandontiet', (req: Request, res: Response) => {
  res.send(currentDay);
});


app.get("/", (req: Request, res: Response) => {
  res.send("Server is running!");
});

app.listen(port, () => {
  console.log(`Server is running at port ${port}`);
});
