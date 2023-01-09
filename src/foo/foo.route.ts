import express from 'express';
import { fooController } from './foo.controller';

const router = express.Router();

router.get('/', fooController.handleGetFoo);
router.post('/', fooController.handlePostFoo);
router.patch('/:_id', fooController.handlePatchFoo);
router.delete('/:_id', fooController.handleDeleteFoo);

export default router;