async function pingHost() {
  var protocol = document.getElementById("protocol").value;
  var host = document.getElementById("host").value;
  if (!host) {
    alert("host cannot be empty");
    return;
  }
  var count = parseInt(document.getElementById("count").value, 10);
  if (isNaN(count) || count === 0) {
    count = 1;
  }
  var url = protocol + "://" + host;

  async function makePingRequest() {
    var startTime = Date.now();

    await fetch(url, {
      method: "GET",
      mode: "no-cors"
    })
      .then(function(response) {
        var endTime = Date.now();
        var pingRate = endTime - startTime;

        // Create a new row in the table
        var table = document.getElementById("pingTable");
        var row = table.insertRow(-1);
        var hostCell = row.insertCell(0);
        var pingRateCell = row.insertCell(1);

        // Set the values in the table cells
        hostCell.innerHTML = host;
        pingRateCell.innerHTML = pingRate + " ms";

        // Display the table
        table.style.display = "table";
        return true;
      })
      .catch(function(error) {
        throw error.message;
      });
  }

  // Start the ping requests in a loop
  for (var i = 0; i < count; i++) {
    try {
      await makePingRequest();
    } catch (error) {
      console.log(error);
      alert("Error: " + error);
      break;
    }
  }
}
