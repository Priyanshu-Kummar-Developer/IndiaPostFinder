// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Search Post Office
function searchPostOffice() {
  const type = document.getElementById("searchType").value;
  const input = document.getElementById("searchInput").value.trim();
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "Loading...";

  let apiURL = "";
  if (type === "pincode") {
    apiURL = `https://api.postalpincode.in/pincode/${input}`;
  } else {
    apiURL = `https://api.postalpincode.in/postoffice/${input}`;
  }

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => {
      const postOffices = data[0]?.PostOffice;
      if (!postOffices) {
        resultsDiv.innerHTML = "<p>No results found.</p>";
        return;
      }

      // Head Post Office first
      postOffices.sort((a, b) => {
        if (a.BranchType === "Head Post Office") return -1;
        if (b.BranchType === "Head Post Office") return 1;
        return 0;
      });

      resultsDiv.innerHTML = postOffices
        .map(
          (po) => `
        <div class="card">
          <h3>📮 ${po.Name} - ${po.Pincode}</h3>
          <p><strong>Branch Type:</strong> ${po.BranchType}</p>
          <p><strong>Delivery Status:</strong> ${po.DeliveryStatus}</p>
          <p><strong>District:</strong> ${
            po.District
          }, <strong>State:</strong> ${po.State}</p>
          <a href="https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
            po.Name + " " + po.Pincode
          )}" target="_blank">
            📍 View on Map
          </a>
        </div>
      `
        )
        .join("");
    })
    .catch((err) => {
      resultsDiv.innerHTML = "<p>Error fetching data.</p>";
      console.error(err);
    });
}

// Track Consignment
function trackConsignment() {
  const input = document.getElementById("trackInput").value.trim();
  if (input) {
    window.open(
      `https://www.indiapost.gov.in/_layouts/15/dop.portal.tracking/TrackConsignment.aspx?tracknum=${input}`,
      "_blank"
    );
  }
}
