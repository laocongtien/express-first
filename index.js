const express = require('express');
const app = express();
const port = 3000;
const low = require('lowdb')
const FileSync = require('lowdb/adapters/FileSync')
const adapter = new FileSync('db.json')
const db = low(adapter)

db.defaults({ users: [] })
  .write();

app.set('view engine', 'pug');
app.set('views', './views');
//config for app.post -> req.body
app.use(express.json()) // for parsing application/json
app.use(express.urlencoded({ extended: true })) // for parsing application/x-www-form-urlencoded

// var users = [
//     {id: 1, name: "Tuan"},
//     {id: 2, name: "Tu"}
// ];

app.get('/',function(req, res){
    res.render('index',{
        name: 'AAA'
    });
});

app.get('/users',function(req, res){
    res.render('users/index',{
        users: db.get('users').value()
    });
});

app.get('/users/search', function(req, res){
    var query = req.query.q;
    var matchName = db.get('users').value().filter(function (user) {
        return user.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
    });
    // console.log(req.query);
    res.render('users',{
        users: matchName,
        query: query
    });
})

app.get('/users/create', function (req, res) {
    res.render('users/create');
});

app.post('/users/create', function (req, res)    {
    // console.log(req.body);
    db.get('users').push(req.body).write();
    res.redirect('/users');
});

app.listen(port, function(){
    console.log('Express listening in port: ' + port);
});