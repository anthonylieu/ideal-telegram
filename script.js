$(document).ready(function () {
  // get the current hour using moment.js
  var currentHour = moment().hours();

  // loop through each time block
  $(".time-block").each(function () {
    // get the data-time attribute of the time block
    var blockHour = parseInt($(this).attr("data-time"));

    // add past, present, or future class based on the current hour
    if (blockHour < currentHour) {
      $(this).addClass("past");
    } else if (blockHour === currentHour) {
      $(this).addClass("present");
    } else {
      $(this).addClass("future");
    }
  });
});
