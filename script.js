document.addEventListener("DOMContentLoaded", () => {
  const chatBox = document.getElementById("chat-box");
  const messageForm = document.getElementById("message-form");
  const messageInput = document.getElementById("message-input");
  const imageInput = document.getElementById("image-input");

  // Load messages from session storage on load
  let messages = JSON.parse(sessionStorage.getItem("messages")) || [];
  messages.forEach(msg => displayMessage(msg));

  // Form submission to send message
  messageForm.addEventListener("submit", event => {
    event.preventDefault();
    const text = messageInput.value.trim();

    if (text) {
      const message = { type: "text", content: text };
      saveAndDisplayMessage(message);
      messageInput.value = "";
    }

    // Handle image upload
    if (imageInput.files.length > 0) {
      const file = imageInput.files[0];
      const reader = new FileReader();
      reader.onload = () => {
        const message = { type: "image", content: reader.result };
        saveAndDisplayMessage(message);
      };
      reader.readAsDataURL(file);
      imageInput.value = ""; // Clear the file input
    }
  });

  function saveAndDisplayMessage(message) {
    messages.push(message);
    sessionStorage.setItem("messages", JSON.stringify(messages));
    displayMessage(message);
  }

  function displayMessage(message) {
    const messageElement = document.createElement("div");
    messageElement.classList.add("message");

    if (message.type === "text") {
      messageElement.textContent = message.content;
    } else if (message.type === "image") {
      const img = document.createElement("img");
      img.src = message.content;
      img.style.maxWidth = "100%";
      messageElement.appendChild(img);
    }

    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Scroll to bottom
  }
});
