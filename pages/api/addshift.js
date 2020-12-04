import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { shift: shiftData } = req.body;

  try {
    const shift = await prisma.companyShift.create({
      data: {
        title: shiftData.title,
        startTime: new Date(shiftData.startTime),
        endTime: new Date(shiftData.endTime),
        employeeAmount: shiftData.employees,
        Company: { connect: { id: shiftData.company } }
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
