import express from 'express';
import cors from 'cors';
import cursosRouter from './routes/cursos';
import matriculaRouter from './routes/matricula';

const app = express();
app.use(cors());
app.use(express.json());

app.use('/cursos', cursosRouter);
app.use('/matricula', matriculaRouter);

export default app;

const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});