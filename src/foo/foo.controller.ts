import { Request, Response } from 'express';
import { BarEnum } from './bar.enum';
import { Foo } from './foo.interface';
import { getFoo } from './foo.service';

export const handleGetFoo = async (request: Request, response: Response) => {
  const bar = request.query.bar as BarEnum;
  if (!bar || typeof bar !== 'string' || !Object.values(BarEnum).includes(bar)) {
    return response.status(400).send({ error: 'Bar param is missing or not valid.' });
  }

  const result: Foo | undefined = await getFoo(bar);
  if (result) {
    response.status(200).send(result);
  }

  response.sendStatus(404);
};
