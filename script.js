let myPictureArray = [
  (pic1 = {
    albumId: 1,
    id: 1,
    title: "お日さま・Nara",
    url: "images/img1.JPG",
    rotateFlag: true
  }),
  (pic2 = {
    albumId: 1,
    id: 2,
    title: "鹿・Nara",
    url: "images/img2.JPG"
  }),
  (pic3 = {
    albumId: 1,
    id: 3,
    title: "金・Nara",
    url: "images/img3.JPG",
    rotateFlag: true
  }),
  (pic4 = {
    albumId: 1,
    id: 4,
    title: "アレクス・Kyoto",
    url: "images/img4.JPG",
    rotateFlag: true
  }),
  (pic5 = {
    albumId: 1,
    id: 5,
    title: "ジェシ・Kyoto",
    url: "images/img5.JPG"
  }),
  (pic6 = {
    albumId: 1,
    id: 6,
    title: "ダビド・Kyoto",
    url: "images/img6.JPG"
  }),
  (pic7 = {
    albumId: 1,
    id: 7,
    title: "浅草・Tokyo",
    url: "images/img7.JPG"
  }),
  (pic8 = {
    albumId: 1,
    id: 8,
    title: "家族・Tokyo",
    url: "images/img8.JPG"
  }),
  (pic9 = {
    albumId: 1,
    id: 9,
    title: "力・Tokyo",
    url: "images/img9.JPG",
    rotateFlag: true
  })
];

let colorSwatches = [
  (color1 = {
    id: 1,
    name: "dark blue",
    value: "#090e12"
  }),
  (color2 = {
    id: 2,
    name: "blue",
    value: "#443cba"
  }),
  (color3 = {
    id: 3,
    name: "purple",
    value: "#b23bbd"
  }),
  (color4 = {
    id: 4,
    name: "pink",
    value: "#d65f71"
  }),
  (color5 = {
    id: 5,
    name: "red",
    value: "#ab2019"
  }),
  (color6 = {
    id: 6,
    name: "orange",
    value: "#e0691f"
  }),
  (color7 = {
    id: 7,
    name: "yellow",
    value: "#ebab09"
  }),
  (color8 = {
    id: 8,
    name: "lime",
    value: "#c5f086"
  }),
  (color9 = {
    id: 9,
    name: "teal",
    value: "#67f2e4"
  }),
  (color10 = {
    id: 10,
    name: "white",
    value: "#f2f0ee"
  })
  // (color10 = {
  //   id: 10,
  //   name: "white",
  //   value: "#f2f0ee"
  // }),
  // (color10 = {
  //   id: 10,
  //   name: "white",
  //   value: "#f2f0ee"
  // })
];

let thumbnails, preview, canvas, ctx, width, height, icon, appName, textField;
let frameColor = "#090e12";
let textColor = "#fff";
let font = "Pacifico";
let message = "";

window.onload = init;

function init() {
  icon = document.querySelector(".material-icons");
  appName = document.querySelector("#app-name");
  thumbnails = document.querySelector("#thumbnail-section");
  frameColorDiv = document.querySelector("#frame-div");
  textField = document.querySelector("#text-field");

  canvas = document.querySelector("#preview-canvas");
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;

  displayThumbs();
  displaySwatches();
}

// * Control Functions

function changeFrameColor(value) {
  icon.style.color = value + "";
  frameColor = value + "";
  canvasImage(currentImage);
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
    thumb.alt = currentImage.title;

    thumb.addEventListener("click", function(event) {
      canvasImage(event.target);
      document.querySelector("#text-field").value = "";
    });

    thumbnails.append(thumb);
  });

  firstImage = document.querySelector("div section div");
  currentImage = firstImage; // for use in Control functions
  canvasImage(firstImage);
}

function displaySwatches() {
  colorSwatches.forEach(function(currentSwatch) {
    let swatch = document.createElement("div");
    swatch.classList.add("swatch");
    swatch.style.background = currentSwatch.value;
    swatch.alt = currentSwatch.name;

    swatch.addEventListener("click", function(event) {
      // TODO - apply clicked swatch to frame or text
    });
    frameColorDiv.append(swatch);
  });
  // TODO - create and append custom swatch picker
}

function canvasImage(div) {
  let imgObj = new Image();
  currentImage = div; // for use in Control functions
  imgObj.src = div.style.backgroundImage.slice(5, -2); // strips url("  ")
  imgObj.onload = function() {
    ctx.clearRect(0, 0, width, height);
    ctx.save();
    drawImage(imgObj);
    drawText(div.alt);
    ctx.restore();
  };
}

// * Draw Image Functions

function drawImage(imgObj) {
  canvas.width = imgObj.width + 150;
  canvas.height = imgObj.height + 450; // acounts for "polaroid" spacing below picture
  ctx.fillStyle = frameColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgObj, 75, 75);

  // TODO inner border?
  // ctx.strokeStyle = "#fff";
  // ctx.lineWidth = 1;
  // ctx.strokeRect(75, 75, imgObj.width, imgObj.height);
}

// * Draw Text Function

function drawText(alt) {
  message = alt;
  ctx.fillStyle = textColor;
  ctx.font = `100px ${font}, cursive`;
  ctx.textAlign = "center";
  ctx.fillText(
    message,
    canvas.width / 2,
    canvas.height - 150 // places text in polaroid area below picture
  );
}
