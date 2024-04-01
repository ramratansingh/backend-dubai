import { describe, it, expect } from 'jasmine';
import request from 'supertest';
import app from '../src/server'; // assuming your Express app instance is exported from server.ts

describe('API Routes', () => {
  it('GET / task data fetch', (done) => {
    request(app)
      .get('/tasks')
      .expect(200)
      .end((err, res) => {
        if (err) return done.fail(err);
        expect(res).to.have.status(201);
        done();
      });
  });

});
