// Netlify Serverless Function - Contact Form Handler
const { neon } = require('@neondatabase/serverless');
const { Resend } = require('resend');
const { getContactEmailHTML } = require('./templates/contact-email');

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
        const sql = neon(process.env.NEON_DATABASE_URL);

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
        const resend = new Resend(process.env.RESEND_API_KEY);

        const emailResult = await resend.emails.send({
            from: 'Portfolio <onboarding@resend.dev>', // Resend default for testing
            to: process.env.RECIPIENT_EMAIL || 'f.hirt@seznam.cz',
            subject: `🎯 Nová poptávka: ${formData.name}`,
            html: getContactEmailHTML(formData),
        });

        console.log('✅ Email sent:', emailResult.id);

        // ============================================
        // 3. RETURN SUCCESS
        // ============================================
        return {
            statusCode: 200,
            headers,
            body: JSON.stringify({
                success: true,
                message: 'Zpráva byla úspěšně odeslána!',
                emailId: emailResult.id
            })
        };

    } catch (error) {
        console.error('❌ Error:', error);

        // Specific error handling
        let errorMessage = 'Něco se pokazilo. Zkuste to prosím znovu.';

        if (error.message?.includes('NEON_DATABASE_URL')) {
            errorMessage = 'Chyba databáze. Kontaktujte správce.';
        } else if (error.message?.includes('RESEND')) {
            errorMessage = 'Chyba při odesílání emailu.';
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
