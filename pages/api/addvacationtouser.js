import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { data: vacationData } = req.body;

  try {
    const vacation = await prisma.employeeVacation.create({
      data: {
        Employee: { connect: { id: vacationData.employeeId } },
        dateStart: new Date(vacationData.startDate),
        dateEnd: new Date(vacationData.endDate),
        approved: false
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
