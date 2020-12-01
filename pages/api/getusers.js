import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { query, company } = req.query

  try {
    console.log(query);
    const result = await prisma.employee.findMany({
      where: {
        OR: [
          {
            firstName: {
              contains: query
            },
          },
          {
            lastName: {
              contains: query
            },
          },
          {
            email: {
              contains: query
            },
          },
        ]
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


}

