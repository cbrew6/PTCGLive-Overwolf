This app will be used to track stats in PTCGLive

The goal is to:
1. Create a PTCGLive leaderboard
2. Backup Game log files and upload for tracking (Automatic trainingcourt.com)
3. Show stats to user in a friendly manner and with nice graphics



https://dev.overwolf.com/ow-native/getting-started/basic-sample-app/#5-load-the-app-as-unpacked-extension
https://www.overwolf.com/app-proposal-submission-form/app-submission-form
Submitted May 7th, contact support May 10th if not heard from: https://dev.overwolf.com/ow-native/support/contact-us/


1. Set Up Your Overwolf App
Request dev account - DONE
Install the Overwolf SDK and set up a new Overwolf project. - DONE
Configure manifest.json to specify overlays and permissions for screen reading.

2. Read Text on Screen
Uuse OCR (Optical Character Recognition) like Tesseract.js to capture and process on-screen text.

3. Upload Data to Storage
Decide where to store the extracted text:
Cloud storage (AWS S3, Firebase, Google Drive)
A database (MySQL, MongoDB, PostgreSQL)
Your own API (Express.js, Flask, or FastAPI)
Use fetch() or a library like axios to send data from your Overwolf app.

4. UI for User Interaction
Build a UI using HTML/CSS/JS or a framework like React.
Allow users to configure what text to capture and where to upload.