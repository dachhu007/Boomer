document.addEventListener("DOMContentLoaded", function () {
  // Carousel functionality
  const carousel = document.querySelector("#homeCarousel");
  if (carousel) {
    let slideIndex = 0;
    const slides = document.querySelectorAll(".carousel-item");

    // Ensure the first slide is active
    if (slides.length > 0 && !document.querySelector(".carousel-item.active")) {
      slides[0].classList.add("active");
    }

    function autoSlide() {
      if (slides.length > 0) {
        slides[slideIndex].classList.remove("active");
        slideIndex = (slideIndex + 1) % slides.length;
        slides[slideIndex].classList.add("active");
      }
    }

    setInterval(autoSlide, 5000);
  }

  // jQuery filter functionality
  if (typeof $ !== "undefined") {
    $(document).ready(function () {
      $(".filter-item").click(function () {
        const value = $(this).attr("data-filter");
        if (value === "all") {
          $(".post").show(1000);
        } else {
          $(".post").not("." + value).hide(1000);
          $(".post").filter("." + value).show(1000);
        }
      });
    });
  }

  // Sticky Navbar
  let navbar = document.getElementById("navbar-top");
  if (navbar) {
    window.addEventListener("scroll", function () {
      if (window.scrollY > 50) {
        navbar.classList.add("fixed-top");
        document.body.classList.add("fixed-navbar");
      } else {
        navbar.classList.remove("fixed-top");
        document.body.classList.remove("fixed-navbar");
      }
    });
  }

  // Back to Top Button
  let backToTopButton = document.getElementById("btn-back-to-top");
  if (backToTopButton) {
    window.addEventListener("scroll", function () {
      backToTopButton.style.display = window.scrollY > 20 ? "block" : "none";
    });

    backToTopButton.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  // About section scroll animation
  const aboutSection = document.querySelector("#about");

  if (aboutSection) {
    aboutSection.style.opacity = "0";
    aboutSection.style.transform = "translateY(30px)";
    aboutSection.style.transition = "opacity 0.8s ease-out, transform 0.8s ease-out";
  
    const observer = new IntersectionObserver(
      (entries, observer) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            aboutSection.style.opacity = "1";
            aboutSection.style.transform = "translateY(0)";
            observer.unobserve(aboutSection);
          }
        });
      },
      { threshold: 0.3 }
    );
  
    observer.observe(aboutSection);
  }
  

  // Form Validation
  document.getElementById("contactForm").addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent form from submitting
    let isValid = true;

    // Get form values
    let name = document.getElementById("name").value.trim();
    let email = document.getElementById("email").value.trim();
    let mobile = document.getElementById("mobile").value.trim();
    let message = document.getElementById("message").value.trim();

    // Name validation
    if (name === "") {
      isValid = false;
      document.getElementById("nameError").classList.remove("d-none");
    } else {
      document.getElementById("nameError").classList.add("d-none");
    }

    // Email validation (simple regex check)
    let emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(email)) {
      isValid = false;
      document.getElementById("emailError").classList.remove("d-none");
    } else {
      document.getElementById("emailError").classList.add("d-none");
    }

    // Mobile number validation (only numbers and exactly 10 digits)
    let mobilePattern = /^[0-9]{10}$/;
    if (!mobilePattern.test(mobile)) {
      isValid = false;
      document.getElementById("mobileError").classList.remove("d-none");
    } else {
      document.getElementById("mobileError").classList.add("d-none");
    }

    // Message validation
    if (message === "") {
      isValid = false;
      document.getElementById("messageError").classList.remove("d-none");
    } else {
      document.getElementById("messageError").classList.add("d-none");
    }

    // If all fields are valid, proceed with submission
    if (isValid) {
      alert("Form submitted successfully!"); // Replace this with actual form submission logic
      document.getElementById("contactForm").reset(); // Clear form after submission
    }
  });
});
