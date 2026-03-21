import { Router } from 'express';
import type { Curso } from './cursos';

interface MatriculaPayload {
  nomeCompleto: string;
  email: string;
  cursoId: number;
}

// "Banco" em memória
const matriculas: MatriculaPayload[] = [];
const cursosDisponiveis: Curso[] = [
  { id: 1, nome: 'Engenharia de Software' },
  { id: 2, nome: 'Ciência da Computação' },
  { id: 3, nome: 'Análise e Desenvolvimento de Sistemas' }
];

const router = Router();

// POST /matricula
router.post('/', (req, res) => {
  const { nomeCompleto, email, cursoId } = req.body as Partial<MatriculaPayload>;

  // Validações simples (runtime)
  if (!nomeCompleto || nomeCompleto.trim().length < 3) {
    return res.status(400).json({ erro: 'Nome completo é obrigatório e deve ter ao menos 3 caracteres.' });
  }
  if (!email || !/^\S+@\S+\.\S+$/.test(email)) {
    return res.status(400).json({ erro: 'E-mail inválido.' });
  }
  const curso = cursosDisponiveis.find(c => c.id === Number(cursoId));
  if (!curso) {
    return res.status(400).json({ erro: 'Curso selecionado é inválido.' });
  }

  const novaMatricula: MatriculaPayload = {
    nomeCompleto: nomeCompleto.trim(),
    email: email.trim(),
    cursoId: Number(cursoId)
  };

  matriculas.push(novaMatricula);

  return res
    .status(201)
    .json({ mensagem: 'Matrícula criada com sucesso!', dados: novaMatricula });
});

export default router;