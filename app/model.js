export function changePage(pageID, subPage, callback, callbackTwo) {
  //getting the subpage id & navigating with url
  if (
    subPage == undefined &&
    pageID != "createRecipe" &&
    pageID != "yourRecipes" &&
    pageID != "viewRecipe" &&
    pageID != "login"
  ) {
    $.get(`pages/${pageID}/${pageID}.html`, function (data) {
      $("#app").html(data);
      //error if subpage id can't be found
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page cannot be found.");
      }
    });
    //getting the page id & navigating with url
  } else if (pageID == "createRecipe") {
    $.get(`pages/createRecipe/createRecipe.html`, function (data) {
      $("#app").html(data);

      callback();
      //error if subpage id can't be found
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page cannot be found.");
      }
    });
  } else if (pageID == "yourRecipes") {
    $.get(`pages/yourRecipes/yourRecipes.html`, function (data) {
      $("#app").html(data);

      callback();
      callbackTwo();
      //error if subpage id can't be found
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page cannot be found.");
      }
    });
  } else if (pageID == "viewRecipe") {
    $.get(`pages/viewRecipe/viewRecipe.html`, function (data) {
      $("#app").html(data);

      // callback();
      //error if subpage id can't be found
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page cannot be found.");
      }
    });
  } else if (pageID == "editRecipe") {
    $.get(`pages/editRecipe/editRecipe.html`, function (data) {
      $("#app").html(data);

      // callback();
      //error if subpage id can't be found
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page cannot be found.");
      }
    });
  } else if (pageID == "login") {
    $.get(`pages/login/login.html`, function (data) {
      $("#app").html(data);
      // login();
      callback();
      //error if page id can't be found
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page cannot be found.");
      }
    });
  } else {
    $.get(`pages/${pageID}/${subPage}.html`, function (data) {
      $("#app").html(data);
      //error if page id can't be found
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page cannot be found.");
      }
    });
  }
}
