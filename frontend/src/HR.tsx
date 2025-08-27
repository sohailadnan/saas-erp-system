import React, { useState, useEffect } from 'react';

interface Employee {
  id: string;
  name: string;
  position: string;
  department: string;
}

const API_BASE_URL = 'http://localhost:8000'; // Gateway URL

const HR: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [name, setName] = useState('');
  const [position, setPosition] = useState('');
  const [department, setDepartment] = useState('');
  const [error, setError] = useState<string | null>(null);

  const fetchEmployees = async () => {
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (response.ok) {
        setEmployees(data);
      } else {
        setError(data.error || 'Failed to fetch employees.');
      }
    } catch (err) {
      setError('Network error or HR service is unreachable.');
    }
  };

  useEffect(() => {
    fetchEmployees();
  }, []);

  const handleAddEmployee = async (event: React.FormEvent) => {
    event.preventDefault();
    setError(null);
    const token = localStorage.getItem('token');
    if (!token) {
      setError('No authentication token found. Please log in.');
      return;
    }

    try {
      const response = await fetch(`${API_BASE_URL}/employees`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, position, department }),
      });
      const data = await response.json();
      if (response.ok) {
        setEmployees([...employees, data]);
        setName('');
        setPosition('');
        setDepartment('');
      } else {
        setError(data.error || 'Failed to add employee.');
      }
    } catch (err) {
      setError('Network error or HR service is unreachable.');
    }
  };

  return (
    <div>
      <h1>HR Page</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      <h2>Add New Employee</h2>
      <form onSubmit={handleAddEmployee}>
        <div>
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="position">Position:</label>
          <input
            type="text"
            id="position"
            value={position}
            onChange={(e) => setPosition(e.target.value)}
            required
          />
        </div>
        <div>
          <label htmlFor="department">Department:</label>
          <input
            type="text"
            id="department"
            value={department}
            onChange={(e) => setDepartment(e.target.value)}
            required
          />
        </div>
        <button type="submit">Add Employee</button>
      </form>

      <h2>Employees</h2>
      {employees.length === 0 ? (
        <p>No employees found.</p>
      ) : (
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Position</th>
              <th>Department</th>
            </tr>
          </thead>
          <tbody>
            {employees.map((employee) => (
              <tr key={employee.id}>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
                <td>{employee.position}</td>
                <td>{employee.department}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default HR;
