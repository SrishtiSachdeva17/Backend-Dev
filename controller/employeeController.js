export const getEmployeeById = (req, res) => {
	const { id } = req.params;
	const employee = employeeData.find(emp => emp.id.toString() === id);
	if (!employee) {
		return res.status(404).json({ error: 'Employee not found.' });
	}
	res.status(200).json(employee);
};

import { employeeData } from '../model/data.js';

export const renderEmployeeProfile = (req, res) => {
	const { id } = req.params;
	const employee = employeeData.find(emp => emp.id.toString() === id);
	if (!employee) {
		return res.status(404).render('profile', { error: 'Employee not found.' });
	}
	res.render('profile', { employee });
};

export const createEmployee = (req, res) => {
	const isJson = req.is('application/json');
	let { name, email, department, basicSalary, gender, startDate, salary } = req.body;

	if (isJson) {
		if (!name || !gender || !department || !salary || !startDate) {
			return res.status(400).json({ error: 'All fields are required.' });
		}
		const newEmployee = {
			id: Date.now().toString(),
			name,
			gender,
			department,
			salary,
			startDate
		};
		employeeData.push(newEmployee);
		return res.status(201).json(newEmployee);
	}

	if (!name || !email || !department || !basicSalary) {
		return res.status(400).render('employeeForm', { error: 'All fields are required.' });
	}
	const newEmployee = {
		id: Date.now(),
		name,
		email,
		department,
		basicSalary: Number(basicSalary)
	};
	employeeData.push(newEmployee);
	res.redirect('/');
};

export const getEmployee = (req, res) => {
	res.status(200).json(employeeData);
};

export const updateEmployee = (req, res) => {
	const { id } = req.params;
	let employee = employeeData.find(emp => emp.id.toString() === id || emp.id === Number(id));
	if (!employee) {
		if (req.is('application/x-www-form-urlencoded')) {
			return res.status(404).render('employeeEdit', { employee: null, error: 'Employee not found.' });
		}
		return res.status(404).json({ error: 'Employee not found.' });
	}
	const { name, email, department, basicSalary, gender, startDate, salary } = req.body;
	if (name) employee.name = name;
	if (email) employee.email = email;
	if (department) employee.department = department;
	if (basicSalary) employee.basicSalary = Number(basicSalary);
	if (gender) employee.gender = gender;
	if (salary) employee.salary = salary;
	if (startDate) employee.startDate = startDate;
	if (req.is('application/x-www-form-urlencoded')) {
		return res.redirect('/');
	}
	res.status(200).json(employee);
};

export const deleteEmployee = (req, res) => {
	const { id } = req.params;
	const index = employeeData.findIndex(emp => emp.id.toString() === id || emp.id === Number(id));
	if (index === -1) {
		if (req.is('application/x-www-form-urlencoded')) {
			return res.status(404).redirect('/');
		}
		return res.status(404).json({ error: 'Employee not found.' });
	}
	const deleted = employeeData.splice(index, 1);
	if (req.is('application/x-www-form-urlencoded')) {
		return res.redirect('/');
	}
	res.status(200).json({ message: 'Employee deleted.', employee: deleted[0] });
};