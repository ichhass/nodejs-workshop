/**
 * Created on 13.10.14.
 */
var supertest = require('supertest');
var fs = require('fs');
var server = require('../server');
var chat = require('../chat');

require('should');

describe("server", function() {

	var request;
	var file = fs.readFileSync('index.html');

	before(function() {
		server.listen()
		request = supertest(server);
	});

	describe("GET /index.html", function() {

		it("should return index.html", function(done) {
			request
			.get('/')
			.end(function(err, res) {
				if (err) done(err);
				res.text.should.eql(file);
			// Проверять файл не обязательно, достаточно стату
			})
			.expect(200, done);
		});

	});

	describe("GET /something", function() {

		it("should return 404 error", function(done) {
			request
				.get('/something')
				.expect(404, done);
		});

	});

	describe("GET /subscribe", function() {

		it("should get a message", function(done) {
			var message = 'message';

			var reqSubscribe = supertest(server);
			var reqPublish = supertest(server);

			reqSubscribe
				.get('/subscribe')
				.end(function(err, res) {
					if(err) done(err);
					res.text.should.equal(message);
					done();
				});

			setTimeout(function(){
				chat.getClientsLength().should.eql(1);
				reqPublish
					.post('/publish')
					.send(JSON.stringify({message: message}))
					.expect(200, function(err) {
						if(err) done (err);
					});
			}, 100);


		});

	});

	describe("POST /publish", function () {

		it("should return 400", function (done) {
			request
				.post('/publish')
				.send('blabla')
				.expect(400, done);
		})

	});

	describe("POST /publish bigdata", function () {

		it("should return 413", function (done) {
			request
				.post('/publish')
				.send(JSON.stringify({message: new Array(1e4+1).join('*')}))
				.expect(413, done);
		})

	})

});