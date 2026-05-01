const express = require('express');
const app = express();
const port = 3001;

const employees = [
    { id: 101, name: "Alice Smith", department: "Engineering" },
    { id: 102, name: "Bob Jones", department: "Marketing" },
    { id: 103, name: "Charlie Brown", department: "Sales" },
    { id: 104, name: "Diana Prince", department: "Engineering" },
    { id: 105, name: "Alice Johnson", department: "HR" }
];

app.get('/', (req, res) => {
    res.send('<h1>Employee Directory</h1><p>Go to <code>/employees?name=Alice</code> to search for an employee by name.</p>');
});

app.get('/employees', (req, res) => {
    const searchName = req.query.name;
    
    if (!searchName) {
        return res.json(employees);
    }

    const filteredEmployees = employees.filter(emp => 
        emp.name.toLowerCase().includes(searchName.toLowerCase())
    );

    if (filteredEmployees.length === 0) {
        return res.status(404).json({ message: "No employees found matching that name." });
    }

    res.json(filteredEmployees);
});

app.listen(port, () => {
    console.log(`Exercise 1 server running at http://localhost:${port}`);
});
