console.log("✅ Running in:", overwolf.windows.getCurrentWindow);

const logPath = "cbrewStats/log.txt";
const eloPath = "cbrewStats/elo-results.txt";
const storage = "AppData";

// === UI helpers (optional for index.html) ===
function updateUIStatus(status) {
  const el = document.getElementById("status");
  if (el) el.innerText = status;
}

function updateUIElo(elo) {
  const el = document.getElementById("elo");
  if (el) el.innerText = elo;
}

function appendToUILog(message) {
  const el = document.getElementById("log");
  if (el) {
    el.innerText += `[${new Date().toLocaleTimeString()}] ${message}\n`;
    el.scrollTop = el.scrollHeight;
  }
}

// === Logging ===
function logToFile(message) {
  const timeStamped = `[${new Date().toLocaleString()}] ${message}\n`;
  overwolf.io.writeTextFile(
    logPath,
    timeStamped,
    { append: true, storage },
    () => {}
  );
  console.log(message);
  appendToUILog(message);
}

// === Save ELO ===
function saveEloToFile(elo) {
  const entry = `ELO: ${elo} | ${new Date().toLocaleString()}\n`;
  overwolf.io.writeTextFile(
    eloPath,
    entry,
    { append: true, storage },
    (result) => {
      if (result.success) {
        logToFile("✅ ELO saved: " + elo);
      } else {
        logToFile("❌ Failed to save ELO: " + result.error);
      }
    }
  );
}

// === OCR Region Definitions ===
const eloRegions = [
  { x: 0, y: 0, width: 400, height: 150 },
  { x: screen.width - 400, y: screen.height - 150, width: 400, height: 150 }
];

// === OCR Logic ===
function captureAndProcessOCR() {
  overwolf.media.getScreenshotUrl((result) => {
    if (result.status === "success") {
      const imagePath = result.url;
      processRegions(imagePath);
    } else {
      logToFile("❌ Screenshot failed: " + JSON.stringify(result));
    }
  });
}

function processRegions(imagePath) {
  const image = new Image();
  image.onload = () => {
    eloRegions.forEach((region) => {
      const canvas = document.createElement("canvas");
      canvas.width = region.width;
      canvas.height = region.height;
      const ctx = canvas.getContext("2d");

      ctx.drawImage(
        image,
        region.x, region.y,
        region.width, region.height,
        0, 0,
        region.width, region.height
      );

      const dataURL = canvas.toDataURL("image/png");
      runOCR(dataURL);
    });
  };
  image.src = imagePath;
}

function runOCR(imageDataUrl) {
  Tesseract.recognize(
    imageDataUrl,
    "eng",
    { logger: (m) => logToFile("[OCR] " + JSON.stringify(m)) }
  ).then(({ data: { text } }) => {
    logToFile("[OCR Text]: " + text);
    const elo = extractEloFromText(text);
    if (elo) {
      logToFile("🎯 Detected ELO: " + elo);
      saveEloToFile(elo);
      updateUIElo(elo);
    }
  });
}

function extractEloFromText(text) {
  const match = text.match(/\b[1-3][0-9]{2,3}\b/); // Match 100–3999
  return match ? match[0] : null;
}

// === Launch Events ===
function startOCRLoop() {
  setInterval(() => {
    captureAndProcessOCR();
  }, 2000);
}

overwolf.extensions.onAppLaunchTriggered.addListener(() => {
  logToFile("🚀 App launched");
});

// Start scanning immediately
logToFile("📦 Starting OCR loop...");
startOCRLoop();
