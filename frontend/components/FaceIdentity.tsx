import * as faceapi from 'face-api.js';

import { canvas, faceDetectionNet, faceDetectionOptions } from './models';

async function run() {

  await faceDetectionNet.loadFromDisk('../../weights')

  const img = await canvas.loadImage('../images/bbt1.jpg')
  const detections = await faceapi.detectAllFaces(img, faceDetectionOptions)

  const out = faceapi.createCanvasFromMedia(img) as any
  faceapi.draw.drawDetections(out, detections)

  console.log('done, saved results to out/faceDetection.jpg')
}

run()