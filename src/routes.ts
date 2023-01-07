import express from 'express';
import foo from './foo/foo.route';

const router = express.Router();

router.use('/foo', foo);

export default router;
