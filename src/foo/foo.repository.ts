import { NotFoundError } from "../shared/errors/not-found.error";
import { BarEnum } from "./bar.enum";
import { Foo } from "./foo.interface";
import FooModel from "./foo.model";

class FooRepository {
  findFoo(bar: BarEnum): Promise<Foo | undefined> {
    return FooModel.findOne({ foo: bar })
      .then((model) => {
        if (model) {
          return { _id: model._id, foo: model.foo };
        }
  
        return undefined;
      });
  }
  
  createFoo(foo: Foo): Promise<Foo> {
    return FooModel.create(foo)
      .then((model) => {
        return { _id: model._id, foo: model.foo };
      });
  }
  
  updateFoo(_id: string, updates: Partial<Foo>): Promise<Foo> {
    return FooModel.findOneAndUpdate({ _id }, updates)
      .then((model) => {
        if (!model) {
          throw new NotFoundError('Foo is not found');
        }
        return { _id: model._id, foo: model.foo };
      });
  }

  async deleteFoo(_id: string): Promise<void> {
    await FooModel.findOneAndDelete({ _id });
  }
}

export const fooRepository = new FooRepository();
