document.addEventListener("DOMContentLoaded", function () {
    const fileInput = document.getElementById("file_upload");
    const imagePreview = document.getElementById("image-preview");
    const previewContainer = document.getElementById("image-preview-container");
    const fileLabel = document.querySelector(".file-label");
  
    if (fileInput) {
        fileInput.addEventListener("change", function (event) {
            const file = event.target.files[0];
            if (file) {
                // Validate file type
                if (!file.type.startsWith('image/')) {
                    alert('Please select a valid image file');
                    return;
                }
                
                const reader = new FileReader();
                
                reader.addEventListener("load", function () {
                    if (imagePreview) {
                        imagePreview.src = reader.result;
                        imagePreview.alt = file.name;
                    }
                    if (previewContainer) {
                        previewContainer.classList.add("show");
                    }
                    // Change label appearance
                    if (fileLabel) {
                        fileLabel.style.borderColor = "#FF6347";
                        fileLabel.style.backgroundColor = "#fff8f6";
                    }
                    // Store in localStorage
                    localStorage.setItem("imageData", reader.result);
                    localStorage.setItem("imageName", file.name);
                });
                
                reader.readAsDataURL(file);
            }
        });

        // Restore image from localStorage if exists
        const imageData = localStorage.getItem("imageData");
        const imageName = localStorage.getItem("imageName");
        if (imageData && imagePreview && previewContainer) {
            imagePreview.src = imageData;
            imagePreview.alt = imageName || "Preview";
            previewContainer.classList.add("show");
        }

        // Drag and drop functionality
        const uploadArea = document.querySelector(".upload-area");
        if (uploadArea) {
            uploadArea.addEventListener("dragover", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (fileLabel) {
                    fileLabel.style.backgroundColor = "#ffe8df";
                    fileLabel.style.borderColor = "#e74c3c";
                }
            });

            uploadArea.addEventListener("dragleave", function (e) {
                e.preventDefault();
                e.stopPropagation();
                if (fileLabel) {
                    fileLabel.style.backgroundColor = "#fff8f6";
                    fileLabel.style.borderColor = "#FF6347";
                }
            });

            uploadArea.addEventListener("drop", function (e) {
                e.preventDefault();
                e.stopPropagation();
                const droppedFiles = e.dataTransfer.files;
                if (droppedFiles.length > 0) {
                    fileInput.files = droppedFiles;
                    // Trigger change event
                    const event = new Event('change', { bubbles: true });
                    fileInput.dispatchEvent(event);
                }
            });
        }
    }

    // Smooth scroll behavior for navigation
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            navLinks.forEach(l => l.classList.remove('active'));
            this.classList.add('active');
        });
    });
});  