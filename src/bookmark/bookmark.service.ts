import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateBookmarkDto, EditBookmarkDto } from './dto';

@Injectable()
export class BookmarkService {
  constructor(private prisma: PrismaService) {}

  getBookmarks(userId: number) {
    return this.prisma.bookmark.findMany({
      where: {
        userId,
      },
    });
  }

  getBookmarksById(userId: number, bookmarkId: number) {
    return this.prisma.bookmark.findFirst({
      where: {
        id: bookmarkId,
        userId,
      },
    });
  }

  async createBookmark(userId: number, dto: CreateBookmarkDto) {
    const bookmark = await this.prisma.bookmark.create({
      data: {
        userId,
        ...dto,
      },
    });
    return bookmark;
  }

  async editBookmarksById(
    userId: number,
    bookmarkId: number,
    dto: EditBookmarkDto,
  ) {
    const editedBookmark = await this.prisma.bookmark.update({
      where: { id: bookmarkId, userId },
      data: {
        ...dto,
      },
    });
    return editedBookmark;
  }

  async deleteBookmarksById(userId: number, bookmarkId: number) {
    const deletedBookmark = await this.prisma.bookmark.delete({
      where: {
        id: bookmarkId,
        userId,
      },
    });
    return deletedBookmark;
  }
}
