import { hash } from 'bcryptjs';
import pkg from '@prisma/client';
const { PrismaClient } = pkg;

const prisma = new PrismaClient();

async function main() {
  try {
    // Hash the password
    const hashedPassword = await hash('admin123', 10);
    
    // Check if user already exists
    const existingUser = await prisma.user.findUnique({
      where: { email: 'coinkrazy26@gmail.com' }
    });
    
    if (existingUser) {
      console.log('Admin user already exists');
      process.exit(0);
    }
    
    // Create admin user
    const user = await prisma.user.create({
      data: {
        email: 'coinkrazy26@gmail.com',
        password: hashedPassword,
        fullName: 'Admin',
        isAdmin: true,
      }
    });
    
    console.log('Admin user created:', user.email);
  } catch (error) {
    console.error('Error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
