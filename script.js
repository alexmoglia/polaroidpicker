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
  canvas.width = imgObj.width;
  canvas.height = imgObj.height + 250; // + 250 acounts for "polaroid" spacing below picture
  ctx.drawImage(imgObj, 0, 0);

  // TODO Keep inner border?
  // ctx.strokeStyle = "#666";
  // ctx.lineWidth = 15;
  // ctx.strokeRect(0, 0, canvas.width, canvas.height - 250);
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
    canvas.height - 60 // places text in polaroid area below picture
  );
}
