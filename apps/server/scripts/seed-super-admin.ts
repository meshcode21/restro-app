import { db, users, platformMembers } from '@workspace/db';
import bcrypt from 'bcryptjs';
import * as dotenv from 'dotenv';
import { eq } from 'drizzle-orm';

dotenv.config({ path: '../../.env' });

async function seedSuperAdmin() {
  const email = process.env.SUPER_ADMIN_EMAIL || 'admin@platform.com';
  const password = process.env.SUPER_ADMIN_PASSWORD || 'secretpassword';
  const name = process.env.SUPER_ADMIN_NAME || 'Platform Admin';

  try {
    console.log(`Checking if super admin ${email} already exists...`);
    const existingUsers = await db.select().from(users).where(eq(users.email, email));

    if (existingUsers.length > 0) {
      console.log('Super admin already exists.');
      process.exit(0);
    }

    console.log('Creating super admin user...');
    const hashedPassword = await bcrypt.hash(password, 10);

    const [user] = await db.insert(users).values({
      name,
      email,
      passwordHash: hashedPassword,
    }).returning();

    if (!user) {
      throw new Error('Failed to create super admin user');
    }

    console.log('Linking super admin as platform member...');
    await db.insert(platformMembers).values({
      userId: user.id,
      role: 'admin',
      status: 'active',
    });

    console.log('Successfully seeded super admin!');
    process.exit(0);
  } catch (error) {
    console.error('Failed to seed super admin:', error);
    process.exit(1);
  }
}

seedSuperAdmin();
