import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

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

