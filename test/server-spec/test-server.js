const supertest = require('supertest');
const express = require('express');
const { expect } = require('chai').expect;

const server = require('../../server/server.js');

const request = supertest.agent(server);

describe('server', () => {
  it('passes first example test', (done) => {
    request
      .get('/testing')
      .expect(200, /GET request to testing/, done);
  });
});
