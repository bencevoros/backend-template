import request from 'supertest';
import { expressApp } from '../../index';

describe('/foo', () => {
  it('GET', async () => {
    const res = await request(expressApp)
      .get('/api/foo?bar=bar')
      .send()
    expect(res.statusCode).toEqual(404);
  });
})