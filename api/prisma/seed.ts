import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

async function up() {
  const user1 = await prisma.user.create({
    username: 'Simple User',
    email: 'user1@test.com',
    password: hashSync('123', 10),
    role: 'USER'
  });

  const user2 = await prisma.user.create({
    username: 'Simple User',
    email: 'user2@test.com',
    password: hashSync('123', 10),
    role: 'USER'
  });

  const admin = await prisma.user.create({
    username: 'Admin Admin',
    email: 'admin@test.com',
    password: hashSync('123', 10),
    role: 'ADMIN',
  });

  await prisma.photo.createMany({
    data: [
      {
        title: 'Photo 1',
        image: 'fixtures/photo1.jpg',
        authorId: user1.id,
      },
      {
        title: 'Photo 2',
        image: 'fixtures/photo2.jpg',
        authorId: user1.id,
      },
      {
        title: 'Photo 3',
        image: 'fixtures/photo3.jpg',
        authorId: user1.id,
      },
      {
        title: 'Photo 1',
        image: 'fixtures/photo4.jpg',
        authorId: user2.id,
      },
      {
        title: 'Photo 2',
        image: 'fixtures/photo5.jpg',
        authorId: user2.id,
      },
      {
        title: 'Photo 3',
        image: 'fixtures/photo6.jpg',
        authorId: user2.id,
      },
      {
        title: 'Photo 1',
        image: 'fixtures/photo7.jpeg',
        authorId: admin.id,
      },
      {
        title: 'Photo 2',
        image: 'fixtures/photo8.jpg',
        authorId: admin.id,
      },
      {
        title: 'Photo 3',
        image: 'fixtures/photo9.jpg',
        authorId: admin.id,
      }
    ]
  })
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
}

async function main() {
  try {
    await down();
    await up();
  } catch (e) {
    console.error(e);
  }
}

main()
    .then(async () => {
      await prisma.$disconnect();
    })
    .catch(async (e) => {
      console.error(e);
      await prisma.$disconnect();
      process.exit(1);
    });
