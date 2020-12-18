import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { id, type } = req.query;

  try {
    if (type === 'admin') {
      const result = await prisma.companyEmployeeNotifications.updateMany({
        where: { companyId: parseInt(id) },
        data: { adminActive: false },
      })
    } else {
      const result = await prisma.companyEmployeeNotifications.updateMany({
        where: { employeeId: parseInt(id) },
        data: { EmployeeActive: false },
      })
    }
    res.json({ result, type, status: 200 });
  } catch (e) {
    res.status(500);
    res.json({ error: 'no user' });
  } finally {
    prisma.$disconnect()
  }
}

