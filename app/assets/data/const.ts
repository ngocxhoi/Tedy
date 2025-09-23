const MAX_FILE_SIZE = 2 * 1024 * 1024; // 2MB
const MIN_DIMENSIONS = { width: 200, height: 200 };
const MAX_DIMENSIONS = { width: 4096, height: 4096 };
const ACCEPTED_IMAGE_TYPES = [
  "image/jpeg",
  "image/jpg",
  "image/png",
  "image/webp",
];
const ACCEPTED_PDF_TYPES = ["application/pdf"];

export const getImageConstraints = () => {
  return {
    maxFileSize: MAX_FILE_SIZE,
    minDimensions: MIN_DIMENSIONS,
    maxDimensions: MAX_DIMENSIONS,
    acceptedTypes: ACCEPTED_IMAGE_TYPES,
    acceptedPdfTypes: ACCEPTED_PDF_TYPES,
  };
};
