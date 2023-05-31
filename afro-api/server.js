const dotenv = require('dotenv');
const express = require('express');
const { google } = require('googleapis');
const app = express();
const port = 3000;

// Load environment variables from .env file
dotenv.config();

// Define your Google Sheets API credentials
const credentials = {
  client_email: process.env.CLIENT_EMAIL,
  private_key: process.env.PRIVATE_KEY,
};

// Create a new Google Sheets client
const client = new google.auth.JWT(
  credentials.client_email,
  null,
  credentials.private_key,
  ['https://www.googleapis.com/auth/spreadsheets']
);

// The ID of the Google Sheet to write data to
const spreadsheetId = process.env.SPREADSHEET_ID;

// Middleware to parse request body as JSON
app.use(express.json());

// POST route to handle the data
app.post('/data', (req, res) => {
  const { firstName, lastName, phoneNumber, email, ageGroup, profession } = req.body;

  if (!firstName || !lastName || !phoneNumber || !email || !ageGroup || !profession) {
    return res.status(400).json({ error: 'All fields are required.' });
  }

  // Authorize the Google Sheets client
  client.authorize((error, tokens) => {
    if (error) {
      console.error('Error authorizing Google Sheets client:', error);
      res.status(500).json({ error: 'An error occurred while authorizing the Google Sheets client.' });
      return;
    }

    // Create a new Google Sheets API instance
    const sheets = google.sheets({ version: 'v4', auth: client });

    // Get the current date and time
    const timestamp = new Date().toISOString();

    // Prepare the data to be written
    const rowData = [timestamp, firstName, lastName, phoneNumber, email, ageGroup, profession];

    // Append the data to the Google Sheet
    sheets.spreadsheets.values.append(
      {
        spreadsheetId,
        range: 'Data!A:F',
        valueInputOption: 'USER_ENTERED',
        resource: {
          values: [rowData],
        },
      },
      (error, response) => {
        if (error) {
          console.error('Error appending data to Google Sheet:', error);
          res.status(500).json({ error: 'An error occurred while appending data to the Google Sheet.' });
          return;
        }

        console.log('Data saved successfully.');
        res.sendStatus(200);
      }
    );
  });
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
