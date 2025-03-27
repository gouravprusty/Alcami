document.addEventListener("DOMContentLoaded", function () {

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
                updateCartLink();
            });
        });
    };

    function updateCartLink() {
        let selectedFlavor = document.querySelector('input[name="flavor"]:checked')?.value;
        let selectedPurchaseType = document.querySelector('input[name="purchaseType"]:checked')?.value;
    
        if (selectedFlavor && selectedPurchaseType) {
            let cartLink = `https://gouravprusty.github.io/Alcami/cart?flavor=${selectedFlavor}&purchaseType=${selectedPurchaseType}`;
            document.getElementById("addToCart").href = cartLink;
        }
    }
    
    document.querySelectorAll('input[name="flavor"], input[name="purchaseType"]').forEach(radio => {
        radio.addEventListener("change", updateCartLink);
    });

    // For the counters
    const counters = document.querySelectorAll(".s6_inner h2");

    function startCounter(counter) {
        let finalValue = parseInt(counter.textContent);
        let currentValue = 0;
        let speed = Math.ceil(finalValue / 50); // Adjust speed for smooth effect

        let interval = setInterval(() => {
            currentValue += speed;
            if (currentValue >= finalValue) {
                currentValue = finalValue; // Ensure exact value
                clearInterval(interval); // Stop animation
            }
            counter.textContent = currentValue + "%";
        }, 50); // Adjust interval speed
    }

    function checkViewport() {
        counters.forEach(counter => {
            const rect = counter.getBoundingClientRect();
            if (rect.top < window.innerHeight && rect.bottom >= 0) {
                if (!counter.classList.contains("animated")) {
                    counter.classList.add("animated");
                    startCounter(counter);
                }
            }
        });
    }
    window.addEventListener("scroll", checkViewport);
    checkViewport();

    // for testimonial sliding
    const cardsContainer = document.querySelector(".s9_bottom");
    let cards = document.querySelectorAll(".s9_card");
    const s9PrevBtn = document.getElementById("s9PrevBtn");
    const s9NextBtn = document.getElementById("s9NextBtn");
    const s9Dots = document.querySelectorAll(".s9_dot"); // Renamed dots to s9Dots
    let visibleCards = 3;
    let totalCards = cards.length;
    let s9CurrentIndex = 0;

    for (let i = 0; i < visibleCards; i++) {
        let clone = cards[i].cloneNode(true);
        cardsContainer.appendChild(clone);
    }

    function updateSlider() {
        let translateValue = -(s9CurrentIndex * (cards[0].offsetWidth + 20)) + "px";
        cardsContainer.style.transition = "transform 0.5s ease-in-out";
        cardsContainer.style.transform = `translateX(${translateValue})`;

        s9Dots.forEach(dot => dot.classList.remove("active"));
        s9Dots[s9CurrentIndex % totalCards]?.classList.add("active");
    }

    s9NextBtn.addEventListener("click", function () {
        s9CurrentIndex++;
        updateSlider();

        if (s9CurrentIndex >= totalCards) {
            setTimeout(() => {
                s9CurrentIndex = 0;
                cardsContainer.style.transition = "none";
                updateSlider();
            }, 500);
        }
    });

    s9PrevBtn.addEventListener("click", function () {
        if (s9CurrentIndex <= 0) {
            s9CurrentIndex = totalCards;
            cardsContainer.style.transition = "none";
            updateSlider();
        }
        setTimeout(() => {
            s9CurrentIndex--;
            cardsContainer.style.transition = "transform 0.5s ease-in-out";
            updateSlider();
        }, 10);
    });

    s9Dots.forEach((dot, index) => {
        dot.addEventListener("click", function () {
            s9CurrentIndex = index;
            updateSlider();
        });
    });

    updateSlider();    


    activateSelection("s2_flavors");
    activateSelection("s2_purchase");
    updateCartLink();
});