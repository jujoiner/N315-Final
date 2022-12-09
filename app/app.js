import * as MODEL from "./model.js";

function route() {
  let hashTag = window.location.hash;
  //replace hashtag with a slash in url
  let pageID = hashTag.replace("#", "");
  let pageIDArray = pageID.split("/");
  pageID = pageIDArray[0];
  let subPageID = pageIDArray[1];

  //direct to home page, make it the the default page
  if (pageID == "") {
    MODEL.changePage("home");
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

  
   $("#signup").on('click',(e) => {
    console.log("Yo");
      e.preventDefault();
      let allUsers = JSON.parse(localStorage.getItem("Person"));
  
    let fn = $("#firstName").val();
    let ln = $("#lastName").val();
    let pn = $("#signpassword").val();
    let ea = $("#signemail").val();
  

    // make it required for  first name, last name, email, and a password to be input
    if ( fn != "" && ln != "" &&
      pn != "" && ea != "") {
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


  
  $("#logbox-input").on("click",(e) => {
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

//Initializing functions
function initApp() {
  $(window).on("hashchange", route);
  route();
  login();
}

function initSite(){
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
  initSite();
});
