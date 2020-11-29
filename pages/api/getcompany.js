import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { company: companyData } = req.body;

  try {
    const company = await prisma.company.findOne({
      where: {
        email: companyData.email
      }
    });

    if (company) {
      console.log('company');
      res.status(200);
      res.json({ company, isAdmin: true });
    } else {
      console.log('employee');
      const company = await prisma.employee.findOne({
        where: {
          email: companyData.email
        }
      });

      res.status(200);
      res.json({ company, isAdmin: false });
    }

  } catch (e) {
    res.status(500);
    res.json({ error: 'no user' });
  } finally {
    prisma.$disconnect()
  }

}

