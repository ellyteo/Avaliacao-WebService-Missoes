# Avaliacao-WebService-Missoes
Avaliação do dia 06/10/2026


#### Gabriélly Teodoro da Silva
Técnico em informática para Internet;  
U.C. - Desenvolver Web Service;

---
### Descrição

Serviço web em Node.js/Express que executa operações CRUD (GET, POST, PUT E DELETE), com entrada e saída de informações em JSON.

### Endpoints

- "/missoes" (POST) - Endpoint para a criação de um nova missão.

- "/missoes/:id" (GET) - Endpoint para usca de uma missão por meio do ID registrado.

- "/missoes" (GET) - Endpoint para filtrar a busca de missões registradas por meio do nome e/ou autor.

- "/missoes/:id" (PUT) - Endpoint para alterar informações de uma missão já criada (a busca da missão para alteração é por meio do ID registrado).

- "/missoes/:id" (DELETE) - Endpoint que deleta uma missão por meio do ID registrado.

### Decisões técnicas

- Endpoints - Escritos para deixar as ações que serão realizadas explicitas para facilitar na hora dos testes, localização para correções/mudanças no código e visibilidade.

- Status - Utilizados para dar uma resposta de acordo com a ação realizada para evitar erros e notificar se existem.

### Como instalar/rodar

1. Clonar o repositório do GitHub na sua máquina localmente;
2. Abrir o terminal Git Bash dentro repositório já clonado e executar `npm install` para instalar.
3. Para rodar deve abrir o terminal Git Bash dentro repositório e executar `npm run dev` para iniciar a executá-lo.
4. Para utilizar os endpoints, abra o Postman e de acordo com cada ação o configure. Exemplo: "/missoes/buscar/:id" (GET) -
coloque para rodar como GET e na URL `http://localhost:3000/missoes/buscar/1` (se o missão estiver registrado ele deve ser retornado juntamente com o status 200 de sucesso). Caso o id/missão buscado não exista será retornado o erro 404 (erro do usuário).
