import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { data: shiftData } = req.body;

  try {
    const shift = await prisma.companyShiftEmployee.create({
      data: {
        Employees: { connect: { id: shiftData.employeeId } },
        CompanyShift: { connect: { id: shiftData.shiftId } }
      }
    })
    const notification = await prisma.companyEmployeeNotifications.create({
      data: {
        Employee: { connect: { id: shiftData.employeeId } },
        companyForeign: { connect: { id: shiftData.companyId } },
        adminMessage: `${shiftData.fullName} has been added to a shift on ${shiftData.shiftStart}`,
        employeeMessage: `You have been added to a shift on ${shiftData.shiftStart}`
      }
    })
    res.json({ response: shift, notification, status: 201 })
  } catch (e) {
    res.status(500);
    res.json({ error: e });
  } finally {
    await prisma.$disconnect();
  }
}
