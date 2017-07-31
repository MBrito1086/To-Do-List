const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')

const app = express()

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(expressValidator())

// const todoList

const todosList = []
const compList = []

app.get('/', (req, resp) => {
  resp.render('home', { todosList: todosList, compList: compList } );
})


app.post('/', (req, resp) => {

  req
    .checkBody("todo", "You must add a To Do")
    .notEmpty();

  const errors = req.validationErrors()

  if (errors) {
    resp.send("Nothing To Do")
  } else {
    todosList.push(req.body.todo)
  }
  resp.redirect('/')
})

app.post('/markCom', (req, resp) => {

  // req
  //   .checkBody("done")

  compList.push(req.body.done)

const indexof = todosList.indexOf(req.body.done)
todosList.splice(indexof, 1)

  resp.redirect('/')
})


app.listen(3000, () => {
  console.log("Magic is happening on port 3000")
});
