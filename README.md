
## Resumo das Implementações

### Prompt GPT aula
- https://chatgpt.com/share/588d8793-755a-4613-b23e-dda6dd785a9a

## Como Restaurar o Dump MySQL

1. **Passo 1: Acesse o diretório do dump**  
   Certifique-se de que o arquivo `alunos.sql` está localizado no diretório correto (neste exemplo, no diretório `dump_mysql`).

   ```bash
   cd dump_mysql
   ```

2. **Passo 2: Restaurar o Dump**  
   Use o comando `mysql` para restaurar o dump do banco de dados. Certifique-se de que o banco de dados `alunos` já exista ou crie-o antes de restaurar.

   ```bash
   mysql -uroot -p'root' alunos < alunos.sql
   ```

   Esse comando irá restaurar o banco de dados a partir do arquivo `alunos.sql`.

---

## Como Iniciar o Backend

1. **Passo 1: Acesse o diretório do backend**  
   Certifique-se de que você está no diretório correto do backend, neste caso, o diretório `cadastro_alunos`.

   ```bash
   cd cadastro_alunos
   ```

2. **Passo 2: Instalar as dependências**  
   Instale as dependências da aplicação backend usando `npm`:

   ```bash
   npm install
   ```

3. **Passo 3: Iniciar a aplicação**  
   Após a instalação das dependências, você pode iniciar o servidor backend:

   ```bash
   npm start
   ```

   O backend agora estará rodando em `http://localhost:3000`.

---

## Como Iniciar o Frontend

1. **Passo 1: Acesse o diretório do frontend**  
   O frontend está localizado no diretório `html_cadastro_alunos`. Certifique-se de estar nesse diretório:

   ```bash
   cd html_cadastro_alunos
   ```

2. **Passo 2: Instalar as dependências**  
   Instale as dependências da aplicação backend usando `npm`:

   ```bash
   npm install
   ```

3. **Passo 3: Iniciar a aplicação**  
   Após a instalação das dependências, você pode iniciar o servidor backend:

   ```bash
   npm start
   ```

   O frontend agora estará rodando em `http://localhost:3001`.
