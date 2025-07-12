const generateBtn = document.getElementById("generateBtn");

generateBtn.addEventListener("click", () => {
  const jobTitle = document.getElementById("jobTitleInput").value;
  const imageFile = document.getElementById("imageUploader").files[0];
  const clipDirection = document.getElementById("clipDirection").value;

  if (!imageFile || !jobTitle || !clipDirection) {
    alert(
      "Please select an image, enter a job title and choose a clip direction."
    );
    return;
  }

  const image = URL.createObjectURL(imageFile);
  const uploadedImage = document.getElementById("uploadedImage");

  // set background
  uploadedImage.style.backgroundImage = `url(${image})`;

  // 🧹 Remove existing overlay if any
  const oldOverlay = uploadedImage.querySelector(
    ".overlay, .overlay-left, .top-left, .top-right, .overlay-center"
  );
  if (oldOverlay) oldOverlay.remove();

  // create new overlay
  const overlay = document.createElement("div");
  overlay.classList.add(getOverlayClassName(clipDirection));

  const overlayTemplate = `
    <div class="overlayTemplate">
      <h4 class="weAre">We're</h4>
      <h1 class="hiring">HiRING!</h1>
      <p class="jobTitle">${jobTitle}</p>
    </div>
  `;
  overlay.innerHTML = overlayTemplate;

  uploadedImage.appendChild(overlay);
});

function getOverlayClassName(clipDirection) {
  switch (clipDirection) {
    case "bottom-left":
      return "overlay";
    case "bottom-right":
      return "overlay-left";
    case "top-left":
      return "top-left";
    case "top-right":
      return "top-right";
    case "center":
      return "overlay-center";
    default:
      return "overlay";
  }
}

// download logic
const downloadBtn = document.getElementById("downloadBtn");
downloadBtn.addEventListener("click", () => {
  const uploadedImage = document.getElementById("uploadedImage");

  html2canvas(uploadedImage).then((canvas) => {
    const link = document.createElement("a");
    link.download = "poster.png";
    link.href = canvas.toDataURL("image/png");
    link.click();
  });
});

// generateBtn = document.getElementById("generateBtn");

// generateBtn.addEventListener("click", () => {
//   let jobTitle = document.getElementById("jobTitleInput").value;
//   let imageFile = document.getElementById("imageUploader").files[0];
//   let clipDirection = document.getElementById("clipDirection").value;
//   let image = URL.createObjectURL(imageFile);
//   const uploadedImage = document.getElementById("uploadedImage");
//   uploadedImage.style.backgroundImage = `url(${image})`;
//   // create overlay
//   const overlay = document.createElement("div");
//   let overlayClassname =
//     clipDirection == "bottom-left" ? "overlay" : "overlay-left";

//   overlay.classList.add(overlayClassname);
//   uploadedImage.appendChild(overlay);
//   const overlayTemplate = `
//     <div class="overlayTemplate">
//       <h4 class="weAre">We're</h4>
//       <h1 class="hiring">HiRING!</h1>
//       <p class="jobTitle">${jobTitle}</p>
//     </div>
// `;
//   overlay.innerHTML = overlayTemplate;

//   const downloadBtn = document.getElementById("downloadBtn");

//   downloadBtn.addEventListener("click", () => {
//     const uploadedImage = document.getElementById("uploadedImage");

//     html2canvas(uploadedImage).then((canvas) => {
//       // create a link and trigger download
//       const link = document.createElement("a");
//       link.download = "poster.png";
//       link.href = canvas.toDataURL("image/png");
//       link.click();
//     });
//   });

//   // console.log({ imageFile, jobTitle, image, clipDirection });
//   console.log(overlay);
// });
