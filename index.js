const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'pug');
app.set('views', './views');

app.get('/',function(req, res){
    res.render('index',{
        name: 'AAA'
    });
});

app.get('/users',function(req, res){
    res.render('users/index',{
        users:[
            {id: 1, name: "Tuan"},
            {id: 2, name: "Tu"}
        ]
    });
});

app.listen(port, function(){
    console.log('Express listening in port: ' + port);
});