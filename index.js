const toggleArrowAcc = document.getElementById("nav-dropAcc");
const toggleVerticalBarAcc = document.getElementById("toggle-barAcc");
const toggleDropElementsAcc = document.getElementById("toggle-elementsAcc");
toggleArrowAcc.addEventListener("click", function (e) {
  if (toggleArrowAcc.src.indexOf("images/chevron-down.png") != -1) {
    toggleArrowAcc.src = "images/chevron-up.png";
    toggleVerticalBarAcc.style.display = "none";
    toggleDropElementsAcc.style.display = "none";
  } else {
    toggleArrowAcc.src = "images/chevron-down.png";
    toggleVerticalBarAcc.style.display = "block";
    toggleDropElementsAcc.style.display = "block";
  }
});
const toggleArrowPref = document.getElementById("nav-dropPref");
const toggleVerticalPref = document.getElementById("toggle-barPref");
const toggleDropElementsPref = document.getElementById("toggle-elementsPref");

toggleArrowPref.addEventListener("click", function (e) {
  if (toggleArrowPref.src.indexOf("images/chevron-down.png") != -1) {
    toggleArrowPref.src = "images/chevron-up.png";
    toggleVerticalPref.style.display = "none";
    toggleDropElementsPref.style.display = "none";
  } else {
    toggleArrowPref.src = "images/chevron-down.png";
    toggleVerticalPref.style.display = "block";
    toggleDropElementsPref.style.display = "block";
  }
});

const search = document.getElementById("search-input");
const search_image = document.getElementById("search-img");

search.addEventListener("focus", function () {
  search_image.src = "images/times.png";
  search_image.style.height = "1.2rem";
});

search.addEventListener("focusout", function () {
  search_image.src = "images/search.png";
});

search.addEventListener("input", function () {
  document.getElementById("banners").style.display = "none";
});

if (search_image.src === "images/times.png") {
  search_image.addEventListener("click", function () {
    search.value = "";
  });
}

search.addEventListener("input", function () {
  document.getElementById("search-results").style.display = "flex";
});

// search.addEventListener("focusout", function () {
//   document.getElementById("search-results").style.display = "none";
// });

async function fetchData(query) {
  const response = await fetch(
    `https://staging.staging.b2brain.com/search/autocomplete_org_all?q=${query}`,
    {
      method: "GET",
    }
  );
  const data = await response.json();
  console.log(data);
  const elements = data
    .map((value, index) => {
      const elements = `
      <div style="display:flex;justify-content:space-between;">
        <div id="similar-elements">
        ${
          value.logo === "" ? (
            `<div style="position:relative;">
              <img id="similar-img" src="images/Logo.png" alt="logo" />
              <h1
                style="position:absolute; 
                top: 50%;
                left: 50%;
                transform: translate(-50%, -60%);
                color:white;
                font-weight:bold;
                ">
                ${value.company.substring(0,1)}
              </h1>
            </div>`
          ) : (
            `<img id="similar-img" src="images/harrow.png" alt="logo" />`
          )
        }
          
          <div id="similar-nested">
            <p id="similar-title">${value.company}</p>
            <p id="similar-website">${value.website}</p>  
          </div>
        </div>
        <button data-org=${value.company} data-slug=${
        value.slug
      } id="similar-button">Track</button>
      </div>
    `;
      return elements;
    })
    .join("");
  document.getElementById("similar-grid").innerHTML = elements;
  const track = document.querySelectorAll("#similar-button");
  track.forEach((value, index) => {
    value.addEventListener("click", function () {
      value.style.background =
        "url('images/spinner.png') no-repeat center left";
      value.style.backgroundSize = "0.8rem 0.8rem";

      let date = new Date();
      setTimeout(function () {
        value.style.background = "white";
        value.textContent = "Tracking";
        value.style.border = "1.5px solid rgba(26, 171, 43, 1)";
        value.style.color = "rgba(26, 171, 43, 1)";
        console.log(
          `${value.dataset.org}(org name) with ${value.dataset.slug}(slug) at ${date}(date)`
        );
      }, 1000);
    });
  });
}

search.addEventListener("input", function (e) {
  let query = e.target.value;
  fetchData(query);
});
