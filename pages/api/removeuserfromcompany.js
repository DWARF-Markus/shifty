import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { id } = req.query

  try {
    const result = await prisma.employee.update({
      where: { id: parseInt(id) },
      data: {
        companyForeign: {
          disconnect: true
        },
        acceptedCompanyDateTime: null,
        acceptedCompany: false
      }
    })
    res.json({ result, status: 200 });
  } catch (e) {
    res.status(500);
    res.json({ error: 'no user' });
  } finally {
    prisma.$disconnect()
  }
}

