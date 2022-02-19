const request = require('supertest');
const app = require('../app');
const paste = require('../models/paste');

const PASTE = 'This is some text';

jest.mock('../models/paste');

describe('POST /paste', () => {
  it('should create a post and return an id to access it', async () => {
    const response = await request(app)
      .post('/paste')
      .send({ data: PASTE });
    expect(response.statusCode).toBe(200);
    expect(response.type).toBe('application/json');
    expect(response.body.id).toMatch(/^[A-Za-z0-9]*$/);

    const storedPaste = paste.findByPk(response.body.id);
    expect(storedPaste.id).toBe(response.body.id);
    expect(storedPaste.data).toBe(PASTE);
    expect(storedPaste.expiresAt.getTime())
      .toBeLessThan(new Date(Date.now() + 15 * 60 * 1000).getTime());
  });
});
