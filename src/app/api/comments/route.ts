import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { connectToDatabase } from '@/lib/db';
import { Comment } from '@/models/Comment';

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const slug = searchParams.get('slug');

  if (!slug) {
    return NextResponse.json({ error: 'Slug parameter is required' }, { status: 400 });
  }

  try {
    const conn = await connectToDatabase();
    if (conn) {
      const comments = await Comment.find({ articleSlug: slug }).sort({ createdAt: -1 }).lean();
      return NextResponse.json({ comments });
    }
  } catch (error) {
    console.error('Failed to get comments from DB:', error);
  }

  // Fallback initial comment for demonstration
  return NextResponse.json({
    comments: [
      {
        _id: 'c-1',
        articleSlug: slug,
        userName: 'Alex Montgomery',
        userEmail: 'alex@example.com',
        userImage: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=100&q=80',
        content: 'Fascinating breakdown! Looking forward to seeing how this unfolds in theaters.',
        createdAt: new Date(Date.now() - 3600000 * 24).toISOString(),
      },
    ],
  });
}

export async function POST(req: NextRequest) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) {
    return NextResponse.json(
      { error: 'Please sign in with Google to join the conversation.' },
      { status: 401 }
    );
  }

  try {
    const { articleSlug, content } = await req.json();
    if (!articleSlug || !content || content.trim().length === 0) {
      return NextResponse.json({ error: 'Content is required' }, { status: 400 });
    }

    const conn = await connectToDatabase();
    let newComment;

    if (conn) {
      newComment = await Comment.create({
        articleSlug,
        userName: session.user.name || 'Entertainment Enthusiast',
        userEmail: session.user.email,
        userImage: session.user.image,
        content: content.trim(),
      });
    } else {
      newComment = {
        _id: `c-${Date.now()}`,
        articleSlug,
        userName: session.user.name || 'Entertainment Enthusiast',
        userEmail: session.user.email,
        userImage: session.user.image,
        content: content.trim(),
        createdAt: new Date().toISOString(),
      };
    }

    return NextResponse.json({ success: true, comment: newComment });
  } catch (error) {
    console.error('Error posting comment:', error);
    return NextResponse.json({ error: 'Failed to post comment' }, { status: 500 });
  }
}
