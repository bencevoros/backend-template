import request from 'supertest';
import { expressApp } from '../../index';
import { Foo } from './foo.interface';
import FooModel from './foo.model';

describe('/foo', () => {
  describe('GET', () => {
    describe('when params are wrong', () => {
      it('responds 400', async () => {
        const res = await request(expressApp)
        .get('/api/foo?bar=fooo')
        .send();
        
        expect(res.statusCode).toEqual(400);
      });
    });
    
    describe('when the params are correct', () => {
      describe('when foo does not exist', () => {
        beforeAll(async () => {
          await FooModel.deleteMany({ foo: 'foo' });
        });
        
        it('responds 404', async () => {
          const res = await request(expressApp)
            .get('/api/foo?bar=foo')
            .send();
      
          expect(res.statusCode).toEqual(404);
        });
      });

      describe('when foo exists', () => {
        beforeAll(async () => {
          await FooModel.create({ foo: 'foo' })
        });

        it('responds foo with status 200', async () => {
          const res = await request(expressApp)
            .get('/api/foo?bar=foo')
            .send();
      
          expect(res.statusCode).toEqual(200);
          expect(res.body._id).toBeTruthy();
          expect(res.body.foo).toEqual('foo');
        });
      });
    });
  });


  describe('POST', () => {
    describe('when params are wrong', () => {
      it('responds status 400', async () => {
        const res = await request(expressApp)
          .post('/api/foo')
          .send({ foo: 'bazz' });
    
        expect(res.statusCode).toEqual(400);
      });
    });

    describe('when the params are correct', () => {
      it('responds status 200 and the created foo', async () => {
        const res = await request(expressApp)
          .post('/api/foo')
          .send({ foo: 'baz' });
    
        expect(res.statusCode).toEqual(201);
    
        const createdFoo = await FooModel.findOne({ _id: res.body._id })
          .then((model) => (model && { _id: model._id, foo: model.foo }));
        expect(createdFoo).toBeTruthy();
      });
    });
  });

  describe('PATCH', () => {
    let createdFoo: Foo;
    beforeAll(async () => {
      createdFoo = await FooModel.create({ foo: 'baz' })
        .then((model) => ({ _id: model._id, foo: model.foo }));
    });

    describe('when params are wrong', () => {
      it('responds status 400', async () => {
        const res = await request(expressApp)
          .patch(`/api/foo/${createdFoo._id}`)
          .send({ foo: 'bazz' });

          expect(res.statusCode).toEqual(400);
      });
    });

    describe('when the params are correct', () => {
      describe('when foo exists', () => {
        it('responds status 200 and the updated foo', async () => {
          const res = await request(expressApp)
            .patch(`/api/foo/${createdFoo._id}`)
            .send({ foo: 'baz' });

            expect(res.statusCode).toEqual(200);

          const updatedFoo = await FooModel.findOne({ _id: res.body._id })
            .then((model) => (model && { _id: model._id, foo: model.foo }));
          expect(updatedFoo?.foo).toEqual(res.body.foo);
        });
      });

      describe('when foo does not exist', () => {
        it('responds status 404', async () => {
          const wrongFooId = `63bbeaadb721a024f131a80b`;
          const res = await request(expressApp)
            .patch(`/api/foo/${wrongFooId}`)
            .send({ foo: 'baz' });

            expect(res.statusCode).toEqual(404);
        });
      });
    });
  });

  describe('DELETE', () => {
    let createdFoo: Foo;
    beforeAll(async () => {
      createdFoo = await FooModel.create({ foo: 'baz' })
        .then((model) => ({ _id: model._id, foo: model.foo }));
    });

    it('responds status 204 and deletes foo', async () => {
      const res = await request(expressApp)
        .delete(`/api/foo/${createdFoo._id}`)
        .send();

        expect(res.statusCode).toEqual(204);

      const deletedFoo = await FooModel.findOne({ _id: res.body._id });
      expect(deletedFoo).toEqual(null);
    });
  });
});
