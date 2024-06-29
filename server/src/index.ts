import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors'; 
import oauthRouter from '../routes/oauth.route'

dotenv.config();

const app = express();
const port = process.env.PORT;

app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
  res.send('success');
});

app.use('/api', oauthRouter)

app.listen(port, () => {
  console.log(`server is running on http://localhost:${port}`);
});