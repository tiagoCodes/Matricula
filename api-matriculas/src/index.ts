import express from 'express';
import cors from 'cors';
import cursosRouter from './routes/cursos';
import matriculaRouter from './routes/matricula';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/cursos', cursosRouter);
app.use('/matricula', matriculaRouter);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`API rodando em http://localhost:${PORT}`);
});