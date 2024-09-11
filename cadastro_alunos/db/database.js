const mysql = require('mysql2');
const dbConfig = require('../config/db');

class Database {
  constructor() {
    this.connection = null;
  }

  // Método para conectar ao banco de dados
  connect() {
    return new Promise((resolve, reject) => {
      this.connection = mysql.createConnection(dbConfig);
      this.connection.connect((err) => {
        if (err) {
          reject(`Erro ao conectar ao MySQL: ${err.message}`);
        } else {
          console.log('Conectado ao MySQL com sucesso!');
          resolve();
        }
      });
    });
  }

  // Método genérico para executar queries
  query(sql, params = []) {
    return new Promise((resolve, reject) => {
      this.connection.query(sql, params, (err, results) => {
        if (err) {
          reject(`Erro ao executar a query: ${err.message}`);
        } else {
          resolve(results);
        }
      });
    });
  }

  // Método para fechar a conexão
  close() {
    return new Promise((resolve, reject) => {
      if (this.connection) {
        this.connection.end((err) => {
          if (err) {
            reject(`Erro ao fechar a conexão: ${err.message}`);
          } else {
            console.log('Conexão encerrada.');
            resolve();
          }
        });
      } else {
        resolve();
      }
    });
  }
}

module.exports = Database;
