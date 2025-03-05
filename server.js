// server.js
const fs = require('fs');
const https = require('https');
const next = require('next');

const dev = process.env.NODE_ENV !== 'production';
const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  https
    .createServer(
      {
        key: fs.readFileSync('./server.key'),  // Caminho para a chave privada gerada
        cert: fs.readFileSync('./server.crt'), // Caminho para o certificado gerado
      },
      (req, res) => {
        handle(req, res);
      }
    )
    .listen(3000, (err) => {
      if (err) throw err;
      console.log('> Ready on https://localhost:3000');
    });
});
