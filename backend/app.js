const express = require("express");
const http = require("http");
const socketIo = require("socket.io");
const port = process.env.PORT || 4001;
const index = require("./routes/index");  //o index eh utilizado apenas para simular o uso de rotas/api's

const app = express();

const server = http.createServer(app);

app.use(index); // simulacao do uso do index/rotas/api's

const io = socketIo(server);

let users=[]; //conjunto de usuarios que estao conectados ah pagina

io.on("connection", (socket) => {
  console.log('conexao') //informa que alguem acessou
  socket.emit('apelido_msg', 'Olá apelido que recebe msg exclusiva!');/**envia msg para o usuario que digitar o apelido='apelido_msg' */
  /**obtem os dados do cliente que acessou, para armazenar os seus dados, neste caso apenas apelido */
  socket.on("login", apelido => {
    if(!(apelido in users)){
      socket.apelido = apelido;
      users[apelido] = socket; /// Adicionadno o nome de usuario a lista armazenada no servidor
      console.log(`${apelido} acabou de entrar`);
    }
  })
  /**ao se desconectar da aplicacao, removemos ele do conjunto, e informamos no console quem saiu*/
  socket.on("disconnect", () => {
    delete users[socket.apelido]
    console.log(`${socket.apelido} acabou de sair`);
  });
});

server.listen(port, () => console.log(`Listening on port ${port}`));