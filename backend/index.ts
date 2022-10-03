import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';


dotenv.config();

const app: Express = express();
const port = 8080
//process.env.PORT

app.get('/api/assignment3/johnsalinas', (req: Request, res: Response) => {
    res.send("HTTP API for John Salinas -> working")
})

  



app.get('/', (req : Request ,res: Response) => {
    res.send('Server is running!');
})

app.listen(port, () => {
    console.log(`Server is running at port ${port}`);
})
