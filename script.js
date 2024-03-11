document.getElementById("promptForm").addEventListener("submit", function (e) {
  e.preventDefault(); // Prevent the default form submission
  const prompt = document.getElementById("promptInput").value;

  fetch("/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ prompt: prompt }), // Send the user's prompt to the server
  })
    .then((response) => response.json())
    .then((data) => {
      const imgElement = document.getElementById("generatedImage");
      if (data.image) {
        imgElement.src = `data:image/png;base64,${data.image}`;
        imgElement.style.display = "block"; // Display the image element
      } else {
        console.error("Image data not found.");
      }
    })
    .catch((error) => console.error("Error:", error));
});
