export type PermissionRecord = { employeeId: string; teamMember: string; role: string; permissions: string[]; };
const permissionsStore: PermissionRecord[] = [
  { employeeId: 'GAS-1182', teamMember: 'Walid Khalaf', role: 'HR Admin', permissions: ['View Dashboard','View Employees','Add Employee','View Leave Records','Add Notes','Export Reports','View Notifications'] }
];
export const permissionsService = {
  getAll: () => permissionsStore,
  save(record: PermissionRecord) {
    const index = permissionsStore.findIndex((item) => item.employeeId === record.employeeId);
    if (index >= 0) permissionsStore[index] = record; else permissionsStore.unshift(record);
    return record;
  }
};
