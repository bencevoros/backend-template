import { BarEnum } from "./bar.enum";
import { Foo } from "./foo.interface";
import FooModel from "./foo.model";

export const findFoo = (bar: BarEnum): Promise<Foo | undefined> => {
  return FooModel.findOne({ foo: bar })
    .then((model) => {
      if (model) {
        return { foo: model.foo };
      }

      return undefined;
    });
};
