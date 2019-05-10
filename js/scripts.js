//MAIN SELLER SOCIETY PAGE
//Gathers all of the content for the homepage sellers list

$(function() {
  $.ajax({
    url: "csv.php",
    success: function(data) {
      // Convert CSV data to JS Object (JSON). This uses jquery.csv.min.js
      artist_data = $.csv.toObjects(data);

      x = 0;
      artist_data.forEach(function() {
        // Skip this user if the 'is_visible' field is empty or 0 (assuming you have an is_visible field to hide/show people)
        if (artist_data[x]["Visible"] == 0) return;

        // Extract seller image id
        seller_string = artist_data[x]["Seller Photo"];
        seller_id_pos = seller_string.indexOf("id=") + 3;
        seller_id = seller_string.substr(seller_id_pos);

        // Extract 1st product image id
        product1_string = artist_data[x]["Product Photo 1"];
        product1_id_pos = product1_string.indexOf("id=") + 3;
        product1_id = product1_string.substr(product1_id_pos);

        // Extract 2nd product image id
        product2_string = artist_data[x]["Product Photo 2"];
        product2_id_pos = product2_string.indexOf("id=") + 3;
        product2_id = product2_string.substr(product2_id_pos);

        // Extract 3rd product image id
        product3_string = artist_data[x]["Product Photo 3"];
        product3_id_pos = product3_string.indexOf("id=") + 3;
        product3_id = product3_string.substr(product3_id_pos);

        // Loop through all rows in spreadsheet and create a new div for each person
        $(".seller-roster").append(
          `
            <div class="seller-object">
                <div class="seller-object-top">
                    <div class="seller-carousel fotorama" data-loop="true" data-keyboard="true" data-arrows="always" data-fit="cover" data-width="360px" data-height="360px">
                    <img src="https://drive.google.com/thumbnail?id=` +
            product1_id +
            `&sz=w360-h360">
                    <img src="https://drive.google.com/thumbnail?id=` +
            product2_id +
            `&sz=w360-h360">
                    <img src="https://drive.google.com/thumbnail?id=` +
            product3_id +
            `&sz=w360-h360">
                    </div>
                    <div class="seller-photo">
                        <img src="https://drive.google.com/thumbnail?id=` +
            seller_id +
            `">
                    </div>
                </div>
                <div class="seller-object-bottom">
                    <div class="seller-name` +
            x +
            `" id="seller-name-id">
                    <h2>` +
            artist_data[x]["Seller Name"] +
            `</h2>
                    </div>
                    <div class="seller-tagline">
                        <h4>` +
            artist_data[x]["Store Tagline"] +
            `</h4>
                    </div>
                    <div class="seller-description">
                        <p>` +
            artist_data[x]["Store Description"] +
            `</p>
                    </div>
                </div>
                <a href=` +
            artist_data[x]["Store Link"] +
            ` target="_blank" class="no-underline">
                  <div class="seller-button">
                    <h3>Goto Store</h3>
                    <i class="fas fa-external-link-alt"></i>
                  </div>
                </a>
            </div>`
        );

        //Add alumni badge if needed
        if (artist_data[x]["Alumni"] == 1) {
          alumvar = $(".seller-name" + x);
          $(alumvar).append(`<i class="fas fa-graduation-cap"></i>`);
        }

        // Add 1 to x to move to next row of spreadsheet
        x = x + 1;
        $.getScript("../fotorama-4.6.4/fotorama.js", function() {});
      });
    }
  });
});

//
//
//
//
//
//RESOURCES SECTION
//Gathers all of the content for the resources page
$(function() {
  $.ajax({
    url:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vT_NdeXIThX3rS9Jxv4piTtxwDX6GamfK7H1bo2sLNgtqvC_rfUhWCOnoO_MmbCaBLzJKZp_HXM5BGa/pub?output=csv",

    success: function(listing) {
      // Convert CSV data to JS Object (JSON). This uses jquery.csv.min.js
      resource_listing = $.csv.toObjects(listing);

      y = 0;
      resource_listing.forEach(function() {
        // Extract resource image
        resource_string = resource_listing[y]["Resource Image"];
        resource_id_pos = resource_string.indexOf("id=") + 3;
        resource_id = resource_string.substr(resource_id_pos);

        //Sort Resources
        resource_category = resource_listing[y]["Resource Type"];
        if (resource_category == "Print") {
          resource_section = ".print-resources";
        }
        if (resource_category == "Apparel") {
          resource_section = ".apparel-resources";
        }
        if (resource_category == "Web") {
          resource_section = ".web-resources";
        }
        if (resource_category == "Community") {
          resource_section = ".community-resources";
        }
        if (resource_category == "Other") {
          resource_section = ".other-resources";
        }
        $(resource_section).append(
          `
            <a href="` +
            resource_listing[y]["Resource Link"] +
            `" target="_blank" class="resource-object">
              <div class="resource-container">
                <div class="resource-image">
                  <img src="https://drive.google.com/thumbnail?id=` +
            resource_id +
            `">
                </div>
                <div class="resource-info">
                  <div class="resource-name">
                    <h3>` +
            resource_listing[y]["Resource Name"] +
            `</h3>
                 </div>
                  <div class="resource-description">
                    <p>` +
            resource_listing[y]["Resource Description"] +
            `</p>
                  </div>
                </div>
              </div>
            </a>
          `
        );
        y = y + 1;
      });
    }
  });
});

//
//
//
//
//
//GOOD MARKET DATE
//Gathers the Good Market date and location for the homepage
$(function() {
  $.ajax({
    url:
      "https://docs.google.com/spreadsheets/d/e/2PACX-1vRm3o-g40H6E2UKpy9rv7U6HWZkktBy4ZW10cB-kroovZSjIqLolKG3kh5nJXYNkhsOTDikunIRCci3/pub?output=csv",

    success: function(info) {
      // Convert CSV data to JS Object (JSON). This uses jquery.csv.min.js
      good_market_info = $.csv.toObjects(info);
      $(".header-goodmarket-details").append(
        `
          <h2>` +
          good_market_info[0]["Good Market Date"] +
          `</h2>
          <h3>` +
          good_market_info[0]["Good Market Location"] +
          `</h3>
          `
      );
    }
  });
});

//
//
//
//
//
//MOBILE NAV
//Used for styling and functionality on the mobile nav
function mobileNav() {
  var x = document.getElementById("navLinks");
  if (x.className === "nav-links") {
    x.className += " responsive";
    document.getElementById("navIcon").src = "../img/nav_exit.png";
  } else {
    x.className = "nav-links";
    document.getElementById("navIcon").src = "../img/mobile_nav.png";
  }
}
