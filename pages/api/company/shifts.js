import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { company } = req.query;

  try {
    const result = await prisma.companyShift.findMany({
      orderBy: {
        startTime: 'asc',
      },
      where: {
        companyId: parseInt(company)
      },
      include: {
        CompanyShiftEmployee: true,
      },
    });
    res.status(200);
    res.json({ result });
  } catch (e) {
    res.status(500);
    res.json({ error: 'no shifts' });
  } finally {
    prisma.$disconnect()
  }

}

