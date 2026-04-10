import { Resend } from 'resend';
import { NextRequest, NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY);
const TO = process.env.NOTIFICATION_EMAIL ?? 'mark.dalton@piano.io';

export async function POST(req: NextRequest) {
  try {
    const payload = await req.json();

    // Supabase webhook payload shape: { type, table, record, old_record }
    const record = payload?.record;
    if (!record) {
      return NextResponse.json({ error: 'No record in payload' }, { status: 400 });
    }

    const { game_slug, author_name, comment, parent_id, created_at } = record;
    const isReply = !!parent_id;
    const gameUrl = `https://flipperlyles.com/napkins/${game_slug}`;
    const label = isReply ? 'New Reply' : 'New Tip';
    const formattedDate = new Date(created_at).toLocaleString('en-US', {
      month: 'short', day: 'numeric', year: 'numeric',
      hour: 'numeric', minute: '2-digit', timeZoneName: 'short',
    });

    await resend.emails.send({
      from: 'Flipper Lyle\'s <onboarding@resend.dev>',
      to: TO,
      subject: `${label} on ${game_slug} — Flipper Lyle's`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0d0806; color: #f0ebe4; padding: 32px; border-radius: 8px;">
          <div style="background: #c42020; padding: 12px 20px; border-radius: 4px 4px 0 0; margin-bottom: 0;">
            <span style="font-weight: bold; text-transform: uppercase; letter-spacing: 0.06em; color: white; font-size: 14px;">
              ${label} — The Rail
            </span>
          </div>
          <div style="background: #160d0b; border: 1px solid #2e1e18; border-top: none; padding: 20px; border-radius: 0 0 4px 4px; margin-bottom: 24px;">
            <p style="margin: 0 0 8px; color: #c42020; font-weight: bold; font-size: 14px; text-transform: uppercase; letter-spacing: 0.06em;">
              ${author_name}${isReply ? ' (reply)' : ''}
            </p>
            <p style="margin: 0 0 12px; color: #f0ebe4; font-size: 15px; line-height: 1.6;">
              ${comment}
            </p>
            <p style="margin: 0; color: #5a5550; font-size: 12px; text-transform: uppercase; letter-spacing: 0.12em;">
              ${game_slug} · ${formattedDate}
            </p>
          </div>
          <a href="${gameUrl}" style="display: inline-block; background: #c42020; color: white; text-decoration: none; padding: 10px 20px; border-radius: 4px; font-size: 13px; font-weight: bold; text-transform: uppercase; letter-spacing: 0.08em;">
            View on Flipper Lyle's →
          </a>
        </div>
      `,
    });

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error('comment-notification error:', err);
    return NextResponse.json({ error: 'Internal error' }, { status: 500 });
  }
}
