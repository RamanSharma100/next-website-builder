import { createServerClient } from '@/lib/server';
import { prisma } from '@/lib/prisma';

export class PageService {
  static async getPages(): Promise<any[]> {
    const supabase = createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const pages = await prisma.page.findMany({
      where: { userId: user.id },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return pages;
  }

  static async getPagesWithComponents(): Promise<any[]> {
    const supabase = createServerClient();

    const {
      data: { user },
    } = await supabase.auth.getUser();

    if (!user) return [];

    const pages = await prisma.page.findMany({
      where: { userId: user.id },
      include: {
        components: true,
      },
      orderBy: {
        createdAt: 'desc',
      },
    });

    return pages;
  }
}
