import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({log: ["query"]});

  if (req.method === 'POST') {
    
    try {
      const { user: userData } = req.body;

      const user = await prisma.company.create({
        data: {
          name: userData.name,
          email: userData.email,
          password: userData.password
        }
      });
      res.status(201);
      res.json({user: 'Saved'});

    } catch (e) {
      const { user: userData } = req.body;
      console.log(userData);
      res.status(500);
      res.json({error: e});

    } finally {
      await prisma.$disconnect();
    }

  } else if (req.method === 'GET') {

    try {
      const users = await prisma.company.findMany();
      res.status(200);
      res.json({users});
    } catch (e) {
      res.status(500);
      res.json({ error: "Unable to find user." })
    } finally {
      prisma.$disconnect();
    }
  }
}

