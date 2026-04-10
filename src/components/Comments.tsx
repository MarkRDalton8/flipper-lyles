'use client';

import { useEffect, useState } from 'react';
import { supabase, Comment } from '@/lib/supabase';

interface CommentsProps {
  slug: string;
  gameTitle: string;
}

interface CommentWithReplies extends Comment {
  replies: Comment[];
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', {
    month: 'short', day: 'numeric', year: 'numeric',
  });
}

// ── Inline reply form ──────────────────────────────────────────────────────
function ReplyForm({
  parentId,
  slug,
  onSubmitted,
  onCancel,
}: {
  parentId: string;
  slug: string;
  onSubmitted: () => void;
  onCancel: () => void;
}) {
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    if (!name.trim() || !comment.trim()) {
      setError('Name and reply are both required.');
      return;
    }
    if (comment.trim().length < 5) {
      setError('Reply must be at least 5 characters.');
      return;
    }
    setSubmitting(true);
    const { error: err } = await supabase.from('comments').insert({
      game_slug: slug,
      author_name: name.trim(),
      comment: comment.trim(),
      parent_id: parentId,
    });
    if (err) {
      setError('Something went wrong. Try again.');
    } else {
      onSubmitted();
    }
    setSubmitting(false);
  }

  return (
    <form onSubmit={handleSubmit} className="mt-3 ml-6 pl-4 border-l-2 border-gold">
      <div className="grid grid-cols-2 gap-3 mb-3">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
          maxLength={50}
          className="col-span-1 bg-card border border-border rounded px-3 py-1.5 text-txt text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-mute"
        />
      </div>
      <textarea
        value={comment}
        onChange={(e) => setComment(e.target.value)}
        placeholder="Your reply..."
        rows={3}
        maxLength={1000}
        className="w-full bg-card border border-border rounded px-3 py-1.5 text-txt text-sm focus:outline-none focus:border-gold transition-colors placeholder:text-mute resize-none mb-2"
      />
      {error && (
        <p className="text-red text-xs mb-2 font-oswald uppercase tracking-wider">⚠ {error}</p>
      )}
      <div className="flex gap-2">
        <button
          type="submit"
          disabled={submitting}
          className="bg-gold text-bg font-oswald uppercase tracking-wider text-xs px-4 py-1.5 rounded hover:bg-orange transition-colors disabled:opacity-50"
        >
          {submitting ? 'Posting...' : 'Post Reply'}
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="text-mute font-oswald uppercase tracking-wider text-xs px-4 py-1.5 rounded border border-border hover:border-txt2 hover:text-txt2 transition-colors"
        >
          Cancel
        </button>
      </div>
    </form>
  );
}

// ── Single comment + its replies ───────────────────────────────────────────
function CommentThread({
  comment,
  slug,
  onRefresh,
}: {
  comment: CommentWithReplies;
  slug: string;
  onRefresh: () => void;
}) {
  const [replying, setReplying] = useState(false);

  return (
    <div className="bg-card border border-border rounded overflow-hidden">
      {/* Comment header */}
      <div className="px-5 py-2 bg-card2 border-b border-border flex items-center justify-between">
        <span className="font-oswald text-red text-sm tracking-wider">{comment.author_name}</span>
        <span className="meta">{formatDate(comment.created_at)}</span>
      </div>

      {/* Comment body */}
      <div className="px-5 py-3">
        <p className="text-txt2 text-sm leading-relaxed">{comment.comment}</p>

        {/* Reply button */}
        <button
          onClick={() => setReplying((r) => !r)}
          className="mt-2 font-oswald text-[0.65rem] uppercase tracking-wider text-mute hover:text-gold transition-colors"
        >
          {replying ? '↑ Cancel' : '↩ Reply'}
        </button>

        {/* Inline reply form */}
        {replying && (
          <ReplyForm
            parentId={comment.id}
            slug={slug}
            onSubmitted={() => { setReplying(false); onRefresh(); }}
            onCancel={() => setReplying(false)}
          />
        )}

        {/* Replies */}
        {comment.replies.length > 0 && (
          <div className="mt-4 space-y-3 ml-6 pl-4 border-l-2 border-gold">
            {comment.replies.map((reply) => (
              <div key={reply.id}>
                <div className="flex items-center justify-between mb-1">
                  <span className="font-oswald text-gold text-xs tracking-wider">
                    ↩ {reply.author_name}
                  </span>
                  <span className="meta text-[0.6rem]">{formatDate(reply.created_at)}</span>
                </div>
                <p className="text-txt2 text-sm leading-relaxed">{reply.comment}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

// ── Main Comments component ────────────────────────────────────────────────
export default function Comments({ slug, gameTitle }: CommentsProps) {
  const [threads, setThreads] = useState<CommentWithReplies[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [name, setName] = useState('');
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  useEffect(() => { fetchComments(); }, [slug]);

  async function fetchComments() {
    setLoading(true);
    const { data } = await supabase
      .from('comments')
      .select('*')
      .eq('game_slug', slug)
      .order('created_at', { ascending: true });

    if (data) {
      // Separate top-level from replies, group replies under parents
      const topLevel = data.filter((c) => !c.parent_id);
      const replies = data.filter((c) => c.parent_id);

      const threaded: CommentWithReplies[] = topLevel.map((c) => ({
        ...c,
        replies: replies.filter((r) => r.parent_id === c.id),
      }));

      // Most recent top-level first
      threaded.sort((a, b) =>
        new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
      );

      setThreads(threaded);
    }
    setLoading(false);
  }

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError('');
    setSuccess(false);
    if (!name.trim() || !comment.trim()) {
      setError('Name and comment are both required.');
      return;
    }
    if (comment.trim().length < 10) {
      setError('Comment must be at least 10 characters.');
      return;
    }
    setSubmitting(true);
    const { error: err } = await supabase.from('comments').insert({
      game_slug: slug,
      author_name: name.trim(),
      comment: comment.trim(),
      parent_id: null,
    });
    if (err) {
      setError('Something went wrong. Try again.');
    } else {
      setSuccess(true);
      setName('');
      setComment('');
      fetchComments();
    }
    setSubmitting(false);
  }

  const totalCount = threads.reduce((n, t) => n + 1 + t.replies.length, 0);

  return (
    <div className="mt-12 pt-8 border-t border-border">

      {/* Section header */}
      <div className="mb-8 border border-border overflow-hidden">
        <div className="bg-red px-6 py-3 flex items-center justify-between">
          <span className="font-oswald font-bold text-[1.1rem] uppercase tracking-[0.06em] text-white">
            The Rail
          </span>
          <span className="font-oswald text-[0.7rem] uppercase tracking-[0.14em] text-white opacity-80">
            {totalCount} {totalCount === 1 ? 'tip' : 'tips'}
          </span>
        </div>
        <div className="bg-card px-6 py-2">
          <span className="font-oswald text-[0.68rem] uppercase tracking-[0.14em] text-txt2">
            What's your strategy for {gameTitle}? Add your tips below.
          </span>
        </div>
      </div>

      {/* New comment form */}
      <form onSubmit={handleSubmit} className="mb-10 bg-card border border-border rounded p-6">
        <h4 className="font-oswald text-lg uppercase tracking-wider text-red mb-4">Leave a Tip</h4>
        <div className="mb-4">
          <label className="meta block mb-1">Your Name / Handle</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="e.g. Drain Magnet Dave"
            maxLength={50}
            className="w-full md:w-1/2 bg-card2 border border-border rounded px-4 py-2 text-txt text-sm focus:outline-none focus:border-red transition-colors placeholder:text-mute"
          />
        </div>
        <div className="mb-4">
          <label className="meta block mb-1">Your Strategy / Tip</label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="What's your ball 1 priority? Any shots we got wrong? Disagree with something?"
            rows={4}
            maxLength={1000}
            className="w-full bg-card2 border border-border rounded px-4 py-2 text-txt text-sm focus:outline-none focus:border-red transition-colors placeholder:text-mute resize-none"
          />
          <div className="text-right meta mt-1">{comment.length}/1000</div>
        </div>
        {error && (
          <p className="text-red text-sm mb-3 font-oswald uppercase tracking-wider">⚠ {error}</p>
        )}
        {success && (
          <p className="text-teal text-sm mb-3 font-oswald uppercase tracking-wider">✓ Tip posted — thanks!</p>
        )}
        <button
          type="submit"
          disabled={submitting}
          className="bg-red text-white font-oswald uppercase tracking-wider px-6 py-2 rounded hover:bg-[#a81818] transition-colors disabled:opacity-50"
        >
          {submitting ? 'Posting...' : 'Post Tip'}
        </button>
      </form>

      {/* Threads */}
      {loading ? (
        <p className="text-mute meta text-center py-8">Loading tips...</p>
      ) : threads.length === 0 ? (
        <div className="text-center py-8 border border-border rounded bg-card">
          <p className="font-oswald text-txt2 text-lg mb-1">No tips yet.</p>
          <p className="text-mute text-sm">Be the first to share your strategy.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {threads.map((thread) => (
            <CommentThread
              key={thread.id}
              comment={thread}
              slug={slug}
              onRefresh={fetchComments}
            />
          ))}
        </div>
      )}
    </div>
  );
}
