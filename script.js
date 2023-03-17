$(function () {
  // Add a listener for click events on the save button. This code should use
  // the id in the containing time-block as a key to save the user input in
  // local storage.
  $(".saveBtn").on("click", function () {
    const hour = $(this).parent().attr("id");
    const description = $(this).siblings(".description").val();
    localStorage.setItem(hour, description);
  });
  
  // Apply the past, present, or future class to each time block by comparing
  // the id to the current hour.
  const hours = [
    "9AM",
    "10AM",
    "11AM",
    "12PM",
    "1PM",
    "2PM",
    "3PM",
    "4PM",
    "5PM",
  ];
  const now = dayjs();
  hours.forEach((hour) => {
    const id = `hour-${hour.replace(/[^A-Za-z0-9]/g, "")}`;
    const isBefore = now.isBefore(dayjs(hour, "hA"), "hour");
    const isAfter = now.isAfter(dayjs(hour, "hA"), "hour");
    const timeBlock = $(`#${id}`);
    if (isBefore) {
      timeBlock.addClass("future").removeClass("present past");
    } else if (isAfter) {
      timeBlock.addClass("past").removeClass("present future");
    } else {
      timeBlock.addClass("present").removeClass("past future");
    }
  });

  // Get any user input that was saved in localStorage and set the values of
  // the corresponding textarea elements.
  const savedData = JSON.parse(localStorage.getItem("savedData")) || {};
  Object.entries(savedData).forEach(([hour, description]) => {
    const id = hour.replace(/\s/g, "");
    $(`#${id} .description`).val(description);
  });

  // Save user input to localStorage whenever a textarea element loses focus.
  $("textarea").on("blur", function () {
    const hour = $(this).parent().attr("id");
    const description = $(this).val();
    const savedData = JSON.parse(localStorage.getItem("savedData")) || {};
    savedData[hour] = description;
    localStorage.setItem("savedData", JSON.stringify(savedData));
  });

  // Display the current date in the header of the page.
  const currentDate = now.format("dddd, MMMM D");
  $("#currentDay").text(currentDate);
});