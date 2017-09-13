var Home = require('./../models/home');

module.exports = function (app) {

	// api ---------------------------------------------------------------------
	// get all todos
	app.get('/api/find', function (req, res) {

		// use mongoose to get all todos in the database
		Home.find(function (err, todos) {

			// if there is an error retrieving, send the error. nothing after res.send(err) will execute
			if (err)
				res.send(err)

			res.json(todos); // return all todos in JSON format
		});
	});

	// create todo and send back all todos after creation
	app.post('/api/create', function (req, res) {

		// create a todo, information comes from AJAX request from Angular
		Home.create({
			text: req.body.text,
			done: false
		}, function (err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Home.find(function (err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});

	});

	// delete a todo
	app.delete('/api/delete/:todo_id', function (req, res) {
		Home.remove({
			_id: req.params.todo_id
		}, function (err, todo) {
			if (err)
				res.send(err);

			// get and return all the todos after you create another
			Home.find(function (err, todos) {
				if (err)
					res.send(err)
				res.json(todos);
			});
		});
	});

};