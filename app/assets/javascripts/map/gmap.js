// $(window).load(function() {
//    loadScript();
// });

var map = '';
var poly;

var infowindow1;

// alert(gon.city.name);
// //alert(gon.units);
// alert(gon.questions);
// alert(gon.locations);

var questions = gon.questions;
// alert(questions[1].content);

var locations = gon.locations;

var correctQuestions = 0;

var previousIndex;

function initialize() {
//   var mapOptions = {
//     center: new google.maps.LatLng(-34.397, 150.644),
//     zoom: 8,
//     streetViewControl: true,
//     //mapTypeId: google.maps.MapTypeId.NORMAL
//   };
// // initializing map
//   map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);


  //var newYork = new google.maps.LatLng(40.729884, -73.99079899999998);
  //var newYork = new google.maps.LatLng(40.751759, -73.982151); //heading 30 pitch 8
  var playCity = new google.maps.LatLng(gon.city.latitude, gon.city.longitude);
  var paris = new google.maps.LatLng(48.851687, 2.351716);
  //var boston = new google.maps.LatLng(42.345573, -71.098326);
  //var loc = new google.maps.LatLng(40.731662, -73.998764);

  var panoramaOptions = {
    position: playCity,
    pov: {
      heading: 200,
      pitch: 3,
    },
    zoom: 0
  };
  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
  //map.setStreetView(panorama);
  panorama.setVisible(true);

  // //To get the latitude and longitude from the street view map
  // google.maps.event.addListener(panorama, 'position_changed', function() {
  //   var positionCell = document.getElementById('position_cell');
  //   positionCell.firstChild.nodeValue = panorama.getPosition() + '';
  // });

  // Loop for questions and locations
  // for (var i = 0; i < 7; i++) {
    correctQuestions = 0;
    var unique = [];
    var loop = 0;
    var index =0;
    var infoWindowContent = [];
    locations.forEach( function (location){
      var questionLocation = new google.maps.LatLng(location.latitude, location.longitude);
      var questionMarker = createMarker(questionLocation, panorama, "Hello I'm Question " + location.number);

      var x = getRandomInt(0,questions.length-1);
      console.log("random " + x);
      
      var i = 0;
      for (i; i < unique.length; i++) {
        if(unique[i] == x){
          x = getRandomInt(0,questions.length-1);
          console.log("alternate random " + x);
          i = -1;
        }
        console.log("*" + i);
      };  

      unique.push(x);
      // var x = location.number;
      
      console.log(unique[loop]);
      console.log("===============");
      loop++;

      var question = '<div>'+
        '<p style="font-size: 1.1em;"><b>Q: ' +  questions[x].content + '</b></p><table><tr>'+ 
        '<td><a class="choice" onclick="javascript:correctAnswer(\'' + x + '\',\'' + questions[x].choice_A + '\',\'' + index + '\')">A: ' + 
        questions[x].choice_A + '</a></td>' +
        '<td><a class="choice" onclick="javascript:correctAnswer(\'' + x + '\',\'' + questions[x].choice_B + '\',\'' + index + '\')">B: ' + 
        questions[x].choice_B + '</a></td></tr>' + 
        '<tr><td><a class="choice" onclick="javascript:correctAnswer(\'' + x + '\',\'' + questions[x].choice_C + '\',\'' + index + '\')">C: ' + 
        questions[x].choice_C + '</a></td>' + 
        '<td><a class="choice" onclick="javascript:correctAnswer(\'' + x + '\',\'' + questions[x].choice_D + '\',\'' + index + '\')">D: ' + 
        questions[x].choice_D + '</a></td></tr></table>' +
        '<div class="pull-left" id="exp"><img src="/assets/wrong-coins.png" id="expImg" alt="explainImg">' +
        '<a class="hint-choice" onclick="javascript:explain(\'' + x + '\',\'' + index + '\')">Explain (-20)&nbsp&nbsp&nbsp</a></div>' +
        '<div class="pull-right"id="rem"><img src="/assets/wrong-coins.png" id="remImg" alt="removeImg">' +
        '<a class="hint-choice" onclick="javascript:removeTwo(\'' + x + '\',\'' + index + '\')">Remove Two (-50)</a></div></div>';

      //infowindow1 = createInfoWindow(question);
      infowindow1 = createInfoWindow("test");
      infoWindowContent[index] = question;
      google.maps.event.addListener(questionMarker, 'click', (function(questionMarker,index){
        return function() {
          //infoWindow.setContent(infoWindowContent[index])
          if(infowindow1.getMap() !== null){
            infowindow1.close();
            questionMarker.setAnimation(google.maps.Animation.BOUNCE);
          }
          else{
            questionMarker.setAnimation(null);
            infowindow1.setContent(infoWindowContent[index]);
            infowindow1.open(panorama, questionMarker);
          }
        }
      })(questionMarker,index));

      previousIndex = index;
      index++;

    });
  // };

  // //To get the latitude and longitude from the street view map
  // google.maps.event.addListener(panorama, 'position_changed', function() {
  //   var positionCell = document.getElementById('position_cell');
  //   positionCell.firstChild.nodeValue = panorama.getPosition() + '';
  // });

  // //Question 1 location, marker and content
  // var Q1 = new google.maps.LatLng(40.729799, -73.99079899999998);
  // var Q1marker = createMarker(Q1, panorama, "Hello I'm Question 1");
  // var Q1Content = '<div>'+
  //   '<p style="font-size: 1.1em;"><b>Q: The Light can refract through ....</b></p>'+
  //   '<table><tr><td><a class="choice" href="javascript:correctAnswer()">A: Water</a></td>' +
  //   '<td><a class="choice" href="#">B: Metal</a></td></tr>' +
  //   '<tr><td><a class="choice" href="#">C: Wood</a></td>' +
  //   '<td><a class="choice" href="#">D: All of the above</a></td></tr></table>' +
  //   '<div class="pull-left"><img src="/assets/wrong-coins.png">' +
  //   '<a class="hint-choice" href="#">Explain (-20)&nbsp&nbsp&nbsp</a></div>' +
  //   '<div class="pull-right"><img src="/assets/wrong-coins.png">' +
  //   '<a class="hint-choice" href="#">Remove Two (-50)</a></div></div>'; 

  //Bonus location, marker and content
  var Bonus = new google.maps.LatLng(40.729424, -73.99087500000002);//40.729700, -73.99079799999000);
  var BonusQuestion = createBonusMarker(Bonus, panorama, "Bonus Tool Tip");
  var BonusContent = '<div class="pull-left">' +
    '<img src="/assets/Empire state.jpg" style="padding-right: 20px;"></div>' +
    '<div class="pull-right">' + 
    '<p><h4>The Empire State Building: </h4></p>' +
    '<p class="bonus">* Where to find me?</p>' +
    '<p>Midtown Manhattan, New York City.</p>' +
    '<p class="bonus">* How tall am I?</p>' +
    '<p>102-story skyscraper.</p>' +
    '<p class="bonus">* How long it took to build me?</p>' +
    '<p>2 years.</p></div>';

  //To pop up Question 1 window
  // var infowindow = createInfoWindow(Q1Content);
  // infowindow1 = createInfoWindow(Q1Content);
  // google.maps.event.addListener(Q1marker, 'click', function() {
  //   if(infowindow1.getMap() !== null){
  //     infowindow1.close();
  //     Q1marker.setAnimation(google.maps.Animation.BOUNCE);
  //   }
  //   else{
  //     Q1marker.setAnimation(null);
  //     infowindow1.open(panorama, Q1marker);
  //   }
  // });

  //To pop up Bonus tool tip window
  var infowindow2 = createInfoWindow(BonusContent);
  google.maps.event.addListener(BonusQuestion, 'click', function() {
    infowindow2.open(panorama, BonusQuestion);
  }); 

  // var question1 = new google.maps.LatLng(40.72991, -73.99082499999997); 
  // var question2 = new google.maps.LatLng(40.729795, -73.99073699999997);
  // var question3 = new google.maps.LatLng(40.729981, -73.990656);
  // var question4 = new google.maps.LatLng(40.729887, -73.99069199999997);
  // var question5 = new google.maps.LatLng(40.729796, -73.99054899999999);
  // var question6 = new google.maps.LatLng(40.729981, -73.990656);
  // var question7 = new google.maps.LatLng(40.730175, -73.99059999999997);
  // createMarker(question1, panorama, "Hello Ana question1")
  // createMarker(question2, panorama, "Hello Ana question2")
  // createMarker(question3, panorama, "Hello Ana question3")
  // createMarker(question4, panorama, "Hello Ana question4")
  // createMarker(question5, panorama, "Hello Ana question5")
  // createMarker(question6, panorama, "Hello Ana question6")
  // createMarker(question7, panorama, "Hello Ana question7")
}

function createImage(url){
  var image = {
    url: url,
    // This marker is 32 pixels wide by 32 pixels tall.
    size: new google.maps.Size(55, 70),
    // The origin for this image is 0,0.
    origin: new google.maps.Point(0,0),
    // The anchor for this image is the base of the flagpole at 0,32.
    anchor: new google.maps.Point(0, 32)
  };
  return image;
}

var marker;
function createMarker(coords, panorama, title){
  marker = new google.maps.Marker({
    position: coords,
    map: panorama,
    icon: createImage("/assets/glowQuestion.png"),
    title: title,
    animation: google.maps.Animation.BOUNCE
  });
  return marker;
}

var BonusMarker;
function createBonusMarker(coords, panorama, title){
  BonusMarker = new google.maps.Marker({
    position: coords,
    map: panorama,
    icon: createImage("/assets/BlueLightBulb.png"),
    title: title
  });
  return BonusMarker;
}

var infowindow;
function createInfoWindow(content){
  infowindow = new google.maps.InfoWindow({
      content: content,
  });
  return infowindow;
}

function correctAnswer(index,choice,locIndex){
  console.log(index + "===========" + choice + "========" + locIndex);
  if (questions[index].correct_choice == choice) {
    // Displaying the clues and the question correctly solved
    infowindow1.setContent('');
    var content = "<div><h4 class='clues-text'>(1) Clues to find next question:</h4>" +
      "<p>" + locations[locIndex].hint + "</p></div>" +
      "<hr><div><p><b>Q:</b>&nbsp " + questions[index].content +
      "<b class='bonus'>&nbsp" + questions[index].correct_choice + "&nbsp&nbsp</b>" +
      "<span class='glyphicon glyphicon-ok correct' aria-hidden='true'>" +
      "</span></p></div>";
    infowindow1.setContent(content);

    // Updating and displaying the score
    var currentScore = document.getElementById("playerScore");
    var currentScoreValue = currentScore.innerHTML;
    currentScoreValue = +currentScoreValue + 100;
    currentScore.innerHTML = currentScoreValue;
    console.log("Before===" + gon.game.score);
    gon.game.score = currentScoreValue;
    gon.game.save;
    console.log("After===" + gon.game.score); 
    // console.log(currentScoreValue);

    //Updating and displaying the questions progress bar 
    var newProgressValue = (((+locIndex+1)/7) * 100);
    $('#playerProgress').attr('aria-valuenow', newProgressValue);
    // console.log("aria-valuenow " + newProgressValue);

    var newProgressWidth = newProgressValue + "%";
    $("#playerProgress").css("width", newProgressWidth);

    var percentage = Math.ceil( newProgressValue );
    $("#playerProgress").html(percentage + "%");
    // console.log(newProgressValue + "==========" + newProgressWidth);

    if(locIndex == 6){
      popup('checkpointCompleted');
    }

    correctSoFar = +gon.game.correct_questions;
    console.log(correctSoFar + "======" + correctQuestions);
    correctQuestions =  correctSoFar + correctQuestions + 1;
    console.log("====" + correctQuestions);

    $.ajax({
        url : "/home/checkpointsMap/play" + gon.game.id + "/" + gon.checkpoint.id + "/" + gon.city.id,
        type : "post",
        data : { score: JSON.stringify(currentScoreValue), correct_questions: JSON.stringify(correctQuestions) }
    });

  }else{
    console.log("wrong answer!!")
    var currentScore = document.getElementById("playerScore");
    var currentScoreValue = currentScore.innerHTML;
    popup('wrongQuestion');
    $.ajax({
        url : "/home/checkpointsMap/play" + gon.game.id + "/" + gon.checkpoint.id + "/" + gon.city.id + "?",
        type : "get",
        data : { score: JSON.stringify(currentScoreValue), correct_questions: JSON.stringify(correctQuestions) }
    });
  }
  previousIndex = locIndex;
}

function removeTwo(index,locIndex) {
  console.log("-------" + locIndex);
  var eliminated = questions[index].eliminated_choices;
  var eliminated_choices_array = eliminated.split(',');
  console.log("eliminated_choices" + eliminated_choices_array[0] + "----" + eliminated_choices_array[1]);
  var choices_array = [];

  choices_array.push(questions[index].choice_A);
  choices_array.push(questions[index].choice_B);
  choices_array.push(questions[index].choice_C);
  choices_array.push(questions[index].choice_D);

  console.log(questions[index].choice_A);
  console.log(questions[index].choice_B);
  console.log(questions[index].choice_C);
  console.log(questions[index].choice_D);

  var indices = [];
  var new_choices = [];

  for (var i = 0; i < choices_array.length; i++) {
    for (var j = 0; j < eliminated_choices_array.length; j++) {
      if (choices_array[i] == eliminated_choices_array[j]) {
        indices.push(i);
      }
    };
  };

  for (var i = 0; i < choices_array.length; i++) {
    if(i != indices[0] && i != indices[1]){
      new_choices.push(choices_array[i]);
    }
  };

  console.log("indices" + indices[0] + "----" + indices[1] + "----" + indices[2] + "----" +indices[3]);
  console.log(new_choices[0] + "------" + new_choices[1])

  var e = $('#exp').children('#expImg');
  var explain = $(e[0]).attr('alt');
  console.log("Explain div ====" + explain);

  if(explain == "explainImg") {
    var content = '<div>'+
        '<p style="font-size: 1.1em;"><b>Q: ' +  questions[index].content + '</b></p><table><tr>'+ 
        '<td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + new_choices[0] + '\',\'' + locIndex + '\')">A: ' + 
        new_choices[0] + '</a></td>' +
        '<td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + new_choices[1] + '\',\'' + locIndex + '\')">B: ' + 
        new_choices[1] + '</a></td></tr></table>' + 
        '<div class="pull-left" id="exp"><img src="/assets/wrong-coins.png">' +
        '<a class="hint-choice" onclick="javascript:explain(\'' + index + '\',\'' + locIndex + '\')">Explain (-20)&nbsp&nbsp&nbsp</a></div>' +
        '</div>';
      } else {
        var exp = questions[index].explaination;
        var content = '<div>'+
            '<p style="font-size: 1.1em;"><b>Q: ' +  questions[index].content + '</b></p><table><tr>'+ 
            '<td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + new_choices[0] + '\',\'' + locIndex + '\')">A: ' + 
            new_choices[0] + '</a></td>' +
            '<td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + new_choices[1] + '\',\'' + locIndex + '\')">B: ' + 
            new_choices[1] + '</a></td></tr></table><br>' +
            '<div style="font-size: 1.1em; color:rgb(242, 130, 130);"> Explaination: ' + exp + '</div></div>';
      }
  
  infowindow1.setContent(content); 

  var currentScore = document.getElementById("playerScore");
    var currentScoreValue = currentScore.innerHTML;
    currentScoreValue = +currentScoreValue - 50;
    currentScore.innerHTML = currentScoreValue;
    console.log("Before===" + gon.game.score);
    gon.game.score = currentScoreValue;
    gon.game.save;
    console.log("After===" + gon.game.score);     
}

function explain(index,locIndex) {
  var exp = questions[index].explaination;
  console.log("======================" + exp);

  var r = $('#rem').children('#remImg');
  var remove = $(r[0]).attr('alt');
  console.log("remove div ====" + remove);

  if(remove == "removeImg"){
    var content = '<div>'+
        '<p style="font-size: 1.1em;"><b>Q: ' +  questions[index].content + '</b></p><table><tr>'+ 
        '<td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + questions[index].choice_A + '\',\'' + locIndex + '\')">A: ' + 
        questions[index].choice_A + '</a></td>' +
        '<td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + questions[index].choice_B + '\',\'' + locIndex + '\')">B: ' + 
        questions[index].choice_B + '</a></td></tr>' + 
        '<tr><td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + questions[index].choice_C + '\',\'' + locIndex + '\')">C: ' + 
        questions[index].choice_C + '</a></td>' + 
        '<td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + questions[index].choice_D + '\',\'' + locIndex + '\')">D: ' + 
        questions[index].choice_D + '</a></td></tr></table><br>' +
        '<div style="font-size: 1.1em; color:rgb(242, 130, 130);"> Explaination: ' + exp + '</div>' +
        '<div class="pull-left" id="rem"><img src="/assets/wrong-coins.png">' +
        '<a class="hint-choice" onclick="javascript:removeTwo(\'' + index + '\',\'' + locIndex + '\')">Remove Two (-50)</a></div></div>';
      } else {
        var eliminated = questions[index].eliminated_choices;
        var eliminated_choices_array = eliminated.split(',');
        var choices_array = [];
        choices_array.push(questions[index].choice_A);
        choices_array.push(questions[index].choice_B);
        choices_array.push(questions[index].choice_C);
        choices_array.push(questions[index].choice_D);
        var indices = [];
        var new_choices = [];
        for (var i = 0; i < choices_array.length; i++) {
          for (var j = 0; j < eliminated_choices_array.length; j++) {
            if (choices_array[i] == eliminated_choices_array[j]) {
              indices.push(i);
            }
          };
        };

        for (var i = 0; i < choices_array.length; i++) {
          if(i != indices[0] && i != indices[1]){
            new_choices.push(choices_array[i]);
          }
        };

        var content = '<div>'+
            '<p style="font-size: 1.1em;"><b>Q: ' +  questions[index].content + '</b></p><table><tr>'+ 
            '<td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + new_choices[0] + '\',\'' + locIndex + '\')">A: ' + 
            new_choices[0] + '</a></td>' +
            '<td><a class="choice" onclick="javascript:correctAnswer(\'' + index + '\',\'' + new_choices[1] + '\',\'' + locIndex + '\')">B: ' + 
            new_choices[1] + '</a></td></tr></table><br>' +
            '<div style="font-size: 1.1em; color:rgb(242, 130, 130);"> Explaination: ' + exp + '</div></div>';
      }

infowindow1.setContent(content);

var currentScore = document.getElementById("playerScore");
    var currentScoreValue = currentScore.innerHTML;
    currentScoreValue = +currentScoreValue - 20;
    currentScore.innerHTML = currentScoreValue;
    console.log("Before===" + gon.game.score);
    gon.game.score = currentScoreValue;
    gon.game.save;
    console.log("After===" + gon.game.score);

}

function goToPreviousLocation() {
  console.log("I am back here" + previousIndex);
  console.log(locations[previousIndex].latitude + "====" + locations[previousIndex].longitude);

  var panoramaOptions = {
    position: new google.maps.LatLng(locations[previousIndex].latitude, locations[previousIndex].longitude),
    pov: {
      heading: 200,
      pitch: 3,
    },
    zoom: 0
  };
  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
  //map.setStreetView(panorama);
  panorama.setVisible(true);
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function loadScript() {
  console.log("map loading ...");
   var script = document.createElement('script');
   script.type = 'text/javascript';
   //'https://maps.googleapis.com/maps/api/js?v=3.exp&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o&sensor=false&libraries=drawing'
   script.src = 'https://maps.googleapis.com/maps/api/js?sensor=false' +
     //'&v=3.14'+
     //'&key=AIzaSyBxrKhxglH3SiFrxh4esBBbicKrb8xHy-k'
     '&callback=initialize';
     //'&key=AIzaSyBJYFdplGeKUUEmGZ-vL4ydiSZ09Khsa_o'+
     //'&libraries=drawing'+
   document.body.appendChild(script);
}