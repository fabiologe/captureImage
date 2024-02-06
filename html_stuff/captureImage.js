// Initialize an array to store captured frames
const capturedFrames = [];

// Initialize canvas and context variables
const canvas = document.createElement('canvas');
const context = canvas.getContext('2d');

// Function to capture image from video stream
function captureImage() {
  // Draw video frame on canvas
  context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
  // Convert canvas image to data URL
  const imageDataURL = canvas.toDataURL('image/jpeg');
  
  // Push captured image data to the array
  capturedFrames.push(imageDataURL);
  
  // Log message when a picture is saved
  console.log('Picture saved:', new Date().toLocaleTimeString());
}

// Access webcam and stream video
navigator.mediaDevices.getUserMedia({ video: true })
  .then(stream => {
    // Set video source to the stream
    video.srcObject = stream;
    
    // Start capturing frames every 5 seconds
    setInterval(captureImage, 5000);
  })
  .catch(error => {
    console.error('Error accessing webcam:', error);
  });
// Function to display captured frames
// Function to display the current captured frame
function displayCurrentFrame() {
    // Get the current frame container element
    const frameContainer = document.getElementById('frame-container');

    // Clear any existing images
    frameContainer.innerHTML = '';

    // Create an image element for the most recent captured frame
    const img = document.createElement('img');

    // Set the src attribute to the most recent captured frame data URL
    img.src = capturedFrames[capturedFrames.length - 1];

    // Set an alt attribute (optional)
    img.alt = 'Most Recent Captured Frame';

    // Append the image element to the frame container
    frameContainer.appendChild(img);
}

// Call the displayCurrentFrame function after each frame capture
setInterval(displayCurrentFrame, 5000); // Update every 5 seconds

  
  // Call the displayCapture
   
  
// Function to send captured frames to GPT4 Vision API
function sendFramesToAPI() {
  // Here you can implement the logic to send capturedFrames array to the API
  // Example:
  // fetch('https://your-api-endpoint', {
  //   method: 'POST',
  //   body: JSON.stringify({ frames: capturedFrames }),
  //   headers: {
  //     'Content-Type': 'application/json'
  //   }
  // })
  // .then(response => response.json())
  // .then(data => console.log(data))
  // .catch(error => console.error('Error sending frames to API:', error));
}

// Call sendFramesToAPI function after a certain time interval
setInterval(sendFramesToAPI, 30000); // Example: send frames every 30 seconds

