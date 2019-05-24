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
    name: "white",
    value: "#f2f0ee"
  }),
  (color3 = {
    id: 3,
    name: "light blue",
    value: "#cdecff"
  }),
  (color4 = {
    id: 4,
    name: "purple",
    value: "#f2e2ff"
  }),
  (color5 = {
    id: 5,
    name: "green",
    value: "#a8e6cf"
  }),
  (color6 = {
    id: 6,
    name: "teal",
    value: "#67f2e4"
  }),
  (color7 = {
    id: 7,
    name: "lime",
    value: "#dcedc1"
  }),
  (color8 = {
    id: 8,
    name: "orange",
    value: "#ffd3b6"
  }),
  (color9 = {
    id: 9,
    name: "rose",
    value: "#ffaaa5"
  }),
  (color10 = {
    id: 10,
    name: "red",
    value: "#ff8b94"
  }),
  (color11 = {
    id: 11,
    name: "dark red",
    value: "#602320"
  })
];

let thumbnails,
  preview,
  canvas,
  ctx,
  width,
  height,
  icon,
  appName,
  textField,
  textColorDiv,
  frameColorDiv;
let frameColor = "#090e12";
let textColor = "#fff";
let font = "Pacifico";
let message = "";

window.onload = init;

function init() {
  // Query Selectors
  icon = document.querySelector(".material-icons");
  appName = document.querySelector("#app-name");
  thumbnails = document.querySelector("#thumbnail-section");
  frameColorDiv = document.querySelector("#frame-color-div");
  textColorDiv = document.querySelector("#text-color-div");
  textField = document.querySelector("#text-field");

  // Canvas
  canvas = document.querySelector("#preview-canvas");
  ctx = canvas.getContext("2d");
  width = canvas.width;
  height = canvas.height;

  // Functions
  displayThumbs();
  displaySwatches(frameColorDiv);
  displaySwatches(textColorDiv);
}

// * Control Functions

function changeColor(value, divWrapper) {
  if (divWrapper.id === "frame-color-div") {
    icon.style.color = value + "";
    frameColor = value + "";
    canvasImage(currentImage);
  } else {
    textColor = value + "";
    appName.style.color = value + "";
    icon.style.background = value + "";
    canvasImage(currentImage);
  }
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
    // Create thumbnail div elements
    let thumb = document.createElement("div");
    thumb.classList.add("thumb");
    thumb.style.backgroundImage = `url('${currentImage.url}')`;
    thumb.alt = currentImage.title;
    // Event listener to draw clicked thumb to canvas
    thumb.addEventListener("click", function(event) {
      canvasImage(event.target);
      document.querySelector("#text-field").value = "";
    });
    // Append thumb to thumbnail div wrapper
    thumbnails.append(thumb);
  });
  // Call first thumb div in wrapper to the canvas
  firstImage = document.querySelector("div section div");
  currentImage = firstImage; // for use in Control functions
  canvasImage(firstImage);
}

function displaySwatches(divWrapper) {
  // Color swatch divs
  colorSwatches.forEach(function(currentSwatch) {
    // Create swatch div elements
    let swatch = document.createElement("div");
    swatch.classList.add("swatch");
    swatch.style.background = currentSwatch.value;
    swatch.alt = currentSwatch.name;
    // Event listener to apply color to frame or text
    swatch.addEventListener("click", function(event) {
      changeColor(event.target.style.backgroundColor, divWrapper);
    });
    // Append swatch to divWrapper passed in to displaySwatches()
    divWrapper.append(swatch);
  });

  // Custom color picker input
  let picker = document.createElement("input");
  picker.type = "color";
  picker.classList.add("swatch");
  picker.value = "#fff";
  picker.addEventListener("input", function(event) {
    changeColor(event.target.value, divWrapper);
  });
  // Append picker to divWrapper passed in to displaySwatches()
  divWrapper.append(picker);
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
  ctx.strokeStyle = "#fff";
  ctx.lineWidth = 1;
  ctx.strokeRect(75, 75, imgObj.width, imgObj.height);
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
