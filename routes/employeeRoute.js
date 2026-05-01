import express from 'express';
import { createEmployee, getEmployeeById, updateEmployee, deleteEmployee } from '../controller/employeeController.js';
const router = express.Router();

router.post('/employee', createEmployee);
router.get('/employee/:id', getEmployeeById);
router.put('/employee/:id', updateEmployee);
router.delete('/employee/:id', deleteEmployee);

import { renderEmployeeProfile } from '../controller/employeeController.js';
router.get('/employee/profile/:id', renderEmployeeProfile);

export default router;