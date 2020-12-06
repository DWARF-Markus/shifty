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
    res.json({ response: shift, status: 201 })
  } catch (e) {
    res.status(500);
    res.json({ error: e });
  } finally {
    await prisma.$disconnect();
  }
}
