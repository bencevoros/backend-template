import { BarEnum } from "./bar.enum";
import { Foo } from "./foo.interface";
import { fooRepository } from "./foo.repository";

class FooService {
  getFoo(bar: BarEnum): Promise<Foo | undefined> {
    return fooRepository.findFoo(bar);
  }
  
  createFoo(foo: Foo): Promise<Foo> {
    return fooRepository.createFoo(foo);
  }

  updateFoo(_id: string, updates: Partial<Foo>): Promise<Foo> {
    return fooRepository.updateFoo(_id, updates);
  }

  deleteFoo(_id: string): Promise<void> {
    return fooRepository.deleteFoo(_id);
  }
}

export const fooService = new FooService();
