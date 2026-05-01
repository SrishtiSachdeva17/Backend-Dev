import express from 'express';
const router = express.Router();
import { renderEditPage, renderFormpage, renderHomePage } from '../controller/pageController.js';

router.get('/', renderHomePage);
router.get('/employee/add', renderFormpage);
router.get('/employee/edit/:id', renderEditPage);

export default router;