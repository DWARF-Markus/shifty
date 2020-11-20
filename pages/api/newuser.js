import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({log: ["query"]});

  if (req.method === 'POST') {
    
    try {
      const { user: userData } = req.body;
      const user = await prisma.employee.create({
        data: {
          firstName: userData.firstName,
          lastName: userData.lastName,
          email: userData.email,
          password: userData.password,
          profileImage: 'imagestring123' 
        }
      });
      res.status(201);
      res.json({response: 'Signed up!'});

    } catch (e) {
      res.status(500);
      res.json({error: e});
    } finally {
      await prisma.$disconnect();
    }

  } else if (req.method === 'GET') {
    
    const { user: userData } = req.body;
    console.log(userData.email);

    const result = await prisma.employee.findOne({
      where: {
        email: userData.email
      }
    });
    res.status(200);
    res.json({result});

  }
}

