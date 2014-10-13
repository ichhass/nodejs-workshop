/**
 * Created on 14.10.14.
 */
var supertest = require('supertest');
var server = require('../server');

describe('server', function() {

	before(function() {
		server.listen();
		request = supertest(server);
	});

	describe('PUT /user', function() {

		it('should send 405 error', function(done) {
			request
				.put('/user')
				.expect(405, done);
		});

	})

	describe('GET /', function() {

		it('should send 400 error', function(done) {
			request
				.get('/')
				.expect(400, done);
		});

	});


});