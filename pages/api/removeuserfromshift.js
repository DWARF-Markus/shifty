import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { employeeId, shiftId } = req.query

  try {
    const result = await prisma.companyShiftEmployee.deleteMany({
      where: {
        AND: [
          {
            employeeId: parseInt(employeeId),
          },
          {
            companyShiftId: parseInt(shiftId),
          }
        ]
      }
    })
    res.json({ result, status: 200 });
  } catch (e) {
    res.status(500);
    res.json({ error: 'no shift' });
  } finally {
    prisma.$disconnect()
  }
}






