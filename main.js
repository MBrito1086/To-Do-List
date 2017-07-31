const express = require('express')
const mustacheExpress = require('mustache-express')
const bodyParser = require('body-parser')
const expressValidator = require('express-validator')
const expressSession = require('express-session')

const app = express()

app.engine('mst', mustacheExpress())
app.set('views', './views')
app.set('view engine', 'mst')

app.use(express.static('public'))

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use(expressValidator())

app.use(
  expressSession({
    secret: 'keyboard dog',
    resave: false,
    saveUninitialized: true
  })
)

// const todoList
//
// const todosList = []
// const compList = []

app.get('/', (req, resp) => {

  const todoList = req.session.todoList || []

  const templateData = {
    uncompleted: todoList.filter(todo => !todo.completed),
    completed: todoList.filter(todo => todo.completed)
  }

  resp.render('home', templateData );
})


app.post('/', (req, resp) => {

  const todoList = req.session.todoList || []

  const newTodo = req.body.todo

  // req
  //   .checkBody("todo", "You must add a To Do")
  //   .notEmpty();

  // const errors = req.validationErrors()

  // if (errors) {
  //   resp.send("Nothing To Do")
  // } else {
    todoList.push({ id: todoList.length + 1, completed: false, todo: newTodo })
  // }

  req.session.todoList = todoList

  resp.redirect('/')
})

app.post('/markCom', (req, resp) => {

  // req
  //   .checkBody("done")
  const todoList = req.session.todoList || []

  const id = parseInt(req.body.id)

  const todo = todoList.find(todo => todo.id === id)

  if (todo) {
     todo.completed = true

     req.session.todoList = todoList
  }
//
// const indexof = todosList.indexOf(req.body.done)
// todosList.splice(indexof, 1)

  resp.redirect('/')
})


app.listen(3000, () => {
  console.log("Magic is happening on port 3000")
});
