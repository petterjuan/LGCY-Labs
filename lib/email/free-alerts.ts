import nodemailer from 'nodemailer';

export async function sendLeadAlert(lead: any) {
  console.log('📧 Email service starting with Elastic Email...');
  
  // Elastic Email configuration - hardcoded to ensure it works
  const smtpConfig = {
    host: 'smtp.elasticemail.com',
    port: 2525,
    secure: false,
    auth: {
      user: 'petter2025us@outlook.com',
      pass: 'DC999E61BB08A1D0AFA30AE2F85478203E79'
    },
    tls: {
      rejectUnauthorized: false
    }
  };

  console.log('🔧 SMTP Config:', { 
    host: smtpConfig.host,
    port: smtpConfig.port,
    user: smtpConfig.auth.user
  });

  const transporter = nodemailer.createTransport(smtpConfig);

  const priority = lead.budget > 50000 ? 'HIGH' : 'MEDIUM';
  const priorityColor = lead.budget > 50000 ? '#dc2626' : '#ea580c';

  const mailOptions = {
    from: '"LGCY Labs Alerts" <petter2025us@outlook.com>',
    to: 'petter2025us@outlook.com',
    subject: `🚀 ${priority} PRIORITY: $${lead.budget} Lead - ${lead.email}`,
    html: `
      <div style="font-family: Arial, sans-serif; padding: 20px; border: 3px solid ${priorityColor}; border-radius: 10px;">
        <h2 style="color: ${priorityColor}; margin: 0 0 20px 0;">🚀 LGCY LABS - LEAD ALERT</h2>
        <div style="background: #f8fafc; padding: 20px; border-radius: 8px; border-left: 4px solid ${priorityColor};">
          <p><strong>Email:</strong> ${lead.email}</p>
          <p><strong>Budget:</strong> <span style="color: ${priorityColor}; font-weight: bold;">$${lead.budget?.toLocaleString() || 'Not specified'}</span></p>
          <p><strong>Priority:</strong> <span style="color: ${priorityColor}; font-weight: bold;">${priority}</span></p>
          <p><strong>Time:</strong> ${new Date().toLocaleString()}</p>
          ${lead.message ? `<p><strong>Message:</strong> ${lead.message}</p>` : ''}
        </div>
        <div style="margin-top: 20px; padding: 12px; background: #fffbeb; border-radius: 6px;">
          <strong>⚡ ACTION REQUIRED:</strong> Follow up within ${lead.budget > 50000 ? '1 HOUR' : '24 HOURS'} for 80% conversion rate
        </div>
      </div>
    `
  };

  try {
    console.log('📧 Attempting to send email via Elastic Email...');
    const result = await transporter.sendMail(mailOptions);
    console.log('✅ Lead alert email sent successfully!');
    console.log('📨 Message ID:', result.messageId);
    return true;
  } catch (error: any) {
    console.error('❌ Failed to send email alert:', error.message);
    console.log('📋 Fallback - URGENT LEAD:', { 
      email: lead.email, 
      budget: lead.budget,
      priority: priority,
      timestamp: new Date().toISOString()
    });
    return false;
  }
}
