
export function getAverageRGBFromImgsrc(imgSrc){
  return new Promise(function(resolve, reject){
    var imgEl = document.createElement('img');
    imgEl.onload = function(e) {
      // context.drawImage(imgEl, 0, 0, canvas.width, canvas.height);
      // var url = canvas.toDataURL(); // Read succeeds, canvas won't be dirty.
      var rgb = getAverageRGB(imgEl);
      resolve(rgb);
    };
    imgEl.crossOrigin = '';
    imgEl.src = imgSrc;
  });
}


/*算法相同：https://codepen.io/anjia/pen/vJeZbR*/
function getAverageRGB(imgEl) {

  var blockSize = 5, // only visit every 5 pixels
      defaultRGB = {r:255,g:255,b:255}, // for non-supporting envs
      canvas = document.createElement('canvas'),
      context = canvas.getContext && canvas.getContext('2d'),
      data, width, height,
      i = -4,
      length,
      rgb = {r:0,g:0,b:0},
      count = 0;

  if (!context) {
    return defaultRGB;
  }

  height = canvas.height = imgEl.naturalHeight || imgEl.offsetHeight || imgEl.height;
  width = canvas.width = imgEl.naturalWidth || imgEl.offsetWidth || imgEl.width;

  context.drawImage(imgEl, 0, 0);

  try {
    data = context.getImageData(0, 0, width, height);
  } catch(e) {
    return defaultRGB;
  }

  length = data.data.length;

  while ( (i += blockSize * 4) < length ) {
    ++count;
    rgb.r += data.data[i];
    rgb.g += data.data[i+1];
    rgb.b += data.data[i+2];
  }

  // ~~ used to floor values
  rgb.r = ~~(rgb.r/count);
  rgb.g = ~~(rgb.g/count);
  rgb.b = ~~(rgb.b/count);

  return rgb;
}

export var rgbToHex = function (rgb) { 
  var hex = Number(rgb).toString(16);
  if (hex.length < 2) {
       hex = "0" + hex;
  }
  return hex;
};