const Database = require('../db/database');
const Aluno = require('../models/aluno');

class AlunoService {
  constructor() {
    this.db = new Database();
  }

  async criarAluno(aluno) {
    const sql = 'INSERT INTO alunos (nome, telefone) VALUES (?, ?)';
    try {
      await this.db.connect();
      const result = await this.db.query(sql, [aluno.nome, aluno.telefone]);
      aluno.id = result.insertId; // Define o ID do aluno inserido
      return aluno;
    } catch (error) {
      console.error('Erro ao criar aluno:', error);
    } finally {
      await this.db.close();
    }
  }

  async obterAlunoPorId(id) {
    const sql = 'SELECT * FROM alunos WHERE id = ?';
    try {
      await this.db.connect();
      const result = await this.db.query(sql, [id]);

      if (result.length > 0) {
        const alunoData = result[0];
        return new Aluno(alunoData.id, alunoData.nome, alunoData.telefone);
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter aluno:', error);
    } finally {
      await this.db.close();
    }
  }

  async atualizarAluno(aluno) {
    const sql = 'UPDATE alunos SET nome = ?, telefone = ? WHERE id = ?';
    try {
      await this.db.connect();
      const result = await this.db.query(sql, [aluno.nome, aluno.telefone, aluno.id]);
      return result.affectedRows; // Retorna o número de linhas afetadas
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
    } finally {
      await this.db.close();
    }
  }

  async deletarAluno(id) {
    const sql = 'DELETE FROM alunos WHERE id = ?';
    try {
      await this.db.connect();
      const result = await this.db.query(sql, [id]);
      return result.affectedRows; // Retorna o número de linhas deletadas
    } catch (error) {
      console.error('Erro ao deletar aluno:', error);
    } finally {
      await this.db.close();
    }
  }

  async listarAlunos() {
    const sql = 'SELECT * FROM alunos';
    try {
      await this.db.connect();
      const results = await this.db.query(sql);
      return results.map(alunoData => new Aluno(alunoData.id, alunoData.nome, alunoData.telefone));
    } catch (error) {
      console.error('Erro ao listar alunos:', error);
    } finally {
      await this.db.close();
    }
  }
}

module.exports = AlunoService;
