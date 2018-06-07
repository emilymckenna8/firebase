
//Initialize Firebase
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
  
  //click event to add trains
  $("#add-train-btn").on("click", function(event) {
   event.preventDefault();
    console.log("test");
 
    var trainName = $("#train-name-input").val().trim();
    var trainDest = $("#destination-input").val().trim();
    var trainTime = moment($("#first-time-input").val().trim(), "HH:mm").format("HH:mm");
    var trainFreq = $("#frequency-input").val().trim();
  

   
//temporary object to hold data
    var newTrain = {
      name: trainName,
      destination: trainDest,
      firstTime: trainTime,
      frequency: trainFreq,
    };
  //push object to firebase 
    
    database.ref().push(newTrain);
  
   //console log to test that data has been pushed
    console.log(newTrain.name);
    console.log(newTrain.destination);
    console.log(newTrain.firstTime);
    console.log(newTrain.frequency);
  
    
    
    alert("Train successfully added");
  
    //empty input boxes
    
    $("#train-name-input").val("");
    $("#destination-input").val("");
    $("#first-time-input").val("");
    $("#frequency-input").val("");
  });
  

  database.ref().on("child_added", function(childSnapshot, prevChildKey) {
    console.log("test");
    console.log(childSnapshot.val());
  
    if (childSnapshot.firstTime !== 'Invalid date') {
    //grabbing data from object
    var newTrainName = childSnapshot.val().name;
    var newTrainDestination = childSnapshot.val().destination;
    var newTrainFirstTime = childSnapshot.val().firstTime;
    var newTrainFreq = childSnapshot.val().frequency;
  
    
    console.log(newTrainName);
    console.log(newTrainDestination);
    console.log(newTrainFirstTime);
    console.log(newTrainFreq);
  

      var trainTimeAdj = moment(newTrainFirstTime, "HH:mm").subtract(1, "years");
      
      rightNow = moment().format("HH:mm");
      

      timeDifference = moment().diff(moment(trainTimeAdj), "minutes");
      
      remainingTime = timeDifference % newTrainFreq;
      

      minAway = newTrainFreq - remainingTime;
     

      nextTrain = moment().add(minAway, "minutes").format("HH:mm");
  //pushing data to table
  $("#train-table > tbody").append("<tr><td>" + newTrainName + "</td><td>" + newTrainDestination + "</td><td>" +
  newTrainFreq + "</td><td>" + nextTrain + "</td><td>" + minAway + "</td>");
    }  
});
  
