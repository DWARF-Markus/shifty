import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { id } = req.query

  try {
    const result = await prisma.employeeVacation.update({
      where: { id: parseInt(id) },
      data: {
        approved: true
      }
    })
    res.json({ result, status: 200 });
  } catch (e) {
    res.status(500);
    res.json({ error: 'no vacation' });
  } finally {
    prisma.$disconnect()
  }
}

