const tempDomains = [
  'tempmail', 'mailinator', '10minutemail', 'guerrillamail', 'yopmail', 'dispostable', 'maildrop', 'fakeinbox', 'trashmail', 'getnada', 'mintemail', 'sharklasers', 'spamgourmet', 'mailnesia', 'mailnull', 'throwawaymail', 'mailtemp', 'moakt', 'mytempemail', 'tempemail', 'emailondeck', 'mailcatch', 'spambox', 'mailbox52', 'spam4.me', 'mailinator2', 'mailinator.com', 'maildrop.cc', 'mailnesia.com', 'yopmail.com', '10minutemail.com', 'guerrillamail.com', 'dispostable.com', 'getnada.com', 'mintemail.com', 'sharklasers.com', 'spamgourmet.com', 'mailnull.com', 'throwawaymail.com', 'mailtemp.com', 'moakt.com', 'mytempemail.com', 'emailondeck.com', 'mailcatch.com', 'spambox.us', 'mailbox52.com', 'spam4.me'
];

function isTempEmail(email) {
  return tempDomains.some(domain => email && email.toLowerCase().includes(domain));
}

module.exports = { isTempEmail };
