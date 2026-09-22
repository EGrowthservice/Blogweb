import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Bookmark } from '@/models/Bookmark';
import { Article } from '@/models/Article';
import { MOCK_ARTICLES } from '@/data/mockArticles';
import mongoose from 'mongoose';

export async function GET(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json({ bookmarks: [] }, { status: 200 });
  }

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const bookmarks = await Bookmark.find({ userEmail: session.user.email }).sort({ createdAt: -1 });
      return NextResponse.json({ bookmarks });
    }
  } catch (error) {
    console.error('Failed to get bookmarks from DB:', error);
  }

  return NextResponse.json({ bookmarks: [] });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Please sign in with Google to save articles to your library.' },
      { status: 401 }
    );
  }

  try {
    const { articleSlug } = await req.json();
    if (!articleSlug) {
      return NextResponse.json({ error: 'Article slug is required' }, { status: 400 });
    }

    const conn = await connectToDatabase();
    if (!conn) {
      // Return simulated success if MongoDB is not connected
      return NextResponse.json({ bookmarked: true, message: 'Article bookmarked (local mode)' });
    }

    // Check if already bookmarked
    const existing = await Bookmark.findOne({
      userEmail: session.user.email,
      articleSlug,
    });

    if (existing) {
      await Bookmark.deleteOne({ _id: existing._id });
      return NextResponse.json({ bookmarked: false, message: 'Article removed from bookmarks' });
    }

    // Find article details
    let article = await Article.findOne({ slug: articleSlug });
    let articleId = article?._id;
    let articleTitle = article?.title;
    let articleCategory = article?.category;
    let articleImage = article?.featuredImage;

    if (!article) {
      const mock = MOCK_ARTICLES.find((a) => a.slug === articleSlug);
      if (mock) {
        articleId = new mongoose.Types.ObjectId();
        articleTitle = mock.title;
        articleCategory = mock.category;
        articleImage = mock.featuredImage;
      }
    }

    if (!articleTitle) {
      return NextResponse.json({ error: 'Article not found' }, { status: 404 });
    }

    const newBookmark = await Bookmark.create({
      userEmail: session.user.email,
      articleId: articleId || new mongoose.Types.ObjectId(),
      articleSlug,
      articleTitle,
      articleCategory: articleCategory || 'movies',
      articleImage: articleImage || '',
    });

    return NextResponse.json({ bookmarked: true, bookmark: newBookmark });
  } catch (error: any) {
    console.error('Error toggling bookmark:', error);
    return NextResponse.json({ error: 'Failed to update bookmark' }, { status: 500 });
  }
}
