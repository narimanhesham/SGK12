$(window).load(function() {
   loadScript();
});

var map = '';
var poly;

var infowindow1;

 function initialize() {
//   var mapOptions = {
//     center: new google.maps.LatLng(-34.397, 150.644),
//     zoom: 8,
//     streetViewControl: true,
//     //mapTypeId: google.maps.MapTypeId.NORMAL
//   };
// // initializing map
//   map = new google.maps.Map(document.getElementById("map-canvas"),mapOptions);


  var newYork = new google.maps.LatLng(40.729884, -73.990988);
  //var boston = new google.maps.LatLng(42.345573, -71.098326);
  //var loc = new google.maps.LatLng(40.731662, -73.998764);

  var panoramaOptions = {
    position: newYork,
    pov: {
      heading: 200,
      pitch: 3,
    },
    zoom: 0
  };
  var panorama = new google.maps.StreetViewPanorama(document.getElementById('pano'), panoramaOptions);
  //map.setStreetView(panorama);
  panorama.setVisible(true);

  //Question 1 location, marker and content
  var Q1 = new google.maps.LatLng(40.729799, -73.99079899999998);
  var Q1marker = createMarker(Q1, panorama, "Hello I'm Question 1");
  var Q1Content = '<div>'+
    '<p style="font-size: 1.1em;"><b>The Light can refract through ....</b></p>'+
    '<table><tr><td><a class="choice" href="javascript:correctAnswer()">A: Water</a></td>' +
    '<td><a class="choice" href="#">B: Metal</a></td></tr>' +
    '<tr><td><a class="choice" href="#">C: Wood</a></td>' +
    '<td><a class="choice" href="#">D: All of the above</a></td></tr></table>' +
    '<a class="btn btn-info pull-right" href="#">Hints</a>';  

  //Bonus location, marker and content
  var Bonus = new google.maps.LatLng(40.729424, -73.99087500000002);//40.729700, -73.99079799999000);
  var BonusQuestion = createBonusMarker(Bonus, panorama, "Bonus Tool Tip");
  var BonusContent = '<div class="pull-left">' +
    '<img src="/assets/Empire state.jpg" style="padding-right: 20px;"></div>' +
    '<div class="pull-right">' + 
    '<p><h4><u>The Empire State Building:</u></h4></p>' +
    '<p class="bonus">* Where to find me?</p>' +
    '<p>Midtown Manhattan, New York City.</p>' +
    '<p class="bonus">* How tall am I?</p>' +
    '<p>102-story skyscraper.</p>' +
    '<p class="bonus">* How long it took to build me?</p>' +
    '<p>2 years.</p></div>';

  //To pop up Question 1 window
  // var infowindow = createInfoWindow(Q1Content);
  infowindow1 = createInfoWindow(Q1Content);
  google.maps.event.addListener(Q1marker, 'click', function() {
    if(infowindow1.getMap() !== null){
      infowindow1.close();
      Q1marker.setAnimation(google.maps.Animation.BOUNCE);
    }
    else{
      Q1marker.setAnimation(null);
      infowindow1.open(panorama, Q1marker);
    }
  });

  //To pop up Bonus tool tip window
  var infowindow2 = createInfoWindow(BonusContent);
  google.maps.event.addListener(BonusQuestion, 'click', function() {
    infowindow2.open(panorama, BonusQuestion);
  }); 

  //To get the latitude and longitude from the street view map
  // google.maps.event.addListener(panorama, 'position_changed', function() {
  //   var positionCell = document.getElementById('position_cell');
  //   positionCell.firstChild.nodeValue = panorama.getPosition() + '';
  // });

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

function correctAnswer(){
  infowindow1.setContent('');
  var content = "<div><h3>Clues to find next question:</h3></div>" +
    "<div><p>The Light can refract through" +
    "<b class='bonus'>&nbspWater</b></p></div>";
  infowindow1.setContent(content);
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