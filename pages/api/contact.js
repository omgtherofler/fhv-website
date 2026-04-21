import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).end();

  const { name, email, phone, topic, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Pflichtfelder fehlen.' });
  }

  const topicLabel = { weg: 'WEG-Verwaltung', miet: 'Mietverwaltung', buch: 'Buchhaltung', andere: 'Anderes' }[topic] || topic;

  try {
    await resend.emails.send({
      from: 'FHV Website <onboarding@resend.dev>',
      to: process.env.CONTACT_EMAIL,
      replyTo: email,
      subject: `Neue Anfrage: ${topicLabel} – ${name}`,
      html: `
        <div style="font-family: Georgia, serif; max-width: 560px; color: #1a1a1a;">
          <h2 style="font-size: 24px; margin-bottom: 24px;">Neue Kontaktanfrage</h2>
          <table style="width: 100%; border-collapse: collapse;">
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; width: 130px;">Name</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${name}</td></tr>
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: .08em;">E-Mail</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;"><a href="mailto:${email}">${email}</a></td></tr>
            ${phone ? `<tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: .08em;">Telefon</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${phone}</td></tr>` : ''}
            <tr><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: .08em;">Thema</td><td style="padding: 10px 0; border-bottom: 1px solid #e5e5e5;">${topicLabel}</td></tr>
            <tr><td style="padding: 10px 0; color: #888; font-size: 12px; text-transform: uppercase; letter-spacing: .08em; vertical-align: top; padding-top: 16px;">Nachricht</td><td style="padding: 10px 0; padding-top: 16px; line-height: 1.6;">${message.replace(/\n/g, '<br>')}</td></tr>
          </table>
        </div>
      `,
    });

    return res.status(200).json({ ok: true });
  } catch (err) {
    console.error('Resend error:', err);
    return res.status(500).json({ error: 'E-Mail konnte nicht gesendet werden.' });
  }
}
