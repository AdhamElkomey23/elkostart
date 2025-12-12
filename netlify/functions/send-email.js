const { Resend } = require('resend');

exports.handler = async (event, context) => {
  if (event.httpMethod !== 'POST') {
    return { 
      statusCode: 405, 
      body: JSON.stringify({ error: 'Method Not Allowed' })
    };
  }

  const resend = new Resend(process.env.RESEND_API_KEY);

  try {
    const data = JSON.parse(event.body);
    
    const firstName = data.firstName || '';
    const lastName = data.lastName || '';
    const email = data.email || '';
    const phone = data.phone || 'Not provided';
    const company = data.company || 'Not provided';
    const service = data.service || 'Not specified';
    const budget = data.budget || 'Not specified';
    const message = data.message || '';
    const timeline = data.timeline || 'Not specified';
    const newsletter = data.newsletter || false;

    if (!firstName || !lastName || !email || !message) {
      return {
        statusCode: 400,
        body: JSON.stringify({ error: 'Missing required fields' })
      };
    }

    const emailHtml = `
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0a0a0a; color: #c9a962; padding: 30px; text-align: center; }
          .header h1 { margin: 0; font-size: 24px; }
          .content { padding: 30px; background: #f9f9f9; }
          .field { margin-bottom: 20px; }
          .label { font-weight: bold; color: #555; font-size: 12px; text-transform: uppercase; letter-spacing: 1px; }
          .value { margin-top: 5px; font-size: 16px; }
          .message-box { background: white; padding: 20px; border-left: 4px solid #c9a962; margin-top: 10px; }
          .footer { text-align: center; padding: 20px; color: #888; font-size: 12px; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>New Contact Form Submission</h1>
          </div>
          <div class="content">
            <div class="field">
              <div class="label">Name</div>
              <div class="value">${firstName} ${lastName}</div>
            </div>
            <div class="field">
              <div class="label">Email</div>
              <div class="value"><a href="mailto:${email}">${email}</a></div>
            </div>
            <div class="field">
              <div class="label">Phone</div>
              <div class="value">${phone}</div>
            </div>
            <div class="field">
              <div class="label">Company / Website</div>
              <div class="value">${company}</div>
            </div>
            <div class="field">
              <div class="label">Service Interested In</div>
              <div class="value">${service}</div>
            </div>
            <div class="field">
              <div class="label">Budget Range</div>
              <div class="value">${budget}</div>
            </div>
            <div class="field">
              <div class="label">Timeline</div>
              <div class="value">${timeline}</div>
            </div>
            <div class="field">
              <div class="label">Message</div>
              <div class="message-box">${message}</div>
            </div>
            <div class="field">
              <div class="label">Newsletter Subscription</div>
              <div class="value">${newsletter ? 'Yes' : 'No'}</div>
            </div>
          </div>
          <div class="footer">
            This message was sent from the Elkostart contact form.
          </div>
        </div>
      </body>
      </html>
    `;

    const result = await resend.emails.send({
      from: 'onboarding@resend.dev',
      to: ['adhamwaelelkomey@gmail.com'],
      subject: `New Inquiry from ${firstName} ${lastName} - Elkostart`,
      html: emailHtml,
      reply_to: email
    });

    if (result.error) {
      console.error('Resend error:', result.error);
      return {
        statusCode: 500,
        body: JSON.stringify({ error: 'Failed to send email' })
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, message: 'Email sent successfully' })
    };

  } catch (error) {
    console.error('Error:', error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message })
    };
  }
};
