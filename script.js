$(document).ready(function () {
  // get the current date using moment.js and format it as "dddd, MMMM Do YYYY"
  var currentDate = moment().format("dddd, MMMM Do YYYY");

  // set the text of the #currentDay element to the current date
  $("#currentDay").text(currentDate);

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

    // get the textarea and save button elements for this time block
    var textarea = $(this).find(".description");
    var saveBtn = $(this).find(".saveBtn");

    // set the value of the textarea to the corresponding local storage value, if it exists
    var keyName = "textarea-" + $(this).attr("data-time"); // create a unique key name for this textarea
    var savedValue = localStorage.getItem(keyName);
    if (savedValue !== null) {
      textarea.val(savedValue);
    }

    // add an event listener to the save button that saves the textarea value to local storage
    saveBtn.on("click", function () {
      var value = textarea.val();
      var keyName = "textarea-" + $(this).parent().attr("data-time"); // create a unique key name for this textarea
      localStorage.setItem(keyName, value);
    });
  });
});