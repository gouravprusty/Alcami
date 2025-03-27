// For Search Bar Toggle
document.querySelector("#search_toggle").addEventListener("click", () => {
    document.querySelector("#header__nav_bar").classList.toggle("hidden");
    document.querySelector("#header_input").classList.toggle("hidden");
});

// For slider images
const images = ["assets/slide1.jpg", "assets/slide2.jpg", "assets/slide3.jpg", "assets/slide4.jpg", "assets/slide5.png", "assets/slide6.png", "assets/slide7.png", "assets/slide8.png"];
let currentIndex = 0;
const mainImage  = document.querySelector("#mainImg");
const thumbnails = document.querySelectorAll(".thumbnail");
const dots = document.querySelectorAll(".dot");

document.getElementById("prevBtn").addEventListener("click", () => {
    currentIndex = (currentIndex - 1 + images.length) % images.length;
    updateImage();
});

document.getElementById("nextBtn").addEventListener("click", () => {
    currentIndex = (currentIndex + 1) % images.length;
    updateImage();
});

function showImage(index) {
    currentIndex = index;
    updateImage();
}

function updateImage() {
    mainImage.style.transform = "translateX(-100%)";
    setTimeout(() => {
        mainImage.src = images[currentIndex];
        mainImage.style.transform = "translateX(0)";
    }, 450);

    thumbnails.forEach((thumb, index) => {
        thumb.classList.toggle("active", index === currentIndex);
    });

    dots.forEach((dot, index) => {
        dot.classList.toggle("active", index === currentIndex);
    });
};

// For the radio options
document.addEventListener("DOMContentLoaded", function () {
    function activateSelection(groupClass) {
        const labels = document.querySelectorAll(`.${groupClass}`);
        labels.forEach(label => {
            if (label.querySelector("input").checked) {
                label.classList.add("active");
            }else{
                label.classList.remove("active");
            }
        });
        labels.forEach(label => {
            let input = label.querySelector("input");
            input.addEventListener("change", function () {
                labels.forEach(l => l.classList.remove("active"));
                label.classList.add("active");
                updateCartButton();
            });
        });
    };

    function updateCartLink() {
        let selectedFlavor = document.querySelector('input[name="flavor"]:checked')?.value;
        let selectedPurchaseType = document.querySelector('input[name="purchaseType"]:checked')?.value;
    
        if (selectedFlavor && selectedPurchaseType) {
            let cartLink = `https://example.com/cart?flavor=${selectedFlavor}&purchaseType=${selectedPurchaseType}`;
            document.getElementById("addToCart").href = cartLink;
        }
    }
    
    document.querySelectorAll('input[name="flavor"], input[name="purchaseType"]').forEach(radio => {
        radio.addEventListener("change", updateCartLink);
    });
    
    activateSelection("s2_flavors");
    activateSelection("s2_purchase");
    updateCartLink();
});