const express = require('express');
const jwt = require('jsonwebtoken');
const app = express();
app.use(express.json());

app.get('/api', (req, res) => {
	res.json({
		text: 'api jwt'
	});
});

app.post('/api/login', (req, res) => {
	const { username,email,password } = req.body;
	const user = {
		username,
		email,
		password
    };
    
	const token = jwt.sign({ user }, 'geek');
	res.json({token});
});




app.get('/api/privada', verificarToken ,(req, res) => {
	jwt.verify(req.token, 'geek', (err, data) => {
		if(err) {
			res.sendStatus(403);
		} else {
			res.json({
				text: 'Bienvenido página privada!',
				data
			});
		}
	});
});

function verificarToken(req, res, next) {
	const bearerheader = req.headers["authorization"];
	console.log(bearerheader)
	if(typeof bearerheader !== 'undefined') {
		const bearer = bearerheader.split(" ");
		const bearerToken = bearer[1];
		req.token = bearerToken;
		next();
	} else {
		res.sendStatus(403);
	}
}


app.listen(3000, () => {
	console.log('jwt app corriendo en el puerto 3000!')
});
