// Netlify Serverless Function - Contact Form Handler
const { neon } = require('@neondatabase/serverless');
const nodemailer = require('nodemailer');

// Email template inline (to avoid import issues).
// Design mirrors the site's "mixtape zine" palette (src/index.css :root).
// Email clients can't load the site's webfonts, so each stack falls back
// (Sprat→Georgia, Anton→Arial Narrow, Hanken Grotesk→Helvetica/Arial).
function escapeHtml(value) {
    return String(value)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function getContactEmailHTML(formData) {
    const getServiceName = (code) => {
        const services = {
            'smart-web': 'Chytrý Web s AI',
            'eshop': 'Online Obchod',
            'restaurant': 'Web pro Restauraci',
            'corporate': 'Firemní Prezentace',
            'other': 'Jiné'
        };
        return services[code] || code;
    };

    const serif = "Georgia, 'Times New Roman', serif";
    const sans = "'Hanken Grotesk', 'Helvetica Neue', Helvetica, Arial, sans-serif";

    const name = escapeHtml(formData.name);
    const email = escapeHtml(formData.email);
    const phone = formData.phone ? escapeHtml(formData.phone) : '';
    const message = escapeHtml(formData.message).replace(/\n/g, '<br>');
    const preheader = escapeHtml(String(formData.message).slice(0, 110));

    const sentAt = new Date().toLocaleString('cs-CZ', {
        timeZone: 'Europe/Prague',
        day: 'numeric', month: 'long', year: 'numeric',
        hour: '2-digit', minute: '2-digit'
    });

    const fieldLabel = `margin:0 0 6px;font-family:${sans};font-size:11px;font-weight:700;letter-spacing:.16em;text-transform:uppercase;color:#7C5A36;`;
    const fieldValue = `margin:0;font-family:${sans};font-size:17px;line-height:1.5;color:#241710;`;
    const fieldRow = `padding:16px 0;border-bottom:1px solid #C9AE7C;`;
    const link = `color:#C03F12;font-weight:700;text-decoration:none;`;

    return `<!DOCTYPE html>
<html lang="cs">
<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Nová poptávka — ${name}</title>
</head>
<body style="margin:0;padding:0;background-color:#F2E7CE;">
    <div style="display:none;max-height:0;overflow:hidden;mso-hide:all;">${preheader}&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;&nbsp;&zwnj;</div>
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background-color:#F2E7CE;">
        <tr><td align="center" style="padding:36px 14px;">

            <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;border:2px solid #3A140D;background-color:#F2E7CE;">

                <!-- Hlavička: oxblood band, serifový titulek jako v kontaktní sekci -->
                <tr><td style="background-color:#5A1A12;padding:30px 34px 26px;">
                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0">
                        <tr>
                            <td style="font-family:${serif};font-size:34px;line-height:1.1;color:#F7EFDD;">
                                Nová <em style="font-style:italic;color:#E7A21C;">poptávka</em>
                            </td>
                            <td align="right" valign="top" style="font-family:${sans};font-size:11px;font-weight:700;letter-spacing:.18em;text-transform:uppercase;color:#E7A21C;padding-top:6px;white-space:nowrap;">Č.&nbsp;06&nbsp;·&nbsp;Kontakt</td>
                        </tr>
                    </table>
                    <p style="margin:10px 0 0;font-family:${sans};font-size:14px;line-height:1.5;color:#EBD9C2;">Někdo ti píše přes formulář na webu.</p>
                </td></tr>

                <!-- Barevný pruh (persimmon drench) -->
                <tr><td style="background-color:#E0531F;height:7px;line-height:7px;font-size:0;">&nbsp;</td></tr>

                <!-- Obsah -->
                <tr><td style="padding:14px 34px 34px;">

                    <div style="${fieldRow}">
                        <p style="${fieldLabel}">Jméno</p>
                        <p style="${fieldValue}font-family:${serif};font-size:20px;">${name}</p>
                    </div>
                    <div style="${fieldRow}">
                        <p style="${fieldLabel}">E-mail</p>
                        <p style="${fieldValue}"><a href="mailto:${email}" style="${link}">${email}</a></p>
                    </div>
                    ${phone ? `<div style="${fieldRow}">
                        <p style="${fieldLabel}">Telefon</p>
                        <p style="${fieldValue}"><a href="tel:${phone}" style="${link}">${phone}</a></p>
                    </div>` : ''}
                    ${formData.service ? `<div style="${fieldRow}">
                        <p style="${fieldLabel}">Typ webu</p>
                        <p style="margin:0;"><span style="display:inline-block;background-color:#E7A21C;color:#241710;font-family:${sans};font-size:12px;font-weight:700;letter-spacing:.08em;text-transform:uppercase;padding:6px 14px;border-radius:100px;">${escapeHtml(getServiceName(formData.service))}</span></p>
                    </div>` : ''}

                    <div style="padding:18px 0 0;">
                        <p style="${fieldLabel}">Zpráva</p>
                        <div style="background-color:#ECDCBC;border:1px solid #C9AE7C;padding:18px 20px;font-family:${sans};font-size:16px;line-height:1.6;color:#241710;">${message}</div>
                    </div>

                    <table role="presentation" width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding-top:28px;">
                        <a href="mailto:${email}?subject=${encodeURIComponent('Re: Poptávka z webu')}" style="display:inline-block;background-color:#5A1A12;color:#F7EFDD;font-family:${sans};font-size:15px;font-weight:700;letter-spacing:.02em;padding:14px 32px;border-radius:100px;text-decoration:none;">Odpovědět&nbsp;&rarr;</a>
                    </td></tr></table>

                </td></tr>
            </table>

            <!-- Patička mimo rám -->
            <p style="margin:16px 0 0;font-family:${sans};font-size:12px;line-height:1.5;color:#7C5A36;">Odesláno z formuláře na filiphirt.netlify.app&nbsp;&middot;&nbsp;${sentAt}</p>

        </td></tr>
    </table>
</body>
</html>`;
}

// CORS headers
const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
};

exports.handler = async (event) => {
    // Handle CORS preflight
    if (event.httpMethod === 'OPTIONS') {
        return { statusCode: 200, headers, body: '' };
    }

    // Only allow POST
    if (event.httpMethod !== 'POST') {
        return {
            statusCode: 405,
            headers,
            body: JSON.stringify({ error: 'Method not allowed' })
        };
    }

    try {
        // Parse form data
        const formData = JSON.parse(event.body);

        // Validate required fields
        if (!formData.name || !formData.email || !formData.message) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({
                    error: 'Chybí povinná pole (jméno, email, zpráva)'
                })
            };
        }

        // Validate email format
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(formData.email)) {
            return {
                statusCode: 400,
                headers,
                body: JSON.stringify({ error: 'Neplatný email' })
            };
        }

        // ============================================
        // 1. SAVE TO DATABASE
        // ============================================
        const sql = neon(process.env.NETLIFY_DATABASE_URL);

        await sql`
      INSERT INTO contact_submissions (name, email, phone, service, message)
      VALUES (
        ${formData.name},
        ${formData.email},
        ${formData.phone || null},
        ${formData.service || null},
        ${formData.message}
      )
    `;

        console.log('✅ Contact saved to database');

        // ============================================
        // 2. SEND EMAIL NOTIFICATION
        // ============================================
        let emailResult = null;
        try {
            const transporter = nodemailer.createTransport({
                host: 'smtp.gmail.com',
                port: 465,
                secure: true,
                auth: {
                    user: process.env.GMAIL_USER,
                    // Google zobrazuje app password s mezerami, ale platí bez nich
                    pass: (process.env.GMAIL_APP_PASSWORD || '').replace(/\s+/g, ''),
                },
            });

            emailResult = await transporter.sendMail({
                from: `"Portfolio" <${process.env.GMAIL_USER}>`,
                to: process.env.RECIPIENT_EMAIL || process.env.GMAIL_USER,
                replyTo: `"${formData.name}" <${formData.email}>`,
                subject: `📮 Nová poptávka — ${formData.name}`,
                html: getContactEmailHTML(formData),
            });

            console.log('✅ Email sent:', emailResult.messageId);
        } catch (emailError) {
            console.error('⚠️ Email failed but continuing:', emailError.message);
            // Don't fail the whole request if email fails
        }

        // ============================================
        // 3. RETURN SUCCESS
        // ============================================
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Zpráva byla úspěšně odeslána!',
                emailId: emailResult?.messageId,
                emailSent: !!emailResult
            })
        };

    } catch (error) {
        console.error('❌ Error:', error);

        // Specific error handling
        let errorMessage = 'Něco se pokazilo. Zkuste to prosím znovu.';

        if (error.message?.includes('NETLIFY_DATABASE_URL') || error.message?.includes('database')) {
            errorMessage = 'Chyba databáze. Kontaktujte správce.';
        }

        return {
            statusCode: 500,
            headers,
            body: JSON.stringify({
                error: errorMessage,
                details: process.env.NODE_ENV === 'development' ? error.message : undefined
            })
        };
    }
};
