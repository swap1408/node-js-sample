const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Replace with your second server's IP and endpoint
const secondServerIP = 'http://13.222.170.173/your-endpoint';

app.get('/', async (req, res) => {
  try {
    // Send request to second server
    const response = await axios.get(secondServerIP);
    res.send(`Response from second server: ${response.data}`);
  } catch (error) {
    console.error('Error contacting second server:', error.message);
    res.status(500).send('Error contacting second server');
  }
});

app.listen(port, () => {
  console.log(`App listening at http://localhost:${port}`);
});
