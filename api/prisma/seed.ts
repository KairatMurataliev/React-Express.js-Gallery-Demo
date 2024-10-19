import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

async function up() {
  const user1 = await prisma.user.create({
    data: {
      username: 'Simple User',
      email: 'user1@test.com',
      password: hashSync('123', 10),
      role: 'USER'
    }
  });
  const user2 = await prisma.user.create({
    data: {
      username: 'Simple User',
      email: 'user2@test.com',
      password: hashSync('123', 10),
      role: 'USER'
    }
  });
  const admin = await prisma.user.create({
    data: {
      username: 'Admin Admin',
      email: 'admin@test.com',
      password: hashSync('123', 10),
      role: 'ADMIN',
    }
  });

  const natureCategory = await prisma.category.create({
    data: {
      name: 'Nature',
    }
  });
  const animeCategory = await prisma.category.create({
    data: {
      name: 'Anime',
    }
  });
  const militaryCategory = await prisma.category.create({
    data: {
      name: 'Military',
    }
  });

  await prisma.photo.createMany({
    data: [
      {
        title: 'Photo 1',
        image: 'seed/photo1.jpg',
        description: 'Here is some photo description',
        authorId: user1.id,
        categoryId: natureCategory.id,
      },
      {
        title: 'Photo 2',
        image: 'seed/photo2.jpg',
        description: 'Here is some photo description',
        authorId: user1.id,
        categoryId: natureCategory.id,
      },
      {
        title: 'Photo 3',
        image: 'seed/photo3.jpg',
        description: 'Here is some photo description',
        authorId: user1.id,
        categoryId: natureCategory.id,
      },

      {
        title: 'Photo 1',
        image: 'seed/photo4.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: animeCategory.id
      },
      {
        title: 'Photo 2',
        image: 'seed/photo5.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: animeCategory.id
      },
      {
        title: 'Photo 3',
        image: 'seed/photo6.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: animeCategory.id
      },

      {
        title: 'Photo 1',
        image: 'seed/photo7.jpeg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: militaryCategory.id
      },
      {
        title: 'Photo 2',
        image: 'seed/photo8.jpg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: militaryCategory.id
      },
      {
        title: 'Photo 3',
        image: 'seed/photo9.jpg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: militaryCategory.id
      }
    ]
  })
}

async function down() {
  await prisma.$executeRaw`TRUNCATE TABLE "User" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Photo" RESTART IDENTITY CASCADE`;
  await prisma.$executeRaw`TRUNCATE TABLE "Category" RESTART IDENTITY CASCADE`;
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
