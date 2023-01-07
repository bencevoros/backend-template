import express from 'express';
import { handleGetFoo } from './foo.controller';

const router = express.Router();

router.get('/', handleGetFoo);

export default router;