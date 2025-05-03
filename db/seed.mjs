/**
 * Seeds database with initial data.
 * @module db/seed
 */
import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

/**
 * Seeds admin and sample users.
 * @async
 */
async function main() {
  try {
    console.log('Starting seeding...');

    // Clear existing data (optional, ensures clean state)
    await prisma.profile.deleteMany();
    await prisma.settings.deleteMany();
    await prisma.activityLog.deleteMany();
    await prisma.user.deleteMany();

    // Seed admin user
    const adminPassword = bcrypt.hashSync('admin123', 10);
    await prisma.user.upsert({
      where: { email: 'admin@example.com' },
      update: {},
      create: {
        email: 'admin@example.com',
        passwordHash: adminPassword,
        role: 'admin',
        is_active: true,
      },
    });

    // Seed sample users with profiles
    const sampleUsers = [
      {
        email: 'user1@example.com',
        passwordHash: bcrypt.hashSync('user123', 10),
        role: 'user',
        is_active: true,
        profile: {
          create: {
            displayName: 'User One',
            bio: 'Regular user with profile',
          },
        },
      },
      {
        email: 'user2@example.com',
        passwordHash: bcrypt.hashSync('user123', 10),
        role: 'user',
        is_active: true,
        profile: {
          create: {
            displayName: 'User Two',
          },
        },
        settings: {
          create: {
            theme: 'dark',
            notifications: true,
          },
        },
      },
      {
        email: 'disabled@example.com',
        passwordHash: bcrypt.hashSync('user123', 10),
        role: 'user',
        is_active: false,
      },
    ];

    // Create users with profiles using Promise.all for efficiency
    const createdUsers = await Promise.all(
      sampleUsers.map((user) =>
        prisma.user.create({
          data: user,
        })
      )
    );

    console.log(`Created ${createdUsers.length} sample users`);
    console.log('Seeding completed successfully.');
  } catch (err) {
    console.error('Seeding failed:', err);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
