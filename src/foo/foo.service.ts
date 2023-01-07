import { BarEnum } from "./bar.enum";
import { Foo } from "./foo.interface";
import { findFoo } from "./foo.repository";

export const getFoo = (bar: BarEnum): Promise<Foo | undefined> => {
  return findFoo(bar);
};
