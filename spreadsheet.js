// spreadsheet.js

// Function to fetch and display data
function fetchData() {
  const spreadsheetURL = "https://cors-anywhere.herokuapp.com/https://docs.google.com/spreadsheets/d/e/2PACX-1vSr2x02y__zYmesmC-BQwS3uUyetzwHwq37nD9DattuMKraiNWvz8qOcLbDTHMzuphqAAhk3kcL2EBj/pub?output=csv";

  $.ajax({
    url: spreadsheetURL,
    type: "GET",
    dataType: "text",
    success: function(data) {
      processData(data);
    }
  });
}

// Function to process and display the data
function processData(data) {
  const rows = data.split('\n');
  let resultHTML = '';

  // Loop through rows starting from row 2
  for (let i = 1; i < rows.length; i++) {
    const columns = rows[i].split(',');

    // Access individual columns
    const columnC = columns[2];
    // Check if the first letter of the first word in Column C is 'A'
    if (columnC && columnC.trim().toLowerCase().startsWith('a')) {
      // Access other columns
      const columnB = columns[1];
      const columnD = columns[3];
      const columnE = columns[4];
      const columnF = columns[5];
      const columnG = columns[6];

      // Build the result HTML
      resultHTML += `
        <p>
          <strong style="font-size: larger;">
            <a href="mailto:${columnG}" target="_blank">${columnB}</a>
          </strong>: 
          ${columnD} 
          <a href="${columnE}" target="_blank">info</a> 
          ${columnF}
        </p>
      `;
    }
  }

  // Display the result in the 'spreadsheet-data' div
  $('#spreadsheet-data').html(resultHTML);
}

// Fetch data when the page loads
fetchData();
