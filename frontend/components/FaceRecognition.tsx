import * as faceapi from 'face-api.js';
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { canvas, faceDetectionNet, faceDetectionOptions } from './models';

interface FaceRecognitionTrackerProps {
  onChange: Dispatch<SetStateAction<boolean>>;
}

async function run() {

  await faceDetectionNet.loadFromDisk('../../weights')
  await faceapi.nets.faceLandmark68Net.loadFromDisk('../../weights')
  await faceapi.nets.faceRecognitionNet.loadFromDisk('../../weights')

  const referenceImage = await canvas.loadImage(REFERENCE_IMAGE)
  const queryImage = await canvas.loadImage(QUERY_IMAGE)

  const resultsRef = await faceapi.detectAllFaces(referenceImage, faceDetectionOptions)
    .withFaceLandmarks()
    .withFaceDescriptors()

  const resultsQuery = await faceapi.detectAllFaces(queryImage, faceDetectionOptions)
    .withFaceLandmarks()
    .withFaceDescriptors()

  const faceMatcher = new faceapi.FaceMatcher(resultsRef)

  const labels = faceMatcher.labeledDescriptors
    .map(ld => ld.label)
  const refDrawBoxes = resultsRef
    .map(res => res.detection.box)
    .map((box, i) => new faceapi.draw.DrawBox(box, { label: labels[i] }))
  const outRef = faceapi.createCanvasFromMedia(referenceImage)
  refDrawBoxes.forEach(drawBox => drawBox.draw(outRef))

  const queryDrawBoxes = resultsQuery.map(res => {
    const bestMatch = faceMatcher.findBestMatch(res.descriptor)
    return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
  })
  const outQuery = faceapi.createCanvasFromMedia(queryImage)
  queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
  console.log('done, saved results to out/queryImage.jpg')
}

run()