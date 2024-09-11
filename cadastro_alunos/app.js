const express = require('express');
const swaggerUi = require('swagger-ui-express');
const cors = require('cors'); // Importar o pacote cors
const swaggerDocument = require('./swagger.json'); // Importar o arquivo swagger.json

const AlunoService = require('./servicos/aluno_servico');
const Aluno = require('./models/aluno');

const app = express();
const port = 3000;

const alunoService = new AlunoService();

app.use(cors());
app.use(express.json()); // Middleware para tratar JSON

// Rota para a documentação Swagger
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

// Rota principal
app.get('/', (req, res) => {
  res.json({
    mensagem: "Bem vindo a API",
    doc: "/api-docs",
  });
});

// Rota para criar um novo aluno (Create)
app.post('/alunos', async (req, res) => {
  const { nome, telefone } = req.body;
  const novoAluno = new Aluno(null, nome, telefone);

  try {
    const alunoCriado = await alunoService.criarAluno(novoAluno);
    res.status(201).json(alunoCriado);
  } catch (error) {
    res.status(500).send('Erro ao criar aluno');
  }
});

// Rota para obter um aluno pelo ID (Read)
app.get('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const aluno = await alunoService.obterAlunoPorId(id);
    if (aluno) {
      res.json(aluno);
    } else {
      res.status(404).send('Aluno não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao obter aluno');
  }
});

// Rota para listar todos os alunos (Read)
app.get('/alunos', async (req, res) => {
  try {
    const alunos = await alunoService.listarAlunos();
    res.json(alunos);
  } catch (error) {
    res.status(500).send('Erro ao listar alunos');
  }
});

// Rota para atualizar um aluno (Update)
app.put('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  const { nome, telefone } = req.body;
  const alunoAtualizado = new Aluno(id, nome, telefone);

  try {
    const rowsAffected = await alunoService.atualizarAluno(alunoAtualizado);
    if (rowsAffected > 0) {
      res.json(alunoAtualizado);
    } else {
      res.status(404).send('Aluno não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao atualizar aluno');
  }
});

// Rota para deletar um aluno (Delete)
app.delete('/alunos/:id', async (req, res) => {
  const { id } = req.params;
  try {
    const rowsAffected = await alunoService.deletarAluno(id);
    if (rowsAffected > 0) {
      res.send('Aluno deletado com sucesso');
    } else {
      res.status(404).send('Aluno não encontrado');
    }
  } catch (error) {
    res.status(500).send('Erro ao deletar aluno');
  }
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
  console.log(`Documentação do Swagger disponível em http://localhost:${port}/api-docs`);
});
