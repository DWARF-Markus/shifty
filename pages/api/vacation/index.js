import { PrismaClient } from '@prisma/client';
import { format } from 'date-fns';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { data: vacationData } = req.body;

  if (req.method === 'POST') {
    try {
      const vacation = await prisma.employeeVacation.create({
        data: {
          Employee: { connect: { id: vacationData.employeeId } },
          dateStart: new Date(vacationData.startDate),
          dateEnd: new Date(vacationData.endDate),
          approved: false
        }
      })

      const notification = await prisma.companyEmployeeNotifications.create({
        data: {
          Employee: { connect: { id: vacationData.employeeId } },
          companyForeign: { connect: { id: vacationData.companyId } },
          adminMessage: `${vacationData.fullName} has requested a vacation from ${format(new Date(vacationData.startDate), 'dd. MMM yyyy')} to ${format(new Date(vacationData.endDate), 'dd. MMM yyyy')}`,
          employeeMessage: `You have requested a vacation from ${format(new Date(vacationData.startDate), 'dd. MMM yyyy')} to ${format(new Date(vacationData.endDate), 'dd. MMM yyyy')}`
        }
      })

      res.json({ response: vacation, notification, status: 201 })
    } catch (e) {
      res.status(500);
      res.json({ error: e });
    } finally {
      await prisma.$disconnect();
    }
  }
}
