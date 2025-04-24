
import express from 'express';
import { body } from 'express-validator';
import { getTasks, getTaskById, createTask, updateTask, deleteTask } from '../controllers/taskController';
import { authenticate } from '../middlewares/auth';
import { authorize } from '../middlewares/authorize';
import validate from '../middlewares/validate';

const router = express.Router();

router.get('/', authenticate, authorize('view_task'), getTasks);
router.get('/:id', authenticate, authorize('view_task'), getTaskById);
router.post('/', authenticate, authorize('create_task'), createTask);
router.put('/:id', authenticate, authorize('edit_task'), updateTask);
router.delete('/:id', authenticate, authorize('delete_task'), deleteTask);

export default router;
