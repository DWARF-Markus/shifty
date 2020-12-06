import { PrismaClient } from '@prisma/client';

export default async function (req, res) {
  const prisma = new PrismaClient({ log: ["query"] });

  const { data: SubmitData } = req.body

  console.log(SubmitData);

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

