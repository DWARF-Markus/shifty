import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { company } = req.query;

  try {
    const result = await prisma.employee.findMany({
      where: {
        companyId: parseInt(company)
      }
    });
    res.status(200);
    res.json({ result });
  } catch (e) {
    res.status(500);
    res.json({ error: 'no user' });
  } finally {
    prisma.$disconnect()
  }

}

