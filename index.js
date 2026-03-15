import express from 'express';

const host = '0.0.0.0'; // Todas interfaces de rede possam acessar a nossa aplicação
const porta = 3000; // Aplicação identificada pelo número 3000

const app = express();
var listaFornecedores = [];

app.use(express.urlencoded({extended: true}));

app.get('/', (req, res) => {
    res.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Menu</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-sRIl4kxILFvY47J16cr9ZwB07vP4J8+LH7qKQnuqkuIAvNWLzeN8tE5YBujZqJLB" crossorigin="anonymous">
            </head>
            <body>`);
    
    res.write(`
            <nav class="navbar navbar-expand-lg bg-body-tertiary">
                <div class="container-fluid">
                    <a class="navbar-brand" href="/">Menu</a>
                    <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div class="collapse navbar-collapse" id="navbarSupportedContent">
                        <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                            <li class="nav-item">
                                <a class="nav-link active" aria-current="page" href="/">Home</a>
                            </li>
                            
                            <li class="nav-item dropdown">
                                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                    Cadastro
                                </a>
                            <ul class="dropdown-menu">
                                <li><a class="dropdown-item" href="/fornecedor">Cadastrar Fornecedor</a></li>
                                <li><hr class="dropdown-divider"></li>
                                <li><a class= "dropdown-item" href="/listaFornecedores">Lista de Fornecedores</a></li>
                            </ul>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="/login">Login</a>
                            </li>

                            <li class="nav-item">
                                <a class="nav-link" href="/logout">Logout</a>
                            </li>
                        </ul>
                    <form class="d-flex" role="search">
                        <input class="form-control me-2" type="search" placeholder="Pesquisar" aria-label="Pesquisar"/>
                        <button class="btn btn-outline-success" type="submit">Pesquisar</button>
                    </form>
                    </div>
                </div>
            </nav>`
        );
    
    res.write(`
            </body>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/js/bootstrap.bundle.min.js" integrity="sha384-FKyoEForCGlyvwx9Hj09JcYn3nv7wiPVlz7YYwJrWVcXK/BmnVDxM+D2scQbITxI" crossorigin="anonymous"></script>
        </html>
    `);
    res.end();
});

// Diferentemente do método GET, que exigia do usuário a passagem de parâmetros por meio da url.
// Iremos nesta aula utilizar o método POST.
// O método cria um novo recurso no servidor (um registro, uma imagem, um comentário, etc).


// Poder enviar dados de um fornecedor usando um formulário HTML.
// A aplicação deverá entregar ou oferecer tal formulário HTML.

app.get("/fornecedor", (requisicao, resposta) => {
    resposta.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Formulário de cadastro de Fornecedor</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
            <body>
                <div class="container mt-5">
                    <form method="POST" action="/fornecedor" class="row gy-2 gx-3 align-items-center border p-3">
                        <legend>
                            <h3>Cadastro de Fornecedor</h3>
                        </legend>

                        <div class="row">
                            <label>CNPJ</label>
                            <input type="text" class="form-control" name="cnpj">
                        </div>

                        <div class="row">
                            <label>Razão Social</label>
                            <input type="text" class="form-control" name="razaoSocial">
                        </div>

                        <div class="row">
                            <label>Nome Fantasia</label>
                            <input type="text" class="form-control" name="nomeFantasia">
                        </div>

                        <div class="row">
                            <label>Endereço</label>
                            <input type="text" class="form-control" name="endereco">
                        </div>

                        <div class="row">
                            <label>Cidade</label>
                            <input type="text" class="form-control" name="cidade">
                        </div>

                        <div class="row">
                            <label>UF</label>
                            <input type="text" class="form-control" name="uf">
                        </div>

                        <div class="row">
                            <label>CEP</label>
                            <input type="text" class="form-control" name="cep">
                        </div>

                        <div class="row">
                            <label>Email</label>
                            <input type="email" class="form-control" name="email">
                        </div>

                        <div class="row">
                            <label>Telefone</label>
                            <input type="text" class="form-control" name="telefone">
                        </div>

                        <div class="row">
                            <button type="submit" class="btn btn-primary">Cadastrar Fornecedor</button>
                        </div>
                        </form>
                </div>
            </body>
        </html>
    `);
    resposta.end();
});

app.post("/fornecedor", (requisicao, resposta) => {

    const cnpj = requisicao.body.cnpj;
    const razaoSocial = requisicao.body.razaoSocial;
    const nomeFantasia = requisicao.body.nomeFantasia;
    const endereco = requisicao.body.endereco;
    const cidade = requisicao.body.cidade;
    const uf = requisicao.body.uf;
    const cep = requisicao.body.cep;
    const email = requisicao.body.email;
    const telefone = requisicao.body.telefone;

    if(!cnpj || !razaoSocial || !nomeFantasia || !endereco || !cidade || !uf || !cep || !email || !telefone) {

        let html = `
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Cadastro de Fornecedor</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
        <div class="container mt-5">
        <form method="POST" action="/fornecedor" class="row gy-2 gx-3 align-items-center border p-3">
        <legend><h3>Cadastro de Fornecedor</h3></legend>
        `;

        html += `<div class="row">
                    <label>CNPJ</label>
                    <input type="text" class="form-control" name="cnpj" value="${cnpj || ''}">
                 </div>`;
        if(!cnpj) { html += `<div class="alert alert-danger mt-2" role="alert">CNPJ é obrigatório!</div>`; }

        html += `<div class="row">
                    <label>Razão Social</label>
                    <input type="text" class="form-control" name="razaoSocial" value="${razaoSocial || ''}">
                 </div>`;
        if(!razaoSocial) { html += `<div class="alert alert-danger mt-2" role="alert">Razão Social é obrigatória!</div>`; }

        html += `<div class="row">
                    <label>Nome Fantasia</label>
                    <input type="text" class="form-control" name="nomeFantasia" value="${nomeFantasia || ''}">
                 </div>`;
        if(!nomeFantasia) { html += `<div class="alert alert-danger mt-2" role="alert">Nome Fantasia é obrigatório!</div>`; }

        html += `<div class="row">
                    <label>Endereço</label>
                    <input type="text" class="form-control" name="endereco" value="${endereco || ''}">
                 </div>`;
        if(!endereco) { html += `<div class="alert alert-danger mt-2" role="alert">Endereço é obrigatório!</div>`; }

        html += `<div class="row">
                    <label>Cidade</label>
                    <input type="text" class="form-control" name="cidade" value="${cidade || ''}">
                 </div>`;
        if(!cidade) { html += `<div class="alert alert-danger mt-2" role="alert">Cidade é obrigatória!</div>`; }

        html += `<div class="row">
                    <label>UF</label>
                    <input type="text" class="form-control" name="uf" value="${uf || ''}">
                 </div>`;
        if(!uf) { html += `<div class="alert alert-danger mt-2" role="alert">UF é obrigatória!</div>`; }

        html += `<div class="row">
                    <label>CEP</label>
                    <input type="text" class="form-control" name="cep" value="${cep || ''}">
                 </div>`;
        if(!cep) { html += `<div class="alert alert-danger mt-2" role="alert">CEP é obrigatório!</div>`; }

        html += `<div class="row">
                    <label>Email</label>
                    <input type="email" class="form-control" name="email" value="${email || ''}">
                 </div>`;
        if(!email) { html += `<div class="alert alert-danger mt-2" role="alert">Email é obrigatório!</div>`; }

        html += `<div class="row">
                    <label>Telefone</label>
                    <input type="text" class="form-control" name="telefone" value="${telefone || ''}">
                 </div>`;
        if(!telefone) { html += `<div class="alert alert-danger mt-2" role="alert">Telefone é obrigatório!</div>`; }

        html += `<div class="row">
                    <button type="submit" class="btn btn-primary">Cadastrar Fornecedor</button>
                 </div>
                 </form>
                 </div>
                 </body>
                 </html>`;

        resposta.write(html);
        resposta.end();

    } else {
        listaFornecedores.push({
            cnpj,
            razaoSocial,
            nomeFantasia,
            endereco,
            cidade,
            uf,
            cep,
            email,
            telefone
        });

        resposta.redirect("/listaFornecedores");
    }
});

app.get("/listaFornecedores", (requisicao, resposta) => {
    resposta.write(`
        <html lang="pt-br">
            <head>
                <meta charset="UTF-8">
                <title>Lista de Fornecedores</title>
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
            </head>
        <body>
            <div class="container mt-5">

        <table class="table table-striped">
            <thead>
                <tr>
                    <th>ID</th>
                    <th>CNPJ</th>
                    <th>Razão Social</th>
                    <th>Nome Fantasia</th>
                    <th>Cidade</th>
                </tr>
            </thead>
        <tbody>
    `);

    for(let i = 0; i < listaFornecedores.length; i++) {
        const fornecedor = listaFornecedores[i];

        resposta.write(`
        <tr>
            <td>${i+1}</td>
            <td>${fornecedor.cnpj}</td>
            <td>${fornecedor.razaoSocial}</td>
            <td>${fornecedor.nomeFantasia}</td>
            <td>${fornecedor.cidade}</td>
        </tr>
        `);
    }

    resposta.write(`
        </tbody>
        </table>

            <a href="/fornecedor" class="btn btn-primary">Continuar cadastrando</a>

            </div>
        </body>
        </html>
    `);

    resposta.end();
});

app.get("/login", (req, res) => {
    res.write(`
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h2>Login</h2>
                <form action="/login" method="POST">
                    <div class="mb-3">
                        <label for="username" class="form-label">Nome de usuário</label>
                        <input type="text" class="form-control" id="username" name="username">
                    </div>
                    <div class="mb-3">
                        <label for="password" class="form-label">Senha</label>
                        <input type="password" class="form-control" id="password" name="password">
                    </div>
                    <button type="submit" class="btn btn-primary">Entrar</button>
                </form>
            </div>
        </body>
    </html>
    `);
    res.end();
});

app.post("/login", (req, res) => {

    const username = req.body.username;
    const password = req.body.password;

    if(!username || !password) {
        let html = `
        <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
        <div class="container mt-5">
            <h2>Login</h2>
            <form action="/login" method="POST">
                <div class="mb-3">
                    <label>Nome de usuário</label>
                    <input type="text" class="form-control" name="username" value="${username || ''}">
        `;
        if(!username) html += `<div class="alert alert-danger mt-2" role="alert">Nome de usuário é obrigatório!</div>`;
        html += `</div>
                <div class="mb-3">
                    <label>Senha</label>
                    <input type="password" class="form-control" name="password" value="${password || ''}">
        `;
        if(!password) html += `<div class="alert alert-danger mt-2" role="alert">Senha é obrigatória!</div>`;
        html += `</div>
                <button type="submit" class="btn btn-primary">Entrar</button>
            </form>
        </div>
        </body>
        </html>
        `;
        res.write(html);
        res.end();
    } else {
        res.write(`
        <html lang="pt-br">
        <head><meta charset="UTF-8"><title>Login</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h2>Login realizado com sucesso!</h2>
                <a href="/" class="btn btn-primary mt-3">Voltar ao Menu</a>
            </div>
        </body>
        </html>
        `);
        res.end();
    }
});

app.get("/logout", (req, res) => {
    res.write(`
    <html lang="pt-br">
        <head>
            <meta charset="UTF-8">
            <title>Logout</title>
            <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.8/dist/css/bootstrap.min.css" rel="stylesheet">
        </head>
        <body>
            <div class="container mt-5">
                <h2>Logout efetuado com sucesso!</h2>
                <a href="/" class="btn btn-primary mt-3">Voltar ao Menu</a>
            </div>
        </body>
    </html>
    `);
    res.end();
});

app.listen(porta, host, () => {
    console.log(`Servidor rodando em http://${host}:${porta}`);
});