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

const todosList = []
const compList = []

app.get('/', (req, resp) => {
  resp.render('home', { todosList: todosList } );
})

app.get('/', (req, resp) => {
  resp.render('home', { compList: compList } )
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
    req
    .checkBody("done")
  compList.push(req.params.done)
  console.log("params: " + req.body.done)
  console.log("going to compList: " + req.params.done)
  resp.redirect('/')
})



// const todos = [
//   "Wash the car"
// ];
//
// app.get("/", function (req, res) {
//   res.render('index', { todos: todos });
// });
//
// app.post("/", function (req, res) {
//   todos.push(req.body.todo);
//   res.redirect('/');
// })




app.listen(3000, () => {
  console.log("Magic is happening on port 3000")
});
