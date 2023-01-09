import { NextFunction, Request, Response } from 'express';
import { BarEnum } from './bar.enum';
import { Foo } from './foo.interface';
import { fooService } from './foo.service';

class FooController {
  async handleGetFoo(request: Request, response: Response, next: NextFunction) {
    const bar = request.query.bar as BarEnum;
    if (!bar || typeof bar !== 'string' || !Object.values(BarEnum).includes(bar)) {
      return response.status(400).send({ error: 'Bar param is missing or not valid.' });
    }

    try {
      const result: Foo | undefined = await fooService.getFoo(bar);
      if (result) {
        return response.status(200).send(result);
      }

      response.sendStatus(404);
    } catch (error) {
      next(error);
    }
  }

  async handlePostFoo(request: Request, response: Response, next: NextFunction) {
    const foo: Foo = request.body;
    if (!foo || typeof foo !== 'object' || !Object.values(BarEnum).includes(foo.foo)) {
      return response.status(400).send({ error: 'Bar param is missing or not valid.' });
    }

    try {
      const createdFoo = await fooService.createFoo(foo);
      response.status(201).send(createdFoo);
    } catch (error) {
      next(error);
    }
  }

  async handlePatchFoo(request: Request, response: Response, next: NextFunction) {
    const _id: string = request.params._id;
    const updates: Partial<Foo> = request.body;
    if (
      !updates ||
      typeof updates !== 'object' ||
      (updates.foo && !Object.values(BarEnum).includes(updates.foo))
    ) {
      return response.status(400).send({ error: 'Bar param is missing or not valid.' });
    }

    try {
      const updatedFoo = await fooService.updateFoo(_id, updates);
      response.status(200).send(updatedFoo);
    } catch (error) {
      next(error);
    }
  }

  async handleDeleteFoo(request: Request, response: Response, next: NextFunction) {
    const _id: string = request.params._id;
    
    try {
      await fooService.deleteFoo(_id);
      response.sendStatus(204);
    } catch (error) {
      next(error);
    }
  }
}

export const fooController = new FooController();
