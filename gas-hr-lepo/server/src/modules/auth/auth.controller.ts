import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';

const demoUsers = [
  {
    id: 1,
    username: 'hrmanager',
    password: '123456',
    fullName: 'Mohammed Faisal',
    role: 'HR Manager',
    permissions: ['View Dashboard','View Employees','Add Employee','Edit Employee','View Leave Records','Add Notes','Export Reports','View Notifications','Edit Project / Package','View Audit Log']
  },
  {
    id: 2,
    username: 'walid',
    password: '123456',
    fullName: 'Walid Khalaf',
    role: 'HR Admin',
    permissions: ['View Dashboard','View Employees','Add Employee','View Leave Records','Add Notes','Export Reports']
  }
];

export const authController = {
  login(req: Request, res: Response) {
    const { username, password } = req.body;
    const user = demoUsers.find((u) => u.username === username && u.password === password);
    if (!user) return res.status(401).json({ message: 'Invalid username or password' });

    const token = jwt.sign({
      id: user.id,
      fullName: user.fullName,
      role: user.role,
      permissions: user.permissions
    }, process.env.JWT_SECRET || 'secret', { expiresIn: '8h' });

    return res.json({ message: 'Login successful', token, user: {
      id: user.id, fullName: user.fullName, role: user.role, permissions: user.permissions
    }});
  }
};
