/* global firebase moment */
// Steps to complete:

// 1. Initialize Firebase
// 2. Create button for adding new employees - then update the html + update the database
// 3. Create a way to retrieve employees from the employee database.
// 4. Create a way to calculate the months worked. Using difference between start and current time.
//    Then use moment.js formatting to set difference in months.
// 5. Calculate Total billed

// 1. Initialize Firebase
var config = {
    apiKey: "AIzaSyCsrvZEyPNzeZuo0KE9rh65gT4Dedj744A",
    authDomain: "train-schedule-6e7a1.firebaseapp.com",
    databaseURL: "https://train-schedule-6e7a1.firebaseio.com",
    projectId: "train-schedule-6e7a1",
    storageBucket: "train-schedule-6e7a1.appspot.com",
    messagingSenderId: "97383319125"
  };

  firebase.initializeApp(config);

  var database = firebase.database();
  
  // 2. Button for adding trains
  $("#add-train-btn").on("click", function(event) {
   event.preventDefault();
    console.log("test");
    // Grabs user input
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#first-time-input").val().trim(), "DD/MM/YY").format("X");
    var trainFreq = $("#frequency-input").val().trim();
  

   
    // Creates local "temporary" object for holding employee data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      firstTime: trainTime,
      frequency: trainFreq,
    };
  
    // Uploads employee data to the database
    database.ref().push(newTrain);
  
    // Logs everything to console
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
  
    // Alert
    alert("Train successfully added");
  
    // Clears all of the text-boxes
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });
  
  // 3. Create Firebase event for adding employee to the database and a row in the html when a user adds an entry
  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log("test");
    console.log(childSnapshot.val());
  
    // Store everything into a variable.
    var newTrainName = childSnapshot.val().name;
    var newTrainDestination = childSnapshot.val().destination;
    var newTrainFirstTime = childSnapshot.val().firstTime;
    var newTrainFreq = childSnapshot.val().frequency;
  
    // Employee Info
    console.log(newTrainName);
    console.log(newTrainDestination);
    console.log(newTrainFirstTime);
    console.log(newTrainFreq);
  
    // Prettify the employee start
    //var empStartPretty = moment.unix(empStart).format("MM/DD/YY");
  
    // Calculate the months worked using hardcore math
    // To calculate the months worked
   // var empMonths = moment().diff(moment(empStart, "X"), "months");
   // console.log(empMonths);
  
    // Calculate the total billed rate
  //  var empBilled = empMonths * empRate;
   // console.log(empBilled);
  
    // Add each train's data into the table
  $("#train-table > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newTrainDestination + "</td><td>" +
  newTrainFirstTime + "</td><td>" + newTrainFreq + "</td><td>");
  });
  
  // Example Time Math
  // -----------------------------------------------------------------------------
  // Assume Employee start date of January 1, 2015
  // Assume current date is March 1, 2016
  
  // We know that this is 15 months.
