'use strict';

const Lab = require('lab');
const Code = require('code');
const Config = require('../../../config');
const Hapi = require('hapi');
const IndexPlugin = require('../../../src/api/home/index');


const lab = exports.lab = Lab.script();
let request;
let server;


lab.beforeEach((done) => {

    const plugins = [IndexPlugin];
    server = new Hapi.Server();
    server.connection({ port: Config.get('/port/api') });
    server.register(plugins, (err) => {

        if (err) {
            return done(err);
        }

        done();
    });
});


lab.experiment('Index Plugin', () => {

    lab.beforeEach((done) => {

        request = {
            method: 'GET',
            url: '/'
        };

        done();
    });


    lab.test('it returns the default message', (done) => {

        server.inject(request, (response) => {

            Code.expect(response.result.message).to.match(/welcome to the plot device/i);
            Code.expect(response.statusCode).to.equal(200);

            done();
        });
    });
});
