//importando a biblioteca
const express = require("express")
const app = express()

//agora a API aceita JSON
app.use(express.json())

const livros = [
    {id: 1, titulo:"Dom Casmurro", autor:"Machado de Assis"},
    {id: 2, titulo: "Vidas Secas", autor: "Graciliano Ramos"}
]

let proximoId = 3
//req= requisição,guarda itens     res= resposta
//listar todos os livros
app.get("/livros", (req, res) => {
    res.json(livros)
})

//criar livro
app.post("/livros", (req,res) => {
    const {titulo, autor} = req.body

    //se nao for informado titulo ou autor da erro
    //exclamaçao é negacao
    if(!titulo || !autor){
        return res.status(400).json({error: "titulo autor obrigatórios"})
    }

    const novoLivro = {
        id: proximoId,
        titulo,
        autor
    }

    livros.push(novoLivro)
    proximoId++
    res.status(201).json(novoLivro) //status 201 = CREATED
})

app.get("/livros/:id", (req, res) => {
    const idInformado = req.params.id

    const livro = livros.find(li => li.id === Number(idInformado))

    if(!livro){
        return res.status(404).json({error: "Livro não encontrado"})
    }

    res.json(livro)
})

app.listen(3000, () => console.log("API rodando em localhost:3000"))