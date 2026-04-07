export type AuditRecord = { employee: string; action: string; by: string; role: string; time: string; };
const auditStore: AuditRecord[] = [
  { employee: 'Ahmed Al Qahtani', action: 'Annual leave balance updated', by: 'Sara Khan', role: 'HR Admin', time: 'Today · 09:40 AM' },
  { employee: 'Walid Khalaf', action: 'Job title changed to HR Admin', by: 'Mohammed Faisal', role: 'HR Manager', time: 'Today · 08:15 AM' }
];
export const auditService = { getAll: () => auditStore };
