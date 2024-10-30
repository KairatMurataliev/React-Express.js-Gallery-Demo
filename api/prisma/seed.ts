import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';
import { generateToken } from "../src/utils/generateToken";

async function up() {
  const user1 = await prisma.user.create({
    data: {
      username: 'Simple User',
      email: 'user1@test.com',
      password: hashSync('123', 10),
      role: 'USER',
      token: generateToken(),
    }
  });
  const user2 = await prisma.user.create({
    data: {
      username: 'Simple User',
      email: 'user2@test.com',
      password: hashSync('123', 10),
      role: 'USER',
      token: generateToken(),
    }
  });
  const admin = await prisma.user.create({
    data: {
      username: 'Admin Admin',
      email: 'admin@test.com',
      password: hashSync('123', 10),
      role: 'ADMIN',
      token: generateToken(),
    }
  });

  const natureCategory = await prisma.category.create({
    data: {
      name: 'Nature',
      deleted: false,
    }
  });
  const animeCategory = await prisma.category.create({
    data: {
      name: 'Anime',
      deleted: false,
    }
  });
  const militaryCategory = await prisma.category.create({
    data: {
      name: 'Military',
      deleted: false,
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
        published: false
      },
      {
        title: 'Photo 2',
        image: 'seed/photo2.jpg',
        description: 'Here is some photo description',
        authorId: user1.id,
        categoryId: natureCategory.id,
        published: true
      },
      {
        title: 'Photo 3',
        image: 'seed/photo3.jpg',
        description: 'Here is some photo description',
        authorId: user1.id,
        categoryId: natureCategory.id,
        published: true
      },
      {
        title: 'Photo 4',
        image: 'seed/military1.jpg',
        description: 'Here is some photo description',
        authorId: user1.id,
        categoryId: militaryCategory.id,
        published: false
      },
      {
        title: 'Photo 5',
        image: 'seed/military2.jpg',
        description: 'Here is some photo description',
        authorId: user1.id,
        categoryId: militaryCategory.id,
        published: true
      },
      {
        title: 'Photo 6',
        image: 'seed/anime1.jpeg',
        description: 'Here is some photo description',
        authorId: user1.id,
        categoryId: animeCategory.id,
        published: true
      },
      {
        title: 'Photo 7',
        image: 'seed/anime2.jpg',
        description: 'Here is some photo description',
        authorId: user1.id,
        categoryId: animeCategory.id,
        published: true
      },

      {
        title: 'Photo 1',
        image: 'seed/photo4.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: natureCategory.id,
        published: true
      },
      {
        title: 'Photo 2',
        image: 'seed/photo5.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: natureCategory.id,
        published: true
      },
      {
        title: 'Photo 3',
        image: 'seed/photo6.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: natureCategory.id,
        published: false
      },
      {
        title: 'Photo 4',
        image: 'seed/military3.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: militaryCategory.id,
        published: true
      },
      {
        title: 'Photo 5',
        image: 'seed/military4.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: militaryCategory.id,
        published: false
      },
      {
        title: 'Photo 6',
        image: 'seed/anime3.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: animeCategory.id,
        published: true
      },
      {
        title: 'Photo 7',
        image: 'seed/anime4.jpg',
        description: 'Here is some photo description',
        authorId: user2.id,
        categoryId: animeCategory.id,
        published: false
      },

      {
        title: 'Photo 1',
        image: 'seed/photo7.jpeg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: natureCategory.id,
        published: true
      },
      {
        title: 'Photo 2',
        image: 'seed/photo8.jpg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: natureCategory.id,
        published: true
      },
      {
        title: 'Photo 3',
        image: 'seed/photo9.jpg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: natureCategory.id,
        published: true
      },
      {
        title: 'Photo 4',
        image: 'seed/military5.jpg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: militaryCategory.id,
        published: true
      },
      {
        title: 'Photo 4',
        image: 'seed/military6.jpg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: militaryCategory.id,
        published: true
      },
      {
        title: 'Photo 5',
        image: 'seed/anime6.jpg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: animeCategory.id,
        published: true
      },
      {
        title: 'Photo 5',
        image: 'seed/anime6.jpg',
        description: 'Here is some photo description',
        authorId: admin.id,
        categoryId: animeCategory.id,
        published: true
      },
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
