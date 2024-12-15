# API de Gerenciamento de Tarefas
### Esta API foi criada utilizando o método nativo do Node.js para criar um servidor HTTP, sem dependências adicionais para o servidor, exceto pela biblioteca csv-parse para a conversão de arquivos CSV em tarefas e a criação automatizada de tarefas no projeto. A aplicação também faz uso das streams e do módulo fs do Node.js para o processamento de arquivos.
## Tecnologias Utilizadas
- ### Node.js (com módulos nativos http, fs, stream)
- ### csv-parse (para conversão de arquivos CSV)
- ### JSON (para estrutura de dados e comunicação da API)

## Funcionalidades

- Criação de tarefas a partir de dados enviados via API.
- Processamento de tarefas de um arquivo CSV e automação da criação de tarefas no sistema.
- Utilização de `streams` para processamento eficiente de arquivos grandes.
- Servidor HTTP simples criado com o módulo nativo `http` do Node.js.

## Como Rodar a Aplicação

### Pré-requisitos

- Node.js instalado (versão 14 ou superior).

### Passo a Passo

1. Clone o repositório:

   ```bash
   git clone https://github.com/DaviBispo16/api-without-dependencies
   cd repo-da-api

2. Instale as dependências (apenas o csv-parse é necessário):
   ```bash
   npm install

3. Para rodar o servidor
   ```bash
   npm run dev
4. A API estará disponível em http://localhost:3000

## Endpoints da API
### 1. POST /tasks - Cria uma nova tarefa no sistema.
### 2. GET /tasks - Retorna todas as tarefas criadas, também é possível realizar uma busca, filtrando as tasks pelo title e description no query params.
### 3. PUT /tasks/:id - Atualiza uma task pelo ID.
### 4. DELETE /tasks/:id - Remove uma task pelo ID.
### 5. PATCH /tasks/:id - Marca uma task como completa.


## Criação de tarefas via CSV 
 1.  Para realizar a criação é necessário adicionar as informações da tarefa no arquivo csvFile.csv nesse modelo:
  ```bash
    title,description
    Task 01,Descrição da Task 01
    Task 02,Descrição da Task 02
    Task 03,Descrição da Task 03
  ```
2. Rodar o diretório de Leitura de CSV
```bash
    node src/streams/csvFileReading.js
