
var config = {
    apiKey: "AIzaSyBHEQ-APLOO3Vgn53SdBvN42qsbttnu7sg",
    authDomain: "train-scheduler-34c39.firebaseapp.com",
    databaseURL: "https://train-scheduler-34c39.firebaseio.com",
    projectId: "train-scheduler-34c39",
    storageBucket: "train-scheduler-34c39.appspot.com",
    messagingSenderId: "313340668808"
  };
firebase.initializeApp(config);

var database = firebase.database()

var trainSchedule = database.ref('/trainSchedule')



$("#submitBTN").on("click", function (event) {
    event.preventDefault()
    var name = $("#name").val().trim()
    var destination = $("#destination").val().trim()
    var trainTime = $("#train-time").val().trim()
    var frequency = $("#frequency").val().trim()


    trainSchedule.push({
        name: name,
        destination: destination,
        trainTime: trainTime,
        frequency: frequency
    })

    $("#name").val('')
    $("#destination").val('')
    $("#train-time").val('')
    $("#frequency").val('')

})

trainSchedule.on("child_added", function (snap) {

    var startTime = moment(snap.val().trainTime, 'HH:mm')
    var startDisplay = moment(startTime).format('HH:mm')
    var resetTime = moment(startDisplay, 'HH:mm').subtract(1, 'years')
    var resetDiff = moment().diff(moment(resetTime), 'minutes')
    var frequencyDisplay = parseInt(snap.val().frequency)
    var modulus = resetDiff % frequencyDisplay
    var minutesAway = frequencyDisplay - modulus
    var nextTrain = moment().add(minutesAway, 'minutes')
    var timeDisplay = moment(nextTrain).format("HH:mm")
    $("#table-body").append("<tr><td>" + snap.val().name + "</td><td>" + snap.val().destination + "</td><td>" + frequencyDisplay + "</td><td>" + timeDisplay + "</td><td>" + minutesAway + "</td></tr>")
})


