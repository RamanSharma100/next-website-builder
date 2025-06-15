import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export class ClerkService {
  static syncUser = async () => {
    const user = await currentUser();
    if (!user) throw new Error('Not authenticated');

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    if (existingUser) return existingUser;

    return await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });
  };

  static getUser = async () => {
    const user = await currentUser();
    if (!user) throw new Error('Not authenticated');

    return await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
  };
}
