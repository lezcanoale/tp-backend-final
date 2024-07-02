import express from 'express';
import morgan from 'morgan';
import routes from './routes/index.js';
import cors from 'cors';

const app = express();

app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Configurar middleware de CORS
app.use(cors());

app.use('/api', routes);

export default app;
