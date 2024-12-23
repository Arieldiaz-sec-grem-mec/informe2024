document.addEventListener("DOMContentLoaded", () => {
    fetchData();
    document.getElementById("search-input").addEventListener("input", filterData);
  });
  
  let allData = [];
  
  async function fetchData() {
    const container = document.getElementById("data-container");
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbxzWg-PG0I5fHR1L5xAzzwhS2iHoTECaZ6Q-BzhjYLsZgljIREXJgbe3p7FJ3MtVsyS7g/exec"
      );
      const data = await response.json();
      allData = data; // Store all data
      container.innerHTML = ""; // Clear loader
      displayData(data);
    } catch (error) {
      container.innerHTML = `<p>Error al cargar los datos: ${error.message}</p>`;
    }
  }
  
  function displayData(data) {
    const container = document.getElementById("data-container");
    container.innerHTML = ""; // Clear previous content
  
    data.forEach(item => {
      const card = document.createElement("div");
      card.classList.add("card");
  
      const title = document.createElement("div");
      title.classList.add("card-title");
      title.textContent = item.title;
  
      const details = document.createElement("ul");
      details.classList.add("card-details");
  
      item.details.forEach(detail => {
        const listItem = document.createElement("li");
        listItem.textContent = detail;
        details.appendChild(listItem);
      });
  
      card.appendChild(title);
      card.appendChild(details);
      container.appendChild(card);
    });
  }
  
  function filterData() {
    const searchTerm = document.getElementById("search-input").value.toLowerCase();
    const filteredData = allData.filter(item => 
      item.title.toLowerCase().includes(searchTerm) ||
      item.details.some(detail => detail.toLowerCase().includes(searchTerm))
    );
    displayData(filteredData);
  }
