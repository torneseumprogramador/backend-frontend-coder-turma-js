const express = require('express');
const path = require('path'); // Módulo para lidar com caminhos

const app = express();
const port = 3001;

// Definir o diretório das views
app.set('views', path.join(__dirname, 'views'));

// Definir EJS como o motor de template
app.set('view engine', 'ejs');

// Middleware para servir arquivos estáticos (como CSS, imagens, etc.)
app.use(express.static(path.join(__dirname, 'public')));

// Rota principal que renderiza a view "index.ejs"
app.get('/', (req, res) => {
  res.render('index');
});

// Iniciar o servidor
app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});
