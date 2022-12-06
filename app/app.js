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
function login(){
  
  $("#signup").click((e) => {
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

  $("#login_btn").click((e) => {
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
    //   $("#app").append(
    //     `<p><b>Full Name:</b> ${user.fName} ${user.lName} <b>Age:</b> ${user.age} <b>Phone Number:</b> ${user.phoneNumber} <b>Email Address:</b> ${user.email} <b>Classes:</b> ${user.classOne} ${user.classTwo} ${user.classThree}</p>`
    //   );
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
        title: "No students have been added yet.",
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
