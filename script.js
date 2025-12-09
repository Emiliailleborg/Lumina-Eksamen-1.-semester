document.addEventListener("DOMContentLoaded", () => {
  console.log("JS kører !!!");

  const mobileMenu = document.querySelector(".mobile-menu");

  console.log("mobileMenu:", mobileMenu);

  // click events for opening and closing menu
  document.addEventListener("click", (event) => {
    const burger   = event.target.closest(".burger");
    const closeBtn = event.target.closest(".mobile-menu-close");

    // open burger menu
    if (burger && mobileMenu) {
      mobileMenu.classList.add("is-open");
      mobileMenu.setAttribute("aria-hidden", "false");
      console.log("Menu ÅBEN");
    }

    // Close menu if clicking on close button
    if (closeBtn && mobileMenu) {
      mobileMenu.classList.remove("is-open");
      mobileMenu.setAttribute("aria-hidden", "true");
      console.log("Menu LUKKET");
    }
  });

  // Heart favorite buttons
  const favButtons = document.querySelectorAll(".fav-btn");
  console.log("Fav buttons fundet:", favButtons.length);

  favButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      btn.classList.toggle("active");

      if (btn.classList.contains("active")) {
        btn.textContent = "♥";
      } else {
        btn.textContent = "♡";
      }
    });
  });
});


  // -- AR- use the camera --
  const arBtn     = document.getElementById("try-lumina-btn");
  const arOverlay = document.getElementById("ar-overlay");
  const arClose   = document.getElementById("ar-close");
  const arVideo   = document.getElementById("ar-video");

  let arStream = null; // save camera stream

  if (arBtn && arOverlay && arVideo) {
    arBtn.addEventListener("click", async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
        alert("Din browser understøtter ikke kameraet direkte – prøv på en mobil.");
        return;
      }

      try {
        // use camera if possible 
        arStream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: "environment" },
          audio: false
        });

        arVideo.srcObject = arStream;
        arOverlay.classList.add("is-open");
      } catch (err) {
        console.error("Fejl ved adgang til kamera:", err);
        alert("Kunne ikke få adgang til kameraet. Tjek tilladelser på din enhed.");
      }
    });
  }

  if (arClose) {
    arClose.addEventListener("click", () => {
      arOverlay.classList.remove("is-open");

      // Stop the camera 
      if (arStream) {
        arStream.getTracks().forEach(track => track.stop());
        arStream = null;
        arVideo.srcObject = null;
      }
    });
  }


