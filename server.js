const express  = require('express');
const MongoCliente = require('mongodb').MongoClient; //Conexão para o banco
const uri = "mongodb+srv://douglasdb:121121@cluster0-2rsdh.mongodb.net/test?retryWrites=true"; //caminho para o banco adquirido no mongodb.com
const bodyParser = require('body-parser');//MIDDLEWARE PARA UTILIZAR OS DADOS DO FORMULÁRIO
const app = express();

//urlencoded EXTRAI OS DADOS DO ELEMENTO <FORM> A ADICIONA À PROPRIEDADE BODY NO OBJETO request
app.use(bodyParser.urlencoded({ extended: true }))

MongoCliente.connect(uri, (err, client) => {
    if (err){
        return console.log(err);
    }

    db = client.db('douglasdb');

    app.listen(3000, function(){
        console.log('Server is runnig on port 3000');
    });
});

//CHAMAR TEMPLATE ENGINE EJS(EMBEDDED JAVASCRIPT)
app.set('view engine', 'ejs');


/*
**PRIMEIRO ARGUMENTO DO GET PEGA O CAMINHO NO QUAL O NAVEGADOR  ESTÁ ACESSANDO
**SEGUNDO ARGUMENTO DO GET É UM CALLBACK QUE INFORMA O 
**SERVIDOR O QUE FAZER QUANDO FOR RESPONDIDO PELO NAVEGADOR
**ESSE CALLBACK CONTÉM 2 ARGUMENTOS: UMA REQUISIÇÃO E UMA RESPOSTA(req, res)
*/
app.get('/', (req, res) => {
    res.render('index.ejs');
});

app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err){
            return console.log(err);
        }

        console.log('Salvo no banco de dados');
        res.redirect('/');
    })
});
