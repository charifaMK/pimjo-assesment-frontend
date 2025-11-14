import { PrismaClient } from '@prisma/client';
import { hashPassword, generateId } from '@/lib/auth-utils';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Create a test user
  const testUserId = generateId();
  const hashedPassword = await hashPassword('password123');
  const now = new Date();

  const testUser = await prisma.user.create({
    data: {
      id: testUserId,
      name: 'Test User',
      email: 'test@example.com',
      emailVerified: true,
      image: null,
      createdAt: now,
      updatedAt: now,
    },
  });

  // Create account for the test user
  await prisma.account.create({
    data: {
      id: generateId(),
      accountId: 'test@example.com',
      providerId: 'credential',
      userId: testUser.id,
      password: hashedPassword,
      createdAt: now,
      updatedAt: now,
    },
  });

  console.log('Test user created:', testUser);
  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });