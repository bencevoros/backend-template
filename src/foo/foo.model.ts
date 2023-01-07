import mongoose from 'mongoose';
import { BarEnum } from './bar.enum';
import { Foo } from './foo.interface';

const FooSchema = new mongoose.Schema<Foo>({
  foo: {
    type: String,
    enum: BarEnum,
    required: true
  },
});

const FooModel = mongoose.model('foo', FooSchema);

export default FooModel;
