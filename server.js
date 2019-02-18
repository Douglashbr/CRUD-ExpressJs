const express  = require('express')
const app = express()


//CHAMAR TEMPLATE ENGINE EJS(EMBEDDED JAVASCRIPT)

app.set('view engine', 'ejs')

app.listen(3000, function(){
    console.log('Server is runnig on port 3000')
})

//PRIMEIRO ARGUMENTO DO GET PEGA O CAMINHO NO QUAL O NAVEGADOR  ESTÁ ACESSANDO
/*
**SEGUNDO ARGUMENTO DO GET É UM CALLBACK QUE INFORMA O 
**SERVIDOR O QUE FAZER QUANDO FOR RESPONDIDO PELO NAVEGADOR
**ESSE CALLBACK CONTÉM 2 ARGUMENTOS: UMA REQUISIÇÃO E UMA RESPOSTA(req, res)
*/
app.get('/', (req, res) => {
    res.render('index.ejs')
})
