import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

async function main() {
  await prisma.user.createMany({
    data: [
      { fullName: 'Mohammed Faisal', email: 'hr.manager@gas.local', username: 'hrmanager', passwordHash: 'hashed-password', role: 'HR Manager', status: 'active' },
      { fullName: 'Walid Khalaf', email: 'walid@gas.local', username: 'walid', passwordHash: 'hashed-password', role: 'HR Admin', status: 'active' }
    ],
    skipDuplicates: true
  });

  await prisma.employee.createMany({
    data: [
      { employeeCode: 'GAS-1182', fullName: 'Walid Khalaf', department: 'HR', jobTitle: 'HR Admin', nationality: 'Saudi', projectName: 'Zuluf', packageName: 'Package 12', systemRole: 'HR Admin', annualRemaining: '14 Days', status: 'Active' },
      { employeeCode: 'GAS-1450', fullName: 'Sara Khan', department: 'Admin', jobTitle: 'Admin Assistant', nationality: 'Non-Saudi', projectName: 'Operations Support', packageName: 'Package 08', systemRole: 'Admin Assistant', annualRemaining: '5 Days', status: 'Active' }
    ],
    skipDuplicates: true
  });

  console.log('Seed completed successfully');
}

main().catch((error) => {
  console.error(error);
  process.exit(1);
}).finally(async () => {
  await prisma.$disconnect();
});
