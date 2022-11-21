export function changePage(pageID, subPage) {
  //getting the subpage id & navigating with url
  if (subPage == undefined) {
    $.get(`pages/${pageID}/${pageID}.html`, function (data) {
      $("#app").html(data);
      //error if subpage id can't be found
    }).fail((error) => {
      if (error.status == "404") {
        alert("Page cannot be found.");
      }
    });
    //getting the page id & navigating with url
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
