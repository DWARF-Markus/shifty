import { PrismaClient } from '@prisma/client';

const bcrypt = require('bcrypt');
const saltRounds = 10;

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { company: companyData } = req.body;

  bcrypt.hash(companyData.password, saltRounds, async function (err, hash) {
    try {
      const company = await prisma.company.create({
        data: {
          name: companyData.name,
          email: companyData.email,
          password: hash,
          days: companyData.days,
          profileImage: '',
          CompanySize: {
            create: [
              { size: companyData.size }
            ]
          },
          CompanyType: {
            create: [
              { type: companyData.type }
            ]
          }
        }
      })
      res.json({ response: company.id, status: 201 })
    } catch (e) {
      res.status(500);
      res.json({ error: e });
    } finally {
      await prisma.$disconnect();
    }
  });
}
