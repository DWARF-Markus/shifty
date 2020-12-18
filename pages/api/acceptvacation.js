import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { id, employeeId, companyId, firstName, lastName } = req.query;

  try {
    const result = await prisma.employeeVacation.update({
      where: { id: parseInt(id) },
      data: {
        approved: true
      }
    })

    const notification = await prisma.companyEmployeeNotifications.create({
      data: {
        Employee: { connect: { id: parseInt(employeeId) } },
        companyForeign: { connect: { id: parseInt(companyId) } },
        adminMessage: `You have accepted the vacation request from ${firstName} ${lastName}.`,
        employeeMessage: `Your vacation request has been accepted.`
      }
    })

    res.json({ result, notification, status: 200 });
  } catch (e) {
    res.status(500);
    res.json({ error: 'no vacation' });
  } finally {
    prisma.$disconnect()
  }
}

