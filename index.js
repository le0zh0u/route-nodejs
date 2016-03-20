var app = require('express')();

function authorize(req, res ,next){
	if (req.session.authorized) {return next();};
	res.render('not-authorized');
};
app.get('/secret',authorize, function(){
	res.render('secret');
});
app.get('/sub-rosa',authorize, function(){
	res.render('sub-rosa');
});

app.get('/foo', function(req, res, next){
	if (Math.random() < 0.5) {next()};

	res.send('sometimes this');
});

app.get('/foo', function(req, res){
	res.send('and sometimes that');
});

app.get('/eoo', function(req, res, next){
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

//路由参数
var staff = {
	portland:{
		mitch: {bio: 'Mitch is the man to have at your back in a bar fight.'},
		madeline: {bio: 'Madeline is out Oregon expert.'},
	},
	bend:{
		walt:{bio: 'Walt is our Oregon Coast expert.'},
	},
};

app.get('/staff/:city/:name',function(req, res, next){
	var info = staff[req.params.city][req.params.name];
	if (!info) {return next();};
	res.send('staffer',info);
});

app.use(function(req, res){
	res.send("404");
});

app.listen(3000, function(){
	console.log('监听端口3000');
})