import express, { Request, Response} from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import 'dotenv/config';

import todoRoutes from './routes/todos';

const app = express();
const PORT = process.env.PORT || 7000;

mongoose.connect(process.env.MONGO_URI as string)
  .then(() => console.log('Database connected'))
  .catch((err) => console.log(`Error connecting to database: ${err}`));

app.use(cors());
app.use(express.json());

app.use('/api/todo', todoRoutes);

app.get('/', (req: Request, res: Response) => {
  res.send('I\'m alive!');
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});