let myPictureArray = [
  (pic1 = {
    albumId: 1,
    id: 1,
    title: "お日さま・Nara",
    url: "/images/img1.jpg",
    rotateFlag: true
  }),
  (pic2 = {
    albumId: 1,
    id: 2,
    title: "鹿・Nara",
    url: "/images/img2.jpg"
  }),
  (pic3 = {
    albumId: 1,
    id: 3,
    title: "金・Nara",
    url: "/images/img3.jpg",
    rotateFlag: true
  }),
  (pic4 = {
    albumId: 1,
    id: 4,
    title: "アレクス・Kyoto",
    url: "/images/img4.jpg",
    rotateFlag: true
  }),
  (pic5 = {
    albumId: 1,
    id: 5,
    title: "ジェシ・Kyoto",
    url: "/images/img5.jpg"
  }),
  (pic6 = {
    albumId: 1,
    id: 6,
    title: "ダビド・Kyoto",
    url: "/images/img6.jpg"
  }),
  (pic7 = {
    albumId: 1,
    id: 7,
    title: "浅草・Tokyo",
    url: "/images/img7.jpg"
  }),
  (pic8 = {
    albumId: 1,
    id: 8,
    title: "家族・Tokyo",
    url: "/images/img8.jpg"
  }),
  (pic9 = {
    albumId: 1,
    id: 9,
    title: "力・Tokyo",
    url: "/images/img9.jpg",
    rotateFlag: true
  })
];

let thumbnails, preview, canvas, ctx, width, height, icon, appName, textField;
let textColor = "#fff";
let font = "Pacifico";
let message = "";

window.onload = init;

function init() {
  thumbnails = document.querySelector("#thumbnail-section");
  icon = document.querySelector(".material-icons");
  appName = document.querySelector("#app-name");
  textField = document.querySelector("#text-field");

  canvas = document.querySelector("#preview-canvas");
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;

  displayThumbs();
}

// * Control Functions

function changeFrameColor(value) {
  canvas.style.background = value + "";
  icon.style.color = value + "";
}

function changeTextColor(value) {
  textColor = value + "";
  appName.style.color = value + "";
  icon.style.background = value + "";
  canvasImage(currentImage);
}

function changeFont(value) {
  font = value + "";
  appName.style.fontFamily = `'${value + ""}', cursive`;
  canvasImage(currentImage);
}

function changeText(value) {
  if (value !== "") {
    currentImage.alt = value;
    canvasImage(currentImage);
  }
}

// * Main Functions

function displayThumbs() {
  myPictureArray.forEach(function(currentImage) {
    let thumb = document.createElement("div");
    thumb.classList.add("thumb");
    thumb.style.backgroundImage = `url('${currentImage.url}')`;
    console.log(currentImage.url);
    thumb.alt = currentImage.title;

    if (currentImage.rotateFlag === true) {
      thumb.classList.add("rotate90");
    }
    thumb.addEventListener("click", function(event) {
      canvasImage(event.target);
      document.querySelector("#text-field").value = "";
    });
    thumbnails.append(thumb);
  });
  firstImage = document.querySelector("div section div");
  currentImage = firstImage; // for use in changeTextColor and changeFont functions
  canvasImage(firstImage);
}

function canvasImage(div) {
  let imgObj = new Image();
  let scaleValue = 0.5;
  currentImage = div; // for use in Control functions
  imgObj.src = div.style.backgroundImage.slice(5, -2); // strips url("  ")
  imgObj.onload = function() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    if (div.classList.contains("rotate90")) {
      drawRotatedImage(imgObj, scaleValue);
      ctx.rotate((-90 * Math.PI) / 180); // restores rotation for text drawing
    } else {
      drawImage(imgObj, scaleValue);
    }
    drawText(div.alt, scaleValue);
    ctx.restore();
  };
}

// * Draw Image Functions

function drawImage(imgObj, scaleValue) {
  canvas.width = imgObj.width * scaleValue;
  canvas.height = imgObj.height * scaleValue + 350; // +100 acounts for "polaroid" effect spacing
  ctx.scale(scaleValue, scaleValue);
  ctx.drawImage(imgObj, 0, 0);

  // TODO Keep inner border?
  // ctx.strokeStyle = "#666";
  // ctx.lineWidth = 15;
  // ctx.strokeRect(
  //   0,
  //   0,
  //   canvas.width / scaleValue,
  //   canvas.height / scaleValue - 710
  // );
}

function drawRotatedImage(imgObj, scaleValue) {
  // imgObj w & h swapped due to img being rotated

  // canvas.width = imgObj.height * scaleValue;
  // canvas.height = imgObj.width * scaleValue + 650; // +100 acounts for "polaroid" effect spacing
  // ctx.scale(scaleValue, scaleValue);
  // ! new
  canvas.width = imgObj.height * scaleValue;
  canvas.height = imgObj.width * scaleValue + 350; // +100 acounts for "polaroid" effect spacing
  ctx.scale(scaleValue, scaleValue);

  ctx.rotate((90 * Math.PI) / 180);
  ctx.drawImage(imgObj, 0, -3000);

  // TODO Keep inner border?
  // ctx.strokeStyle = "#666";
  // ctx.lineWidth = 15;
  // ctx.strokeRect(
  //   0,
  //   -3000,
  //   canvas.height / scaleValue - 710,
  //   canvas.width / scaleValue - 25
  // );
}

// * Draw Text Function

function drawText(alt, scaleValue) {
  message = alt;
  ctx.fillStyle = textColor;
  ctx.font = `300px ${font}, cursive`;
  ctx.textAlign = "center";
  ctx.fillText(
    message,
    canvas.width / scaleValue / 2,
    canvas.height / scaleValue - 150
  );
}
