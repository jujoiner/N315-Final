import * as MODEL from "./model.js";

var ingredCnt = 3;
var instrCnt = 3;

function route() {
  let hashTag = window.location.hash;
  //replace hashtag with a slash in url
  let pageID = hashTag.replace("#", "");
  let pageIDArray = pageID.split("/");
  pageID = pageIDArray[0];
  let subPageID = pageIDArray[1];
  //direct to home page, make it the the default page
  if (pageID == "" || pageID == "home") {
    MODEL.changePage("home");
  } else if (pageID == "createRecipe") {
    MODEL.changePage(pageID, subPageID, addRecipeToDB);
  } else if (pageID == "yourRecipes") {
    MODEL.changePage(pageID, subPageID, addRecipeToYourRecipesPG, editRecipe);
  } else if (pageID == "viewRecipe") {
    MODEL.changePage(pageID, subPageID, editRecipe);
  } else {
    //direct subpages
    if (pageID == subPageID) {
      MODEL.changePage(subPageID);
    } else {
      MODEL.changePage(pageID, subPageID);
    }
  }
}

function login() {
  console.log("Yo");

  $("#signup").on("click", (e) => {
    console.log("Yo");
    e.preventDefault();
    let allUsers = JSON.parse(localStorage.getItem("Person"));

    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let pn = $("#signpassword").val();
    let ea = $("#signemail").val();

    // make it required for  first name, last name, email, and a password to be input
    if (fn != "" && ln != "" && pn != "" && ea != "") {
      let userObj = {
        fName: fn,
        lName: ln,
        password: pn,
        email: ea,
      };
      allUsers.push(userObj);
      //console.log(users);
      localStorage.setItem("Person", JSON.stringify(allUsers));

      $("#firstName").val("");
      $("#lastName").val("");
      $("#age").val("");
      $("#password").val("");
      $("#email").val("");
    } else {
      Swal.fire({
        title: "Fill out all feilds!",
        icon: "warning",
        showCancelButton: false,
        showConfirmButton: true,
      });
    }
  });

  $("#logbox-input").on("click", (e) => {
    e.preventDefault();

    //question v
    $("#app").html("");

    console.log("Yo");
    let allUsers = JSON.parse(localStorage.getItem("Person"));

    let pn = $("#logpassword").val();
    let ea = $("#logemail").val();

    // make it required for  first name, last name, email, and a password to be input
    if (pn != "" && ea != "") {
      let userObj = {
        password: pn,
        email: ea,
      };
      // $.each(allUsers, function (idx, user) {
      //   console.log(user.fName);
      $("#navigation").append(
        `<div class="logo">
         <a href="#home"><img src="assets/images/logo.svg" /></a>
       </div>
 
       <div class="links">
         <a href="#home">Home</a>
         <a href="#browse">Browse</a>
         <a href="#createRecipe">Create Recipe</a>
         <a href="#yourRecipes">Your Recipes</a>
         <div id="log_btn">
          <a href="#login">Login</a>
        </div>
      </div>`
      );
      $(".copyright").append(
        `<div class="links">
        <a id="#login" href="#">Login</a>
        <a id="#Category" href="#">Recipes by Category</a>
        <a id="#Copyright" href="#">Privacy and Copyright</a>
        <a id="#recipe" href="#">Create Recipe</a>
        <a id="#" href="#">Your Recipes</a>
      </div>`
      );
      // });
    }
  });
}

//Add recipe to site
function addRecipeToDB() {
  $(".ingredients-recipe-inputs .addBtn-ingred").on("click", (e) => {
    e.preventDefault();
    // console.log("ingred click");
    $(".ingredients-recipe-inputs").append(
      `<input type="text" id="ingred${ingredCnt}" placeholder="Ingredient #${
        ingredCnt + 1
      }" />`
    );
    ingredCnt++;
  });

  $(".addBtn-instr").on("click", (e) => {
    e.preventDefault();
    // console.log("instr click");
    $(".instructions-recipe-inputs").append(
      `<input type="text" id="step${instrCnt}" placeholder="Instruction #${
        instrCnt + 1
      }" />`
    );
    instrCnt++;
  });

  $("#createRecipe-addRecipe-btn").on("click", (e) => {
    e.preventDefault();
    console.log("create recipe clicked");

    let myRecipes = JSON.parse(localStorage.getItem("Recipe"));

    let recipe = {
      id: myRecipes.length,
      title: "",
      desc: "",
      time: "",
      size: "",
      instr: [],
      ingred: [],
    };

    var recipeTitle = $("#addRecipeName").val();
    recipe.title = recipeTitle;
    // console.log(recipe.title);

    var recipeDesc = $("#addRecipeDesc").val();
    recipe.desc = recipeDesc;
    // console.log(recipe.desc);

    var recipeTime = $("#addRecipeTime").val();
    recipe.time = recipeTime;
    // console.log(recipe.time);

    var recipeSize = $("#addRecipeSize").val();
    recipe.size = recipeSize;
    // console.log(recipe.size);

    $(".ingredients-recipe-inputs input").each((idx, ingred) => {
      recipe.ingred.push(ingred.value);
      // console.log(recipe.ingred);
    });

    $(".instructions-recipe-inputs input").each((idx, instr) => {
      recipe.instr.push(instr.value);
      // console.log(recipe.instr);
    });

    myRecipes.push(recipe);
    localStorage.setItem("Recipe", JSON.stringify(myRecipes));
    console.log(localStorage.getItem("Recipe"));
    Swal.fire({
      title: "<strong>You added a recipe!</strong>",
      html: "Check it out on your recipe page.",
      showCloseButton: true,
      showCancelButton: true,
      focusConfirm: false,
      confirmButtonText: "Add another recipe.",
      cancelButtonText: '<a href="#yourRecipes">Check it out!</a>',
    });
  });
}

function addRecipeToYourRecipesPG() {
  $(".yourRecipes-list").html(``);

  let myRecipes = JSON.parse(localStorage.getItem("Recipe"));
  $.each(myRecipes, (idx, recipe) => {
    $(".yourRecipes-list").append(`
    <div class="yourRecipes-list_item">
      <div class="yourRecipes-list_item-inner-container">
        <div class="yourRecipes-list_item-image">
          <input type="submit" id="viewRecipe" value="View" />
        </div>
        <div class="yourRecipes-list_item-info">
          <div class="yourRecipes-list_item-info-title">${recipe.title}</div>
          <div class="yourRecipes-list_item-info-desc">${recipe.desc}</div>
          <div class="yourRecipes-list_item-info-time">
            <img src="../../assets/images/time.svg" alt="" />
            ${recipe.time}
          </div>
          <div class="yourRecipes-list_item-info-serving">
            <img src="../../assets/images/servings.svg" alt="" />
            ${recipe.size}
          </div>
        </div>
      </div>
      <div class="yourRecipes-list_item-buttons">
        <input type="submit" id="editRecipe" value="Edit Recipe" />
        <input type="submit" id="deleteRecipe" value="Delete" />
      </div>
    </div>
`);
  });

  //IN PROGRESS
  $("#editRecipe").on("click", (e) => {
    console.log("edit works");
  });

  //IN PROGRESS
  $("#viewRecipe").on("click", (e, id) => {
    $.get(`pages/viewRecipe/viewRecipe.html`, function (data) {
      $("#app").html(data);

      $.each(myRecipes, (idx, recipe) => {
        $(".viewRecipe-page").html(`
        <div class="viewRecipe-page_title"><p>${recipe.title}</p></div>
        <div class="viewRecipe-page_info">
          <div class="viewRecipe-page_infoRow">
            <div class="viewRecipe-image">
              <img src="../../assets/images/recipe-pizza.jpg" alt="" />
            </div>
            <div class="viewRecipe-desc">
              <div class="viewRecipe-descTitle">Description:</div>
              <div class="viewRecipe-descContent">
              ${recipe.desc}
              </div>
              <div class="viewRecipe-descTime">
                <p class="viewRecipe-descTime1">Total Time:</p>
                <p class="viewRecipe-descTime2">${recipe.time}</p>
              </div>
              <div class="viewRecipe-descServings">
                <p class="viewRecipe-descServings1">Servings:</p>
                <p class="viewRecipe-descServings2">${recipe.size}</p>
              </div>
            </div>
          </div>
  
          <div class="viewRecipe-page_infoCol">
            <div class="viewRecipe-ingredTitle">Ingredients:</div>
            <div class="viewRecipe-ingreds">
            ${recipe.ingred[0]}
            ${recipe.ingred[1]}
            ${recipe.ingred[2]}
            </div>
            <div class="viewRecipe-instructTitle">Instructions:</div>
            <div class="viewRecipe-instructions">
            ${recipe.instr[0]}
            ${recipe.instr[1]}
            ${recipe.instr[2]}
            </div>
            <input type="submit" id="viewRecipe-editRecipe-btn" value="Edit Recipe" />
          </div>
        </div>
    `);

        //IN PROGRESS
        $("#viewRecipe-editRecipe-btn").on("click", (e) => {
          console.log("view edit btn works");
        });
      });
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page cannot be found.");
      }
    });
  });

  //IN PROGRESS
  $("#deleteRecipe").on("click", (e) => {
    console.log("delete works");
    localStorage.removeItem("Recipe");
  });
}

//IN PROGRESS
function editRecipe() {
  $("#editRecipe").on("click", (e) => {
    console.log("EditRecipe Btn Works");
  });
}

//Initializing functions
function initApp() {
  $(window).on("hashchange", route);
  route();

  if (localStorage) {
    let recipe = localStorage.getItem("Recipe");
    if (recipe) {
      let myRecipes = JSON.parse(localStorage.getItem("Recipe"));
      console.log("recipes");
    } else {
      localStorage.setItem("Recipe", "[]");
      // alert("No recipes added yet");
    }
  } else {
    console.log("No localStorage");
  }
  login();
  initSite();
}

function initSite() {
  if (localStorage) {
    let people = localStorage.getItem("Person");
    // console.log(people);
    if (people) {
      let persons = JSON.parse(localStorage.getItem("Person"));
      console.log(persons);
    } else {
      localStorage.setItem("Person", "[]");
      Swal.fire({
        title: "No users have been added yet.",
        icon: "warning",
        showCancelButton: false,
        showConfirmButton: true,
      });
    }
  } else {
    console.log("No local storage found");
  }
}

$(document).ready(function () {
  initApp();
});
