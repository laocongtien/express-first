const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

var users = [
    {id: 1, name: "Tuan"},
    {id: 2, name: "Tu"}
];

app.get('/',function(req, res){
    res.render('index',{
        name: 'AAA'
    });
});

app.get('/users',function(req, res){
    res.render('users/index',{
        users: users
    });
});

app.get('/users/search', function(req, res){
    var query = req.query.q;
    var matchName = users.filter(function (user) {
        return user.name.toLowerCase().indexOf(query.toLowerCase()) != -1;
    })
    // console.log(req.query);
    res.render('users',{
        users: matchName,
        query: query
    })
})

app.listen(port, function(){
    console.log('Express listening in port: ' + port);
});