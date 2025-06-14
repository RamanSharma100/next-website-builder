import { prisma } from '@/lib/prisma';
import { currentUser } from '@clerk/nextjs/server';

export class ClerkService {
  static syncUser = async () => {
    let user = await currentUser();
    if (!user) throw new Error('Not authenticated');

    const existingUser = await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
    if (existingUser) return existingUser;

    user = await prisma.user.create({
      data: {
        clerkId: user.id,
        email: user.emailAddresses[0].emailAddress,
      },
    });

    return user;
  };

  static getUser = async () => {
    const user = await currentUser();
    if (!user) throw new Error('Not authenticated');

    return await prisma.user.findUnique({
      where: { clerkId: user.id },
    });
  };
}
