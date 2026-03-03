fetch("JS/Data.json")
  .then((res) => res.json())
  .then((data) => {
    const path = window.location.pathname;

    // --- 1. HOME PAGE LOGIC ---
    if (path.includes("index.html") || path === "/" || path.endsWith("/")) {
      const homeData = data.Home[0];

      // HERO SECTION
      const heroTitle = document.getElementById("heroTitle");
      const heroSubTitle = document.getElementById("heroSubTitle");
      const heroParagraph = document.getElementById("heroParagraph");

      if (heroTitle && homeData.HeroSection) {
        const hero = homeData.HeroSection[0];
        heroTitle.textContent = hero.Title;
        heroSubTitle.innerHTML = `<i>${hero.SubTitle}</i>`;
        heroParagraph.textContent = hero.Paragraph;
      }

      // WHAT WE DO SECTION
      const wwdDesc = document.getElementById("Description");
      if (wwdDesc && homeData.WhatWeDoSection) {
        const wwd = homeData.WhatWeDoSection[0];
        const contact = wwd.Contacts[0];
        wwdDesc.textContent = wwd.Description;
        document.getElementById("Email").innerHTML =
          `<i class="fa-light fa-circle-envelope me-2"></i>${contact.Email}`;
        document.getElementById("Phone").innerHTML =
          `<i class="fa-light fa-circle-phone me-2"></i>${contact.Phone}`;

        const list = document.getElementById("features");
        if (list) {
          list.innerHTML = "";
          wwd.Features.forEach((item) => {
            const li = document.createElement("li");
            li.textContent = item;
            list.appendChild(li);
          });
        }
      }

      // PARTNERSHIP SECTION
      const partnerBox = document.getElementById("partnerContainer");
      if (partnerBox && homeData.partners) {
        partnerBox.innerHTML = "";
        homeData.partners.forEach((p) => {
          const col = document.createElement("div");
          col.className = "col-12 col-md-6 col-lg-4";
          col.innerHTML = `
            <div class="partner-card p-4 border rounded shadow-sm h-100 text-center bg-light">
              <h5 class="fw-bold text-primary">${p.name}</h5>
              <p class="small text-muted mb-0">${p.description}</p>
            </div>`;
          partnerBox.appendChild(col);
        });
      }
    }

    // --- 2. ABOUT PAGE LOGIC ---
    if (path.includes("about.html")) {
      const aboutData = data.About[0];
      const aboutThumbnail = document.querySelector(".thumbnail .title");
      if (aboutThumbnail)
        aboutThumbnail.textContent = aboutData.Thumbnail.Title;

      const whoWeAreCol = document.querySelector(
        "section.container-fluid.my-5 .col-lg-6",
      );
      if (whoWeAreCol) {
        const branchesHTML = aboutData.WhoWeAre.Branches.map(
          (loc) =>
            `<p><i class="fa-light fa-location-dot text-danger me-2"></i>${loc}</p>`,
        ).join("");
        whoWeAreCol.innerHTML = `<h1>${aboutData.WhoWeAre.Title}</h1><p>${aboutData.WhoWeAre.Paragraph}</p><h1>Branches</h1>${branchesHTML}`;
      }

      const sectionImg = document.querySelector(".section-image");
      if (sectionImg) sectionImg.src = aboutData.WhoWeAre.Image;

      const missionP = document
        .querySelector(".fa-rocket")
        ?.closest(".d-flex")
        ?.querySelector("p:last-child");
      const visionP = document
        .querySelector(".fa-telescope")
        ?.closest(".d-flex")
        ?.querySelector("p:last-child");
      if (missionP) missionP.textContent = aboutData.MissionVision.Mission;
      if (visionP) visionP.textContent = aboutData.MissionVision.Vision;

      const valuesRow = document.querySelector(
        "section.container-fluid.my-5.bg-white .row.g-4",
      );
      if (valuesRow) {
        valuesRow.innerHTML = "";
        aboutData.Values.forEach((val) => {
          const col = document.createElement("div");
          col.className = "col-6 col-md-4 col-lg-2";
          col.innerHTML = `<div class="value-card h-100"><p class="icon"><i class="fa-light ${val.Icon} fa-2xl"></i></p><p class="fw-bold text-center">${val.Title}</p><p class="text-center">${val.Text}</p></div>`;
          valuesRow.appendChild(col);
        });
      }
    }

    // --- 3. PROJECTS PAGE LOGIC ---
    if (path.includes("project.html")) {
      const projectData = data.Projects[0];
      const projectContainer = document.querySelector(".content .row.g-4");
      const pTitle = document.querySelector(".thumbnail .title");
      if (pTitle) pTitle.textContent = projectData.HeaderTitle;

      const pSectionTitle = document.querySelector(".container.content h1");
      if (pSectionTitle) pSectionTitle.textContent = projectData.SectionTitle;

      if (projectContainer) {
        projectContainer.innerHTML = "";
        projectData.List.forEach((proj) => {
          const col = document.createElement("div");
          col.className = "col-6 col-lg-4";
          col.innerHTML = `
            <div class="project-card h-100">
            <div class="image" style="background-image: url('${proj.Image}'); background-size: cover; height: 150px;"></div>
            <h5><strong>Project Name:</strong> ${proj.Name}</h5>
            <p>${proj.Description}</p></div>`;
          projectContainer.appendChild(col);
        });
      }
    }

    // --- 4. SERVICES PAGE LOGIC ---
    if (path.includes("services.html")) {
      const servicesData = data.Services[0];
      const servicesContainer = document.querySelector(
        ".container.content .row.g-4",
      );
      const sTitle = document.querySelector(".thumbnail .title");
      if (sTitle) sTitle.textContent = servicesData.Header;

      const sSectionTitle = document.querySelector(".container.content h1");
      if (sSectionTitle) sSectionTitle.textContent = servicesData.MainTitle;

      if (servicesContainer) {
        servicesContainer.innerHTML = "";
        servicesData.List.forEach((service) => {
          const col = document.createElement("div");
          col.className = "col-6 col-lg-4";
          col.innerHTML = `
            <div class="services-card h-100">
                <div class="image" style="background-image: url('${service.Image}'); background-size: cover; height: 150px;"></div>
                <h3>${service.Title}</h3>
                <p>${service.Desc}</p>
            </div>`;
          servicesContainer.appendChild(col);
        });
      }
    }

    // Inside your fetch('JS/data.json').then(data => { ...

    // --- CONTACT PAGE SECTION ---
    if (path.includes("contact.html")) {
      const contactData = data.Contact[0];

      // 1. Update Thumbnail
      const contactTitle = document.querySelector(".thumbnail .title");
      if (contactTitle) contactTitle.textContent = contactData.Thumbnail;

      // 2. Update Addresses
      const contactInfoDiv = document.querySelector(".contact-info");
      if (contactInfoDiv && contactData.Addresses) {
        // Find the "Address" H1 and update the <p> tags immediately following it
        const addressTitle = Array.from(
          contactInfoDiv.querySelectorAll("h1"),
        ).find((h1) => h1.textContent === "Address");

        if (addressTitle) {
          // Generate HTML for all addresses in the JSON array
          const addressHTML = contactData.Addresses.map(
            (addr) => `
                  <p class="location">
                      <i class="fa-light fa-location-dot"></i>
                      ${addr}
                  </p>
              `,
          ).join("");

          // We update the Phone and Email titles manually to keep the structure clean
          contactInfoDiv.innerHTML = `
                  <h1>Address</h1>
                  ${addressHTML}
                  <h1>Phone</h1>
                  <p class="phone"><i class="fa-light fa-circle-phone"></i> ${contactData.Phone}</p>
                  <h1>Email</h1>
                  <p class="envelope"><i class="fa-light fa-circle-envelope"></i> ${contactData.Email}</p>
              `;
        }
      }

      // 3. Update Map
      const mapIframe = document.querySelector(".map-wrapper iframe");
      if (mapIframe) {
        mapIframe.src = contactData.MapUrl;
      }
    }
  })
  .catch((err) => console.error("Data Fetch Error:", err));
