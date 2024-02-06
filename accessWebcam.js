const NodeWebcam = require('node-webcam');
const fetch = require('node-fetch');

// Create webcam instance
const Webcam = NodeWebcam.create({
  width: 1280,
  height: 720,
  delay: 0,
  output: 'jpeg',
  quality: 100,
});

// Initialize array to store captured images
const capturedImages = [];

// Function to capture image from webcam
function captureImage() {
  Webcam.capture('image', (err, data) => {
    if (err) {
      console.error('Error capturing image:', err);
      return;
    }
    // Store captured image data
    capturedImages.push(data);
    console.log('Image captured at:', new Date().toLocaleTimeString());
  });
}

// Function to send captured images to API
async function sendImagesToAPI(images) {
  // Prepare request data
  const requestData = {
    images: images, // Array of captured images
    // Other required parameters for the API request
  };

  try {
    // Send request to API
    const response = await fetch('https://api.example.com/analyze-images', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(requestData),
    });

    // Handle API response
    const responseData = await response.json();
    console.log('API Response:', responseData);
  } catch (error) {
    console.error('Error sending images to API:', error);
  }
}

// Schedule image capture at regular intervals
setInterval(() => {
  captureImage();
}, 5000); // Capture image every 5 seconds

// Schedule sending images to API at regular intervals
setInterval(() => {
  sendImagesToAPI(capturedImages.slice()); // Send a copy of captured images array
}, 30000); // Send images every 30 seconds

