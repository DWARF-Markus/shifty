import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  if (req.method === 'GET') {
    const { company } = req.query;
  
    try {
      const result = await prisma.employee.findMany({
        where: {
          companyId: parseInt(company)
        },
        include: {
          EmployeeVacation: true
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
  } else if (req.method === 'DELETE') {
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

}

