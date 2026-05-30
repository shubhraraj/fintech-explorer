// Google Apps Script — Contact Form Handler
//
// SETUP INSTRUCTIONS:
// 1. Go to sheets.google.com → create a new sheet called "shubhra-raj-contacts"
// 2. Add these headers in row 1:
//    Timestamp | Name | Email | Company/Role | Purpose | Cool Project
// 3. Go to Extensions > Apps Script
// 4. Delete all existing code, paste this entire file
// 5. Click Save, then Deploy > New deployment
// 6. Type: Web App
//    Execute as: Me
//    Who has access: Anyone
// 7. Click Deploy → copy the Web App URL
// 8. Paste the URL into index.html replacing 'YOUR_GOOGLE_APPS_SCRIPT_URL'
// 9. Commit and push index.html

function doPost(e) {
  try {
    const sheet = SpreadsheetApp
      .getActiveSpreadsheet()
      .getActiveSheet();

    const name    = e.parameter.name    || '';
    const email   = e.parameter.email   || '';
    const company = e.parameter.company || '';
    const purpose = e.parameter.purpose || '';
    const project = e.parameter.project || '';

    sheet.appendRow([
      new Date(),
      name,
      email,
      company,
      purpose,
      project
    ]);

    // Optional: email yourself a notification
    // MailApp.sendEmail('shubhra.raj@gmail.com',
    //   'New contact from ' + name,
    //   'Name: ' + name + '\nEmail: ' + email + '\nCompany: ' + company +
    //   '\nPurpose: ' + purpose + '\nProject: ' + project
    // );

    return ContentService
      .createTextOutput(JSON.stringify({ status: 'success' }))
      .setMimeType(ContentService.MimeType.JSON);

  } catch(err) {
    return ContentService
      .createTextOutput(JSON.stringify({ status: 'error', message: err.toString() }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}

// Test function — run this manually in Apps Script to verify sheet connection
function testSheet() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  sheet.appendRow([new Date(), 'Test Name', 'test@test.com', 'Test Co', 'Test', 'Test project']);
  Logger.log('Row written successfully');
}
