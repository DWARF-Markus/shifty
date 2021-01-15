import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  if (req.method === 'POST') {

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
  } else if (req.method === 'DELETE') {
    
    const { id } = req.query

    try {
      const result = await prisma.companyShift.delete({
        where: { id: parseInt(id) },
      })
      const resultTwo = await prisma.companyShiftEmployee.deleteMany({
        where: {
          companyShiftId: parseInt(id),
        },
      })
      res.json({ result, resultTwo, status: 200 });
    } catch (e) {
      res.status(500);
      res.json({ error: 'no user' });
    } finally {
      prisma.$disconnect()
    }
  }
  
}
