import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const clearExpiredTokens = async () => {
  const currentTime = new Date();

  await prisma.tokenBlacklist.deleteMany({
    where: {
      expiresAt: { lt: currentTime },
    },
  });

  console.log('Expired tokens cleared from blacklist.');
};

clearExpiredTokens().finally(() => {
  prisma.$disconnect();
});
