document.getElementById("submitBtn").addEventListener("click", function(event) {
    event.preventDefault(); // Prevent default form submission
    if (document.getElementById("productForm").checkValidity()) {
      // Form is valid, proceed with GET request
      let productName = document.getElementById("productName").value;
      let saleType = document.querySelector('input[name="saleType"]:checked').value;
      let description = document.getElementById("productDescription").value;
      let cost = document.getElementById("address").value;
      let stock = document.getElementById("address2").value;
      let category = document.getElementById("country").value;
      let currentDate = new Date().toISOString().slice(0,10); // Get current date in YYYY-MM-DD format
      // Construct GET request URL with data
      let url = `your_api_endpoint?productName=${productName}&saleType=${saleType}&description=${description}&cost=${cost}&stock=${stock}&category=${category}&date_ingreso=${currentDate}`;
      // Send GET request
      window.location.href = url;
    } else {
      // Form is invalid, show validation messages
      document.getElementById("productForm").reportValidity();
    }
  });