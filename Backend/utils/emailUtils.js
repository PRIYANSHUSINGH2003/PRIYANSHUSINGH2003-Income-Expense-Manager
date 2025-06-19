const tempDomains = [
  'tempmail', 'mailinator', '10minutemail', 'guerrillamail', 'yopmail', 'dispostable', 'maildrop', 'fakeinbox', 'trashmail', 'getnada', 'mintemail', 'sharklasers', 'spamgourmet', 'mailnesia', 'mailnull', 'throwawaymail', 'mailtemp', 'moakt', 'mytempemail', 'tempemail', 'emailondeck', 'mailcatch', 'spambox', 'mailbox52', 'spam4.me', 'mailinator2', 'mailinator.com', 'maildrop.cc', 'mailnesia.com', 'yopmail.com', '10minutemail.com', 'guerrillamail.com', 'dispostable.com', 'getnada.com', 'mintemail.com', 'sharklasers.com', 'spamgourmet.com', 'mailnull.com', 'throwawaymail.com', 'mailtemp.com', 'moakt.com', 'mytempemail.com', 'emailondeck.com', 'mailcatch.com', 'spambox.us', 'mailbox52.com', 'spam4.me'
];

function isTempEmail(email) {
  return tempDomains.some(domain => email && email.toLowerCase().includes(domain));
}

// Send email utility using nodemailer
const nodemailer = require('nodemailer');
async function sendEmail({ to, subject, text, html }) {
  let transporterConfig;
  if (process.env.EMAIL_SERVICE && process.env.EMAIL_SERVICE.toLowerCase() === 'gmail') {
    // Use Gmail service
    transporterConfig = {
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    };
  } else if (process.env.EMAIL_HOST && process.env.EMAIL_PORT) {
    // Use custom SMTP (e.g., Ethereal)
    transporterConfig = {
      host: process.env.EMAIL_HOST,
      port: parseInt(process.env.EMAIL_PORT, 10),
      secure: false, // Most dev/test SMTP use STARTTLS, not SSL
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    };
  } else {
    // Fallback to service or default to Gmail
    transporterConfig = {
      service: process.env.EMAIL_SERVICE || 'gmail',
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    };
  }
  const transporter = nodemailer.createTransport(transporterConfig);
  await transporter.sendMail({
    from: process.env.EMAIL_USER,
    to,
    subject,
    text,
    html
  });
}

module.exports = { isTempEmail, sendEmail };
