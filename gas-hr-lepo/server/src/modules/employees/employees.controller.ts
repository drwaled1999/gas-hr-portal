import { Request, Response } from 'express';
import { employeesService } from './employees.service';

export const employeesController = {
  getAll(_req: Request, res: Response) {
    return res.json(employeesService.getAll());
  },
  getOne(req: Request, res: Response) {
    const employee = employeesService.getById(Number(req.params.id));
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    return res.json(employee);
  },
  create(req: Request, res: Response) {
    const employee = employeesService.create(req.body);
    return res.status(201).json({ message: 'Employee created successfully', data: employee });
  },
  update(req: Request, res: Response) {
    const employee = employeesService.update(Number(req.params.id), req.body);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    return res.json({ message: 'Employee updated successfully', data: employee });
  },
  addNote(req: Request, res: Response) {
    const employee = employeesService.addNote(Number(req.params.id), req.body.note);
    if (!employee) return res.status(404).json({ message: 'Employee not found' });
    return res.status(201).json({ message: 'Note added successfully', data: employee });
  }
};
