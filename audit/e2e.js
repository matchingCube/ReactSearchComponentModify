/* eslint-disable max-statements */
require('dotenv').config();
const path = require('path');
const puppeteer = require('puppeteer-core');

const options = {
  headless: true,
  executablePath: process.env.BROWSER_PATH || '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
}

const { devices } = puppeteer;
const util = require('util');
const fs = require('fs');
const exec = util.promisify(require('child_process').exec);
const PORT = process.env.PORT || 3030;

console.log(`Capturing on port ${PORT}`);

const WAIT_TIME = 2000;
const url = `http://localhost:${PORT}`;
const appPath = path.resolve(__dirname, '..')

const toDash = str => str.toLowerCase().replace(/\s+/g, '-');
const setScreenshotPath = (candidate, device, word) => {
  const screenshotFolder = path.join(appPath, `screenshots-${candidate}`);
  
  if(!fs.existsSync(screenshotFolder)) {
    fs.mkdirSync(screenshotFolder);
  }

  const screenshotName = `${toDash(device)}-${candidate}-wait${WAIT_TIME}-${word}.png`;
  const screenshotPath = path.join(screenshotFolder, screenshotName);

  return screenshotPath;
}
const mainSelector = '.search';
const getPage = async (candidate, device, word = 'sham') => {
  const LOGGER = util.debuglog(`audit-[${candidate}] (${device})`);
  const emulatedDevice = devices[device];
  
  const screenshotPath = setScreenshotPath(candidate, device, word)
  const browser = await puppeteer.launch(options);
  const page = await browser.newPage();

  try {
    await page.emulate(emulatedDevice);
    await page.goto(url);
    await page.evaluate((selector) => document.querySelector(selector).click(), mainSelector);
    await page.type('input', word);
    LOGGER(`Entered ${word} in search`);
    await page.waitForTimeout(WAIT_TIME);
    const { width, height } = emulatedDevice.viewport;
    LOGGER(`Viewport at ${width}x${height}`);
    const clip = {
			x: 0,
      y: 0,
      width,
      height
   };
    await page.screenshot({ path: screenshotPath, type: 'png', clip });
    await browser.close();
    
  } catch (error) {
    LOGGER(`Error capturing page ${error.message}`);
  }
}

(async () => {
  const { stdout, stderr } = await exec('git rev-parse --abbrev-ref HEAD');
  const candidate = stderr ? null : stdout.trim();
  const deviceChoices = ['iPhone X', 'iPad Pro landscape'];
  const searchTerms = ['sham','shampoo', 'unkown'];

  for await(const deviceChoice of deviceChoices) {
    for await(const searchTerm of searchTerms) {
      await getPage(candidate, deviceChoice, searchTerm);
    }
  }
})();
