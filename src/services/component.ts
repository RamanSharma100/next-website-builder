import { createServerClient } from '@/lib/server';
import { prisma } from '@/lib/prisma';

export class ComponentService {
  static async getComponents(): Promise<any[]> {
    const supabase = createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const components = await prisma.component.findMany({
      where: { userId: user.id },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return components;
  }
}
