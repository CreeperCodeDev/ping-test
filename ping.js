function pingHost() {
  var protocol = document.getElementById("protocol").value;
  var host = document.getElementById("host").value;
  var interval = parseInt(document.getElementById("interval").value, 10);
  var url = protocol + "://" + host;
  var errorOccurred = false; // Track error status

  function makePingRequest() {
    var startTime = Date.now();

    fetch(url, {
      method: "GET",
      mode: "no-cors"
    })
      .then(function(response) {
        var endTime = Date.now();
        var pingRate = endTime - startTime;

        if (!errorOccurred) {
          // Create a new row in the table
          var table = document.getElementById("pingTable");
          var row = table.insertRow(-1);
          var hostCell = row.insertCell(0);
          var pingRateCell = row.insertCell(1);

          // Set the values in the table cells
          hostCell.innerHTML = host;
          pingRateCell.innerHTML = pingRate + "ms";

          // Display the table
          table.style.display = "table";
        }
      })
      .catch(function(error) {
        console.log("Error: " + error.message);
        errorOccurred = true; // Set error status
      });
  }

  // Start the ping requests in a loop
  for (var i = 0; i < interval; i++) {
    makePingRequest();

    if (errorOccurred) {
      break; // Break the loop if an error occurred
    }
  }
}
