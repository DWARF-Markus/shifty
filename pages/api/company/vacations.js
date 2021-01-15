import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { id } = req.query;

  try {
    const vacation = await prisma.employeeVacation.findMany({
      orderBy: {
        dateStart: 'asc',
      },
      where: {
        Employee: {
          companyId: parseInt(id)
        }
      },
      include: {
        Employee: {
          select: {
            id: true,
            firstName: true,
            lastName: true,
            profileImage: true,
            companyId: true,
          }
        }
      }
    })
    res.json({ response: vacation, status: 201 })
  } catch (e) {
    res.status(500);
    res.json({ error: e });
  } finally {
    await prisma.$disconnect();
  }
}
