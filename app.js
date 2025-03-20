const fileInput = document.getElementById("fileInput");
const imagePreview = document.getElementById("imagePreview");
const brightness = document.getElementById("brightness");
const contrast = document.getElementById("contrast");
const saturation = document.getElementById("saturation");
const grayscale = document.getElementById("grayscale");
const resetBtn = document.getElementById("reset");
const saveBtn = document.getElementById("save");

fileInput.addEventListener("change", function () {
    const file = fileInput.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = function (event) {
            imagePreview.src = event.target.result;
            imagePreview.style.display = "block"; // Show the image
            applyFilters();
        };
        reader.readAsDataURL(file);
    }
});

function applyFilters() {
    imagePreview.style.filter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        saturate(${saturation.value}%)
        grayscale(${grayscale.value}%)
    `;
}

// Apply filters on range change
[brightness, contrast, saturation, grayscale].forEach(input => {
    input.addEventListener("input", applyFilters);
});

// Reset Button
resetBtn.addEventListener("click", function () {
    brightness.value = 100;
    contrast.value = 100;
    saturation.value = 100;
    grayscale.value = 0;
    applyFilters();
});

// Save Image
saveBtn.addEventListener("click", function () {
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");

    // Set canvas dimensions to match the image
    canvas.width = imagePreview.naturalWidth;
    canvas.height = imagePreview.naturalHeight;

    // Apply the same filters to the canvas
    ctx.filter = `
        brightness(${brightness.value}%)
        contrast(${contrast.value}%)
        saturate(${saturation.value}%)
        grayscale(${grayscale.value}%)
    `;

    // Draw the image onto the canvas
    ctx.drawImage(imagePreview, 0, 0);

    // Create a link to download the canvas as an image
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/png");
    link.download = "edited-image.png";
    link.click();
});