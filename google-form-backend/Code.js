const CONFIG = {
  SPREADSHEET_NAME: 'Tedrick Holmes Website Leads',
  SHEET_NAME: 'Leads',

  // Replace this with the email that should receive new inquiries.
  NOTIFICATION_EMAIL: 'tedrickdh@gmail.com',

  WEBSITE_NAME: 'Tedrick Holmes Author Website',
  WEBSITE_URL: 'https://tedrickholmes.com',

  HEADERS: [
  'Timestamp',
  'Name',
  'Email',
  'Reason',
  'Message',
  'Status',
  'Source',
  'Notes',
],

MEMORY_SHEET_NAME: 'Memory Submissions',

MEMORY_HEADERS: [
  'Timestamp',
  'Address',
  'City',
  'Memory',
  'Status',
  'Notes',
],
};

function setupWebsiteContactSystem() {
  const properties = PropertiesService.getScriptProperties();
  let spreadsheetId = properties.getProperty(
    'CONTACT_SPREADSHEET_ID'
  );

  let spreadsheet = null;

  if (spreadsheetId) {
    try {
      spreadsheet = SpreadsheetApp.openById(spreadsheetId);
    } catch (error) {
      console.warn(
        'The saved spreadsheet could not be opened. A new one will be created.'
      );
    }
  }

  if (!spreadsheet) {
    spreadsheet = SpreadsheetApp.create(
      CONFIG.SPREADSHEET_NAME
    );

    spreadsheetId = spreadsheet.getId();

    properties.setProperty(
      'CONTACT_SPREADSHEET_ID',
      spreadsheetId
    );
  }

  let sheet = spreadsheet.getSheetByName(CONFIG.SHEET_NAME);

  if (!sheet) {
    sheet = spreadsheet.insertSheet(CONFIG.SHEET_NAME);
  }

  const defaultSheet = spreadsheet.getSheetByName('Sheet1');

  if (
    defaultSheet &&
    defaultSheet.getSheetId() !== sheet.getSheetId() &&
    spreadsheet.getSheets().length > 1
  ) {
    spreadsheet.deleteSheet(defaultSheet);
  }

  setupLeadSheet_(sheet);
  let memorySheet =
  spreadsheet.getSheetByName(CONFIG.MEMORY_SHEET_NAME);

if (!memorySheet) {
  memorySheet = spreadsheet.insertSheet(
    CONFIG.MEMORY_SHEET_NAME
  );
}

setupMemorySheet_(memorySheet);

function setupMemorySheet_(sheet) {

  const headerRange = sheet.getRange(
    1,
    1,
    1,
    CONFIG.MEMORY_HEADERS.length
  );

  headerRange
    .setValues([CONFIG.MEMORY_HEADERS])
    .setFontWeight('bold')
    .setBackground('#2e4d33')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center');

  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1,180);
  sheet.setColumnWidth(2,280);
  sheet.setColumnWidth(3,220);
  sheet.setColumnWidth(4,650);
  sheet.setColumnWidth(5,120);
  sheet.setColumnWidth(6,260);

  const validation =
    SpreadsheetApp.newDataValidation()
      .requireValueInList(
        ['New','Reviewed','Featured','Archived'],
        true
      )
      .build();

  sheet.getRange("E2:E").setDataValidation(validation);

}
  properties.setProperty(
    'CONTACT_SPREADSHEET_URL',
    spreadsheet.getUrl()
  );

  console.log('Contact spreadsheet: ' + spreadsheet.getUrl());

  return {
    success: true,
    spreadsheetId: spreadsheet.getId(),
    spreadsheetUrl: spreadsheet.getUrl(),
  };
}

function setupLeadSheet_(sheet) {
  const headerRange = sheet.getRange(
    1,
    1,
    1,
    CONFIG.HEADERS.length
  );

  headerRange
    .setValues([CONFIG.HEADERS])
    .setFontWeight('bold')
    .setBackground('#171717')
    .setFontColor('#ffffff')
    .setHorizontalAlignment('center');

  sheet.setFrozenRows(1);

  sheet.setColumnWidth(1, 180);
  sheet.setColumnWidth(2, 180);
  sheet.setColumnWidth(3, 240);
  sheet.setColumnWidth(4, 190);
  sheet.setColumnWidth(5, 440);
  sheet.setColumnWidth(6, 120);
  sheet.setColumnWidth(7, 210);
  sheet.setColumnWidth(8, 300);

  const statusValidation =
    SpreadsheetApp.newDataValidation()
      .requireValueInList(
        ['New', 'Contacted', 'In Progress', 'Closed', 'Spam'],
        true
      )
      .setAllowInvalid(false)
      .build();

  sheet.getRange('F2:F').setDataValidation(statusValidation);

  const reasonValidation =
    SpreadsheetApp.newDataValidation()
      .requireValueInList(
        [
          'General inquiry',
          'Speaking request',
          'Book event',
          'Media or interview',
          'Rights or publishing',
        ],
        true
      )
      .setAllowInvalid(true)
      .build();

  sheet.getRange('D2:D').setDataValidation(reasonValidation);

  if (!sheet.getFilter()) {
    sheet
      .getRange(
        1,
        1,
        sheet.getMaxRows(),
        CONFIG.HEADERS.length
      )
      .createFilter();
  }
}

function doGet() {
  return jsonResponse_({
    success: true,
    message: 'Tedrick Holmes contact endpoint is running.',
  });
}

function doPost(event) {
  try {
    const data = parseRequest_(event);
if (data.formType === "memory") {
  return handleMemorySubmission_(data);
}
    const name = sanitize_(data.name, 150);
    const email = sanitize_(data.email, 250).toLowerCase();
    const reason = sanitize_(
      data.reason || 'General inquiry',
      150
    );
    const message = sanitize_(data.message, 5000);
    const source = sanitize_(
      data.source || 'tedrickholmes.com',
      200
    );

    // Honeypot spam field.
    if (data.website) {
      return jsonResponse_({
        success: true,
        message: 'Thank you. Your message has been received.',
      });
    }

    validateSubmission_({
      name,
      email,
      message,
    });

    const sheet = getLeadSheet_();

    sheet.appendRow([
      new Date(),
      safeSheetValue_(name),
      safeSheetValue_(email),
      safeSheetValue_(reason),
      safeSheetValue_(message),
      'New',
      safeSheetValue_(source),
      '',
    ]);

    const newRow = sheet.getLastRow();

    sheet
      .getRange(newRow, 1)
      .setNumberFormat('mmm d, yyyy h:mm AM/PM');

    sendOwnerNotification_({
      name,
      email,
      reason,
      message,
      source,
    });

    sendVisitorConfirmation_({
      name,
      email,
      reason,
    });

    return jsonResponse_({
      success: true,
      message:
        'Thank you. Your message has been sent successfully.',
    });
  } catch (error) {
    console.error(error);

    return jsonResponse_({
      success: false,
      message:
        error && error.message
          ? error.message
          : 'The message could not be submitted.',
    });
  }
}

function getLeadSheet_() {
  const spreadsheetId = PropertiesService
    .getScriptProperties()
    .getProperty('CONTACT_SPREADSHEET_ID');

  if (!spreadsheetId) {
    throw new Error(
      'The contact system is not initialized. Run setupWebsiteContactSystem first.'
    );
  }

  const spreadsheet =
    SpreadsheetApp.openById(spreadsheetId);

  const sheet = spreadsheet.getSheetByName(
    CONFIG.SHEET_NAME
  );

  if (!sheet) {
    throw new Error(
      'The Leads sheet could not be found.'
    );
  }

  return sheet;
}
function getMemorySheet_() {

  const spreadsheetId =
    PropertiesService.getScriptProperties()
      .getProperty("CONTACT_SPREADSHEET_ID");

  const spreadsheet =
    SpreadsheetApp.openById(spreadsheetId);

  return spreadsheet.getSheetByName(
    CONFIG.MEMORY_SHEET_NAME
  );

}
function parseRequest_(event) {
  if (!event) {
    throw new Error('No request data was received.');
  }

  const contentType =
    event.postData && event.postData.type
      ? event.postData.type.toLowerCase()
      : '';

  if (
    contentType.includes('application/json') &&
    event.postData &&
    event.postData.contents
  ) {
    return JSON.parse(event.postData.contents);
  }

  return event.parameter || {};
}

function validateSubmission_({ name, email, message }) {
  if (!name) {
    throw new Error('Please enter your name.');
  }

  if (!email) {
    throw new Error('Please enter your email address.');
  }

  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw new Error('Please enter a valid email address.');
  }

  if (!message || message.length < 5) {
    throw new Error('Please enter a complete message.');
  }
}

function sanitize_(value, maximumLength) {
  return String(value || '')
    .trim()
    .replace(/\u0000/g, '')
    .slice(0, maximumLength);
}

/**
 * Prevents a visitor from injecting a spreadsheet formula.
 */
function safeSheetValue_(value) {
  const text = String(value || '');

  if (/^[=+\-@]/.test(text)) {
    return "'" + text;
  }

  return text;
}

function sendOwnerNotification_({
  name,
  email,
  reason,
  message,
  source,
}) {
  if (
    !CONFIG.NOTIFICATION_EMAIL ||
    CONFIG.NOTIFICATION_EMAIL.includes('YOUR_EMAIL')
  ) {
    console.warn(
      'Owner notification skipped because the notification email has not been configured.'
    );

    return;
  }

  const subject =
    `New website inquiry: ${reason} — ${name}`;

  const body = [
    'A new inquiry was submitted through tedrickholmes.com.',
    '',
    `Name: ${name}`,
    `Email: ${email}`,
    `Reason: ${reason}`,
    `Source: ${source}`,
    '',
    'Message:',
    message,
  ].join('\n');

  GmailApp.sendEmail(
    CONFIG.NOTIFICATION_EMAIL,
    subject,
    body,
    {
      replyTo: email,
      name: CONFIG.WEBSITE_NAME,
    }
  );
}

function sendVisitorConfirmation_({
  name,
  email,
  reason,
}) {
  const subject =
    'Thank you for contacting Tedrick Holmes';

  const body = [
    `Hello ${name},`,
    '',
    'Thank you for reaching out. Your message has been received.',
    '',
    `Inquiry type: ${reason}`,
    '',
    'Tedrick or a member of his team will respond as soon as possible.',
    '',
    'Tedrick Holmes',
    CONFIG.WEBSITE_URL,
  ].join('\n');

  GmailApp.sendEmail(
    email,
    subject,
    body,
    {
      name: 'Tedrick Holmes',
    }
  );
}
function handleMemorySubmission_(data) {

  const address = sanitize_(data.address,300);
  const city = sanitize_(data.city,200);
  const memory = sanitize_(data.memory,8000);

  if (!address)
    throw new Error("Address is required.");

  if (!city)
    throw new Error("City is required.");

  if (memory.length < 20)
    throw new Error("Memory is too short.");

  const sheet = getMemorySheet_();

  sheet.appendRow([
    new Date(),
    address,
    city,
    memory,
    "New",
    ""
  ]);

  GmailApp.sendEmail(
    CONFIG.NOTIFICATION_EMAIL,

    "New Memory Project Submission",

    [
      "A visitor submitted a memory.",
      "",
      "Address: " + address,
      "City: " + city,
      "",
      "Memory:",
      memory
    ].join("\n")
  );

  return jsonResponse_({
    success:true,
    message:"Memory received."
  });

}
function jsonResponse_(payload) {
  return ContentService
    .createTextOutput(JSON.stringify(payload))
    .setMimeType(ContentService.MimeType.JSON);
}
function testContactEmail() {
  MailApp.sendEmail({
    to: "tedrickdh@gmail.com",
    subject: "Website contact email test",
    htmlBody: "<p>This confirms Apps Script can send email.</p>",
  });
}