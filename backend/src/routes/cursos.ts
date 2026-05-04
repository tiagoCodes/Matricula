import { Router } from 'express';

export interface Curso {
  id: number;
  nome: string;
}

const cursos: Curso[] = [
  { id: 1, nome: 'Engenharia de Software' },
  { id: 2, nome: 'Ciência da Computação' },
  { id: 3, nome: 'Análise e Desenvolvimento de Sistemas' }
];

const router = Router();

// GET /cursos
router.get('/', (_req, res) => {
  res.status(200).json(cursos);
});

export default router;