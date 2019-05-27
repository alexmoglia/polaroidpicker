const EXAMPLE_ALBUM = [
  (pic1 = {
    albumId: "ex",
    id: 0,
    message: "w i l d ・ f i r e",
    frameColor: "#04272d",
    textColor: "#fde9c8",
    borderColor: "#fde9c8",
    borderWidth: 1,
    font: "Gloria Hallelujah",
    textSize: "120px",
    url: "images/examples/bonfire.JPG",
    credit: "Photo by Vlad Bagacian from Pexels"
  }),
  (pic2 = {
    albumId: "ex",
    id: 1,
    message: "golden",
    frameColor: "#f2f0ee",
    textColor: "#c07f48",
    borderColor: "#c07f48",
    borderWidth: 3,
    font: "Berkshire Swash",
    textSize: "150px",
    url: "images/examples/abaya-abu.JPG",
    credit: "Photo by Oliver Sjöström from Pexels"
  }),
  (pic3 = {
    albumId: "ex",
    id: 2,
    message: "Ocean Air '97",
    frameColor: "#90a7c9",
    textColor: "#fff",
    borderColor: "#fff",
    borderWidth: 15,
    font: "Amatic SC",
    textSize: "150px",
    url: "images/examples/lighthouse.JPG",
    credit: "Photo by Jeffrey Czum from Pexels"
  }),
  (pic4 = {
    albumId: "ex",
    id: 3,
    message: "Neon / Future",
    frameColor: "#20141f",
    textColor: "#5ff2e4",
    borderColor: "#5ff2e4",
    borderWidth: 4,
    font: "Amatic SC",
    textSize: "150px",
    url: "images/examples/vending.JPG",
    credit: "Photo by Aleksandar Pasaric from Pexels"
  }),
  (pic5 = {
    albumId: "ex",
    id: 4,
    message: "Stay Frosty",
    frameColor: "#090e12",
    textColor: "#b89fff",
    borderColor: "#72f3e7",
    borderWidth: 4,
    font: "Permanent Marker",
    textSize: "150px",
    url: "images/examples/celebration-colored-smoke.JPG",
    credit: "Photo by Ali Müftüoğulları from Pexels"
  }),
  (pic6 = {
    albumId: "ex",
    id: 5,
    message: "the trees, ablaze",
    frameColor: "#fff",
    textColor: "#bf3027",
    borderColor: "#bf3027",
    borderWidth: 0,
    font: "Sue Ellen Francisco",
    textSize: "110px",
    url: "images/examples/leaves.JPG",
    credit: "Photo by Thomas from Pexels"
  }),
  (pic7 = {
    albumId: "ex",
    id: 6,
    message: "Asakusa・Tokyo",
    frameColor: "#3d3f52",
    textColor: "#fe0e3d",
    borderColor: "#fe0e3d",
    borderWidth: 3,
    font: "Kaushan Script",
    textSize: "100px",
    url: "images/examples/asakusa.JPG",
    credit: "Alex Moglia"
  }),
  (pic8 = {
    albumId: "ex",
    id: 7,
    message: "#Precious #Pup",
    frameColor: "#dcc5de",
    textColor: "#fefefe",
    borderColor: "#fefefe",
    borderWidth: 5,
    font: "Permanent Marker",
    textSize: "150px",
    url: "images/examples/pupperdoo.JPG",
    credit: "Photo by Valeria Boltneva from Pexels"
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
  albumObject,
  selectedImage,
  frameColorDiv,
  textColorDiv,
  textField;
let frameColor = "#090e12";
let textColor = "#fff";
let font = "Gloria Hallelujah";
let message = "";
let uploadThumbCounter = 0;
const UPLOAD_ALBUM = [];

window.onload = init;

function init() {
  // Query Selectors
  icon = document.querySelector(".material-icons"); // used in changeColor()
  appName = document.querySelector("#app-name"); // used in changeColor()
  uploadButton = document.querySelector("#file-input-label"); // used in uploadImages()
  uploadDetails = document.querySelector("#upload-details"); // used in toggleAlbums()
  uploadThumbsWrapper = document.querySelector("#upload-thumbnail-div"); // used in displayExampleThumbs(), uploadImages()
  exampleDetails = document.querySelector("#example-details"); // used in toggleAlbums()
  exampleThumbsWrapper = document.querySelector("#example-thumbnail-div"); // used in displayExampleThumbs()
  frameColorDiv = document.querySelector("#frame-color-div"); // used in displaySwatches()
  textColorDiv = document.querySelector("#text-color-div"); // used in displaySwatches()
  textField = document.querySelector("#text-field");

  // Toggles albums so only one can be open, based on Summary element found in Details element
  let summaries = document.querySelectorAll(".summary");
  // Click Toggle
  summaries.forEach(summary =>
    summary.addEventListener("click", function(event) {
      toggleAlbums(event.target);
    })
  );
  // Hover Toggle
  summaries.forEach(summary =>
    summary.addEventListener("mouseover", function(event) {
      hoverAlbums(event.target.id);
    })
  );

  // Canvas
  canvas = document.querySelector("#canvas");
  ctx = canvas.getContext("2d");

  // Functions
  displayCanvasInstructions();
  displayExampleThumbs();
  displaySwatches(frameColorDiv);
  displaySwatches(textColorDiv);
}

// * Control Functions

function hoverAlbums(id) {
  hoveredArea = document.querySelector(`#${id}`).parentElement;
  //? possible values for hoveredArea = [#example-details, #upload-details]
  if (hoveredArea.id === "example-details") {
    if (uploadDetails.hasAttribute("open")) {
      uploadDetails.removeAttribute("open");
    }
    exampleDetails.setAttribute("open", "open");
  } else if (hoveredArea.id === "upload-details") {
    if (exampleDetails.hasAttribute("open")) {
      exampleDetails.removeAttribute("open");
    }
    uploadDetails.setAttribute("open", "open");
  }
}

function toggleAlbums(clickedAlbum) {
  //? update to take in clicked button & array of possible buttons in section,
  //? thus allowing for us with controls section?
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
      // thumbObject is created to add to UPLOAD_ALBUM array so changes can be saved/retrieved
      let thumbObject = {
        albumId: "up",
        id: uploadThumbCounter,
        message: "",
        frameColor: "#090e12",
        textColor: "#fff",
        borderColor: "#fff",
        borderWidth: 3,
        font: "Permanent Marker",
        textSize: "100px",
        url: `url('${event.target.result}')`
      };
      UPLOAD_ALBUM.push(thumbObject);

      // div object - the visible thumbnail
      let thumb = document.createElement("div");
      thumb.id = `thumb-up-${uploadThumbCounter}`;
      uploadThumbCounter++;
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
  value += ""; // cast value as string
  albumObject = findAlbumObject(selectedImage);
  if (divWrapper.id === "frame-color-div") {
    icon.style.color = value;
    albumObject.frameColor = value;
    console.log("Frame Color = " + value);
    canvasImage(selectedImage);
  } else {
    albumObject.textColor = value;
    appName.style.color = value;
    icon.style.background = value;
    console.log("Text Color = " + value);
    if (selectedImage) {
      canvasImage(selectedImage);
    } else {
      displayCanvasInstructions(); // if no image loaded, change font color of Canvas Instructions
    }
  }
}

function changeFont(value) {
  albumObject = findAlbumObject(selectedImage);
  albumObject.font = value + "";
  appName.style.fontFamily = `'${value + ""}', cursive`;
  if (selectedImage) {
    canvasImage(selectedImage);
  } else {
    displayCanvasInstructions(); // if no image loaded, change font family of Canvas Instructions
  }
}

function changeText(value) {
  albumObject = findAlbumObject(selectedImage);
  albumObject.message = value;
  canvasImage(selectedImage);
}

// TODO Change Font Size (& Location?) function

// TODO Picture Border function (color, on/off, width)

// * Main Functions

function displayExampleThumbs() {
  // called from init()
  EXAMPLE_ALBUM.forEach(function(currentImage) {
    // Create thumbnail div elements
    let thumb = document.createElement("div");
    thumb.id = `thumb-${currentImage.albumId}-${currentImage.id}`;
    thumb.classList.add("thumb");
    thumb.style.backgroundImage = `url('${currentImage.url}')`;
    thumb.alt = currentImage.message;
    // Event listener to draw clicked thumb to canvas
    thumb.addEventListener("click", function(event) {
      canvasImage(event.target);
      document.querySelector("#text-field").value = ""; // clears custom message input upon new image selected
    });
    // Append thumb to thumbnail div wrapper
    exampleThumbsWrapper.append(thumb);
  });
}

function displaySwatches(divWrapper) {
  // Called from init()

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
  let colorPicker = document.createElement("input");
  colorPicker.type = "color";
  colorPicker.classList.add("swatch");
  colorPicker.value = "#fff";
  colorPicker.addEventListener("input", function(event) {
    changeColor(event.target.value, divWrapper);
  });
  // Append colorPicker to divWrapper passed in to displaySwatches()
  divWrapper.append(colorPicker);
}

function canvasImage(div) {
  // creates the image object to be drawn, then calls drawCanvasImage() & drawText()
  // called in event listeners on thumbs, in changeColor(), changeFont(), changeText()
  selectedImage = div; // for use in Control functions
  albumObject = findAlbumObject(div);

  let imgObj = new Image();
  imgObj.src = div.style.backgroundImage.slice(5, -2); // strips url("  ")
  imgObj.onload = function() {
    setCanvasMaxSize();
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.save();
    drawCanvasImage(imgObj, albumObject);
    drawText(albumObject);
    ctx.restore();
  };
}

function findAlbumObject(clickedImage) {
  // called in canvasImg(), changeColor(), changeFont(), changeText()
  let albumId = clickedImage.id.slice(6, 8);
  let thumbId = clickedImage.id.slice(9);
  if (albumId === "ex") {
    return EXAMPLE_ALBUM[thumbId];
  } else {
    return UPLOAD_ALBUM[thumbId];
  }
}

// * Canvas Functions

function displayCanvasInstructions() {
  setCanvasMaxSize();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.save();
  const INSTRUCTIONS_FONT = font;
  ctx.font = `50px ${INSTRUCTIONS_FONT}, cursive`;

  // Welcome message
  ctx.fillStyle = textColor;
  let message = "Welcome to Polaroid Picker!";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, 125);

  // Thumbs message
  message = "< Upload some images or";
  ctx.font = `30px ${INSTRUCTIONS_FONT}, cursive`;
  ctx.fillStyle = "#a8e6cf";
  ctx.textAlign = "left";
  ctx.fillText(message, 30, canvas.height / 3.3);

  message = "play with the examples";
  ctx.textAlign = "left";
  ctx.fillText(message, 70, canvas.height / 2.8);

  // Controls message
  message = "Change the colors, the >";
  ctx.fillStyle = "#ffaaa5";
  ctx.textAlign = "right";
  ctx.fillText(message, canvas.width - 30, canvas.height / 1.9);

  message = "font, and the text";
  ctx.fillText(message, canvas.width - 70, canvas.height / 1.7);

  // Save message
  message = "Uploaded images are NOT sent to a server,";
  ctx.fillStyle = "#cdecff";
  ctx.textAlign = "center";
  ctx.fillText(message, canvas.width / 2, canvas.height / 1.3);

  message = "so make sure to save your favorites!";
  ctx.fillText(message, canvas.width / 2, canvas.height / 1.2);

  // Canvas border

  ctx.strokeStyle = "#222";
  ctx.lineWidth = 5;
  ctx.strokeRect(0, 0, canvas.width, canvas.height);

  ctx.restore();
}

function setCanvasMaxSize() {
  // called in canvasImage()
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

function drawCanvasImage(imgObj, albumObject) {
  canvas.width = imgObj.width + 150;
  canvas.height = imgObj.height + 450; // acounts for "polaroid" spacing below picture
  // draw frame
  ctx.fillStyle = albumObject.frameColor;
  ctx.fillRect(0, 0, canvas.width, canvas.height);
  // draw image
  ctx.drawImage(imgObj, 75, 75);
  // draw image border
  ctx.strokeStyle = albumObject.borderColor;
  ctx.lineWidth = albumObject.borderWidth;
  ctx.strokeRect(75, 75, imgObj.width, imgObj.height);
}

// * Draw Text Function

function drawText(albumObject) {
  ctx.fillStyle = albumObject.textColor;
  ctx.font = `${albumObject.textSize} ${albumObject.font}, cursive`;
  ctx.textAlign = "center";
  ctx.fillText(
    albumObject.message,
    canvas.width / 2,
    canvas.height - 150 // places text in polaroid area below picture
  );
}
