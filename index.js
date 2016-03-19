var app = require('express')();


app.get('/foo', function(req, res, next){
	if (Math.random() < 0.5) {next()};

	res.send('sometimes this');
});

app.get('/foo', function(req, res){
	res.send('and sometimes that');
});

app.get('/eoo', function(req, res){
	if (Math.random() < 0.33) {return next();};
	res.send('red');
},
function(req, res, next){
	if (Math.random()<0.5) {return next();};
	res.send('green');
},
function(req, res){
	res.send('blue');
});

app.listen(3000, function(){
	console.log('监听端口3000');
})