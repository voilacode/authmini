/**
 * Seed database with initial user data
 * Inserts predefined users for testing and development
 */
import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Seed the database with initial users
 * @returns {Promise<void>} Resolves when seeding is complete
 */
async function seed(): Promise<void> {
  const users = [
    {
      email: 'admin@example.com',
      passwordHash: await bcrypt.hash('admin123', 10),
      name: 'Admin User',
      role: 'admin',
    },
    {
      email: 'user@example.com',
      passwordHash: await bcrypt.hash('user123', 10),
      name: 'Regular User',
      role: 'user',
    },
  ];

  for (const user of users) {
    await prisma.user.upsert({
      where: { email: user.email },
      update: {},
      create: user,
    });
  }

  console.log('Database seeded successfully');
}

/**
 * Execute seeding and handle errors
 */
seed()
  .catch((error) => {
    console.error('Seeding failed:', error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });