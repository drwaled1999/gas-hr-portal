export type EmployeeRecord = {
  id: number;
  employeeCode: string;
  fullName: string;
  department: string;
  jobTitle: string;
  nationality: string;
  projectName: string;
  packageName: string;
  systemRole: string;
  annualRemaining: string;
  status: string;
  notes: string[];
};

const employeesStore: EmployeeRecord[] = [
  { id: 1, employeeCode: 'GAS-1182', fullName: 'Walid Khalaf', department: 'HR', jobTitle: 'HR Admin', nationality: 'Saudi', projectName: 'Zuluf', packageName: 'Package 12', systemRole: 'HR Admin', annualRemaining: '14 Days', status: 'Active', notes: ['Supports time sheet updates.'] },
  { id: 2, employeeCode: 'GAS-1450', fullName: 'Sara Khan', department: 'Admin', jobTitle: 'Admin Assistant', nationality: 'Non-Saudi', projectName: 'Operations Support', packageName: 'Package 08', systemRole: 'Admin Assistant', annualRemaining: '5 Days', status: 'Active', notes: ['Assigned to leave coordination support.'] }
];

export const employeesService = {
  getAll: () => employeesStore,
  getById: (id: number) => employeesStore.find((emp) => emp.id === id) || null,
  create(payload: Omit<EmployeeRecord, 'id'>) {
    const newEmployee: EmployeeRecord = { id: employeesStore.length + 1, ...payload };
    employeesStore.unshift(newEmployee);
    return newEmployee;
  },
  update(id: number, updates: Partial<EmployeeRecord>) {
    const employee = employeesStore.find((emp) => emp.id === id);
    if (!employee) return null;
    Object.assign(employee, updates);
    return employee;
  },
  addNote(id: number, note: string) {
    const employee = employeesStore.find((emp) => emp.id === id);
    if (!employee) return null;
    employee.notes.unshift(note);
    return employee;
  }
};
