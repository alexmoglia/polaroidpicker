const EXAMPLE_ALBUM = [
  (pic1 = {
    albumId: 1,
    id: 1,
    title: "お日さま・Nara",
    url: "images/img1.JPG"
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
    url: "images/img3.JPG"
  }),
  (pic4 = {
    albumId: 1,
    id: 4,
    title: "アレクス・Kyoto",
    url: "images/img4.JPG"
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
    url: "images/img9.JPG"
  })
];

const COLOR_SWATCHES = [
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

let exampleThumbsWrapper,
  uploadThumbsWrapper,
  uploadButton,
  uploadDetails,
  exampleDetails,
  preview,
  canvas,
  ctx,
  icon,
  appName,
  frameColorDiv,
  textColorDiv;
let frameColor = "#090e12";
let textColor = "#fff";
let font = "Pacifico";
let message = "";
// let uploadAlbum = [];

window.onload = init;

function init() {
  // Query Selectors
  icon = document.querySelector(".material-icons"); // used in changeColor()
  appName = document.querySelector("#app-name"); // used in changeColor()
  uploadButton = document.querySelector("#file-input-label"); // used in uploadImages()
  uploadDetails = document.querySelector("#upload-details"); // used in toggleAlbums()
  uploadThumbsWrapper = document.querySelector("#upload-thumbnail-div"); // used in displayThumbs(), uploadImages()
  exampleDetails = document.querySelector("#example-details"); // used in toggleAlbums()
  exampleThumbsWrapper = document.querySelector("#example-thumbnail-div"); // used in displayThumbs()
  frameColorDiv = document.querySelector("#frame-color-div"); // used in displaySwatches()
  textColorDiv = document.querySelector("#text-color-div"); // used in displaySwatches()

  // Toggles albums so only one can be open
  let summaries = document.querySelectorAll(".summary");
  summaries.forEach(summary =>
    summary.addEventListener("click", function(event) {
      toggleAlbums(event.target);
    })
  );

  // Canvas
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  // Functions
  displayThumbs(EXAMPLE_ALBUM, exampleThumbsWrapper);
  displaySwatches(frameColorDiv);
  displaySwatches(textColorDiv);
}

// * Control Functions

function toggleAlbums(clickedAlbum) {
  if (clickedAlbum.id === "upload-summary") {
    if (exampleDetails.hasAttribute("open")) {
      exampleDetails.removeAttribute("open");
    } else if (uploadDetails.hasAttribute("open")) {
      exampleDetails.setAttribute("open", "open");
    }
  } else if (clickedAlbum.id === "example-summary") {
    if (uploadDetails.hasAttribute("open")) {
      uploadDetails.removeAttribute("open");
    } else if (exampleDetails.hasAttribute("open")) {
      uploadDetails.setAttribute("open", "open");
    }
  }
}

function uploadImages(files) {
  uploadButton.classList.add("display-none"); // hide the original Upload button
  uploadDetails.classList.remove("display-none"); // show the "My Album" details/summary/div
  exampleDetails.removeAttribute("open"); // collapse the "Examples" album

  for (let i = 0; i < files.length; i++) {
    let file = files[i];
    let reader = new FileReader();
    reader.onload = function(event) {
      let thumb = document.createElement("div");
      thumb.classList.add("thumb");
      thumb.style.backgroundImage = `url('${event.target.result}')`;
      thumb.alt = "";

      // Event listener to draw clicked thumb to canvas
      thumb.addEventListener("click", function(event) {
        canvasImage(event.target);
        document.querySelector("#text-field").value = ""; // clears custom message input upon new image selected
      });

      // Append thumb to thumbnail div wrapper
      uploadThumbsWrapper.append(thumb);
    };
    reader.readAsDataURL(file);
  }
  uploadDetails.setAttribute("open", "open"); // ensures "My Album" opens, even if Examples album is closed first
}

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

// TODO Change Font Size function

// * Main Functions

function displayThumbs(album, wrapper) {
  album.forEach(function(currentImage) {
    // Create thumbnail div elements
    let thumb = document.createElement("div");
    thumb.classList.add("thumb");
    thumb.style.backgroundImage = `url('${currentImage.url}')`;
    thumb.alt = currentImage.title;
    // Event listener to draw clicked thumb to canvas
    thumb.addEventListener("click", function(event) {
      canvasImage(event.target);
      document.querySelector("#text-field").value = ""; // clears custom message input upon new image selected
    });
    // Append thumb to thumbnail div wrapper
    wrapper.append(thumb);
  });

  //? replace with function to draw instructions to canvas at startup?
  // Call first thumb div in wrapper to the canvas
  firstImage = document.querySelector("#example-thumbnail-div div");
  currentImage = firstImage; // for use in Control functions
  canvasImage(firstImage);
}

function displaySwatches(divWrapper) {
  // Color swatch divs
  COLOR_SWATCHES.forEach(function(currentSwatch) {
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
  currentImage = div; // for use in Control functions
  let imgObj = new Image();
  imgObj.src = div.style.backgroundImage.slice(5, -2); // strips url("  ")
  imgObj.onload = function() {
    setCanvasMaxSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    drawCanvasImage(imgObj);
    drawText(div.alt);
    ctx.restore();
  };
}

// * Canvas Functions

function setCanvasMaxSize() {
  let width =
    window.innerWidth ||
    document.documentElement.clientWidth ||
    document.body.clientWidth;

  let height =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;

  document.querySelector("#canvas").style.maxWidth = width - 800 + "px";
  document.querySelector("#canvas").style.maxHeight = height - 125 + "px";
}

// * Draw Image Functions

function drawCanvasImage(imgObj) {
  canvas.width = imgObj.width + 150;
  canvas.height = imgObj.height + 450; // acounts for "polaroid" spacing below picture
  ctx.fillStyle = frameColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  ctx.drawImage(imgObj, 75, 75);

  //TODO inner border controls (lineWidth, on/off)
  ctx.strokeStyle = textColor;
  ctx.lineWidth = 3;
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
