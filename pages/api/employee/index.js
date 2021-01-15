import { PrismaClient } from '@prisma/client';

const bcrypt = require('bcrypt');
const saltRounds = 10;

export default async function (req, res) {
  const prisma = new PrismaClient({log: ["query"]});

  if (req.method === 'POST') {
    const { employee: employeeData } = req.body;
  
    bcrypt.hash(employeeData.password, saltRounds, async function(err, hash) {
      try {
        const employee = await prisma.employee.create({
          data: {
            firstName: employeeData.firstName,
            lastName: employeeData.lastName,
            email: employeeData.email,
            password: hash,
            profileImage: '',
          }
        })
        res.json({response: employee.id, status: 201})
      } catch (e) {
        res.status(500);
        res.json({error: e});
      } finally {
        await prisma.$disconnect();
      }
    });
  } else if (req.method === 'PUT') {
    const { data: SubmitData } = req.body
  
    try {
      const result = await prisma.employee.update({
        where: { id: SubmitData.id },
        data: {
          firstName: SubmitData.firstName,
          lastName: SubmitData.lastName,
          profileImage: SubmitData.image
        }
      })
      res.status(200);
      res.json({ res: result, status: 200 });
    } catch (e) {
      res.status(500);
      res.json({ error: 'no user' });
    } finally {
      prisma.$disconnect()
    }
  }

}

