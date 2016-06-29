'use strict';
require('env2')('config.env');
const tape = require('tape');
const server = require('../../lib/server.js');

tape('going to the login route should render login view', (t) => {
  t.plan(2);

  server.inject({ url: '/login', method: 'GET' }, (res) => {
    let actual = res.statusCode;
    let expected = 200;
    t.equals(actual, expected, '200 correct status code');

    actual = res.payload.indexOf('form') > -1;
    expected = true;
    t.equals(actual, expected, 'login view received');
  });
});

tape('entering a username and password via the login route', (t) => {
  t.plan(5);

  const goodCredentialsRequest = {
    url: '/login',
    method: 'post',
    payload: {
      email: process.env.FAKE_EMAIL,
      password: process.env.FAKE_PASSWORD
    }
  };

  server.inject(goodCredentialsRequest, (res) => {
    let actual = typeof res.payload;
    let expected = 'string';
    t.equals(actual, expected, 'got a response');

    actual = res.payload;
    expected = 'good credentials';
    t.equals(actual, expected, 'entering correct username and password replies with good credentials response');
  });

  const badCredentialsRequest = {
    url: '/login',
    method: 'post',
    payload: {
      email: 'incorrect@password123.com',
      password: '123456789'
    }
  };

  server.inject(badCredentialsRequest, (res) => {
    let actual = typeof res.payload;
    let expected = 'string';
    t.equals(actual, expected, 'got a response');

    actual = res.payload;
    expected = 'bad credentials';
    t.equals(actual, expected, 'entering incorrect username and password replies with bad credentials response');
  });

  const invalidCredentialsRequest = {
    url: '/login',
    method: 'post',
    payload: {
      email: 'bademail.com',
      password: '123456789'
    }
  };

  server.inject(invalidCredentialsRequest, (res) => {
    const actual = JSON.parse(res.payload).statusCode;
    const expected = 400;
    t.equals(actual, expected, 'entering an invalid email is caught by joi');
  });
});

tape('teardown', (t) => {
  server.stop((err) => {
    if (err) console.log('Termination error: ' + err);
  });
  t.end();
});
