import { prisma } from './prisma-client';
import { hashSync } from 'bcrypt';

async function up() {
  const user = await prisma.user.create({
    username: 'Simple User',
    email: 'user@user.com',
    password: hashSync('123', 10),
    role: 'USER'
  });

  const admin = await prisma.user.create({
    username: 'Admin Admin',
    email: 'admin@test.com',
    password: hashSync('123', 10),
    role: 'ADMIN',
  });


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
