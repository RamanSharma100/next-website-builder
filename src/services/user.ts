import { createServerClient } from '@/lib/server';
import { prisma } from '@/lib/prisma';

export class UserService {
  static syncUser = async (): Promise<any> => {
    const supabase = createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return null;

    const existing = await prisma.user.findUnique({
      where: { supabaseId: user.id },
    });

    if (existing) return existing;

    const newUser = await prisma.user.create({
      data: {
        supabaseId: user.id,
        email: user.email!,
        name: user.user_metadata?.full_name ?? null,
      },
    });

    return newUser;
  };
}
