This app will be used to track stats in PTCGLive

The goal is to 
1. Create a PTCGLive leaderboard
2. backup Game log files and upload for tracking (Automatic trainingcourt.com)
3. Show stats to user in a friendly manner and with nice graphics






1. Set Up Your Overwolf App
Install the Overwolf SDK and set up a new Overwolf project.
Configure manifest.json to specify overlays and permissions for screen reading.
2. Read Text on Screen
Use Overwolf’s Game Events API if the game supports it.
For games without built-in event support, use OCR (Optical Character Recognition) like Tesseract.js to capture and process on-screen text.
3. Upload Data to Storage
Decide where to store the extracted text:
Cloud storage (AWS S3, Firebase, Google Drive)
A database (MySQL, MongoDB, PostgreSQL)
Your own API (Express.js, Flask, or FastAPI)
Use fetch() or a library like axios to send data from your Overwolf app.
4. UI for User Interaction
Build a UI using HTML/CSS/JS or a framework like React.
Allow users to configure what text to capture and where to upload.