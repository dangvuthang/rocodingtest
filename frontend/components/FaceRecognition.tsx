import * as faceapi from 'face-api.js';
import { Dispatch, FC, SetStateAction, useEffect } from "react";
import { canvas, faceDetectionNet, faceDetectionOptions, saveFile } from './models';



const FaceRecognition = async () => {

  const REFERENCE_IMAGE = ''
  const QUERY_IMAGE = '../images/.jpg'

  await faceapi.nets.tinyFaceDetector.loadFromUri('./public/models')
  await faceapi.nets.faceLandmark68Net.loadFromUri('./public/models')
  await faceapi.nets.faceRecognitionNet.loadFromUri('./public/models')

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

  let similarityScore = 1;

  const queryDrawBoxes = resultsQuery.map(res => {
    const bestMatch = faceMatcher.findBestMatch(res.descriptor)
    if (bestMatch.distance < 0.5){
      similarityScore = bestMatch.distance
    }
    return new faceapi.draw.DrawBox(res.detection.box, { label: bestMatch.toString() })
  })
  const outQuery = faceapi.createCanvasFromMedia(queryImage)
  queryDrawBoxes.forEach(drawBox => drawBox.draw(outQuery))
  if (similarityScore < 0.5){
    return false;
    // saveFile('queryImage.jpg', (outQuery as any).toBuffer('image/jpeg'));
    // console.log('not similarityScore');
  }
  return true;

}

export default FaceRecognition;