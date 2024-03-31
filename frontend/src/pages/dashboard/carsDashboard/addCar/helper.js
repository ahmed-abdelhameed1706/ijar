export const returnFileSize = (number) => {
  if (number < 1024) {
    return `${number} bytes`;
  } else if (number >= 1024 && number < 1048576) {
    return `${(number / 1024).toFixed(1)} KB`;
  } else if (number >= 1048576) {
    return `${(number / 1048576).toFixed(1)} MB`;
  }
};

const fileTypes = [
  "image/apng",
  "image/bmp",
  "image/gif",
  "image/jpeg",
  "image/pjpeg",
  "image/png",
  "image/svg+xml",
  "image/tiff",
  "image/webp",
  "image/x-icon",
];

// const isValidUrl = (urlString) => {
//   var a = document.createElement("a");
//   a.href = urlString;
//   return a.host && a.host != window.location.host;
// };

export const validFileType = (file) => {
  // if (isValidUrl(file)) {
  //   return true;
  // }
  return fileTypes.includes(file.type);
};
