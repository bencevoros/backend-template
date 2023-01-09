import { jest } from '@jest/globals';
import FooModel from '../src/foo/foo.model';

global.jest = jest;

afterAll(() => {
  FooModel.collection.drop();
});
