const express  = require('express');
const MongoCliente = require('mongodb').MongoClient; //Conexão para o banco
const ObjectId = require('mongodb').ObjectId;
const uri = "mongodb+srv://douglasdb:121121@cluster0-2rsdh.mongodb.net/test?retryWrites=true"; //caminho para o banco adquirido no mongodb.com
const bodyParser = require('body-parser');//MIDDLEWARE PARA UTILIZAR OS DADOS DO FORMULÁRIO
const app = express();

//urlencoded EXTRAI OS DADOS DO ELEMENTO <FORM> A ADICIONA À PROPRIEDADE BODY NO OBJETO request
app.use(bodyParser.urlencoded({ extended: true }))


//INICIAR O SERVIDOR SOMENTRE QUANDO ESTIVER COM CONEXÃO AO BANCO
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


//EXIBIR TODOS OS DADOS EM UMA TABELA
app.get('/', (req, res) => {
    var cursor = db.collection('data').find(); //RETORNA UM OBJETO COM OS DADOS DA COLEÇÃO
});

app.get('/show', (req, res) =>{
    db.collection('data').find().toArray((err, results) => {
        if (err){
            return console.log(err);
        }

        res.render('show.ejs', { data: results });
    })
})

//SALVAR DADOS DO FORM
app.post('/show', (req, res) => {
    db.collection('data').insertOne(req.body, (err, result) => {
        if (err){
            return console.log(err);
        }

        console.log('Salvo no banco de dados');
        res.redirect('/show');
    });
});

//FAZER O PUT NO BANCO DE DADOS
app.route('/edit/:id').get((req, res) => {
    var id = req.params.id;

    db.collection('data').find(ObjectId(id)).toArray((err, result) => {
        if (err) {
            return console.log(err);
        }

        res.render('edit.ejs', { data: result });
    })
}).post((req, res) => {
    var id = req.params.id;
    var name = req.body.name;
    var surname = req.body.surname;

    db.collection('data').updateOne({ id: ObjectId(id) }, {
        $set: {
            name: name,
            surname: surname
        }
    }, (err, result) => {
        if (err){
            return console.log(err);
        }
        res.redirect('/show');
        console.log('Atualizado no banco com sucesso');
    })
})

//FAZER O DELETE DO OBJETO
app.route('/delete/:id').get((req, res) => {
    var id = req.params.id;

    db.collection('data').deleteOne({ id: ObjectId(id) }, (err, result) => {
        if (err){
            return res.send(500, err);
        }

        res.redirect('/show');
        console.log('Dado deletado com sucesso!');
    })
})
