'use strict';

/* Controllers */

function MainCtrl($scope, $http, auth){
	var currentUser;
	var events;

	var directionsDisplay;
    var directionsService = new google.maps.DirectionsService();
    var map;
    var stepDisplay;
    var markerArray = [];



      
            function success(position) {
   
                //location checker
              var s = document.querySelector('#status');
                if (s.className == 'success') {
                    // if "allow" for gps has already been set
                    return;
                }
                s.innerHTML = "found you!";
                s.className = 'success';
                
                //setup map
                var mapcanvas = document.createElement('div');
                mapcanvas.id = 'mapcanvas';
                mapcanvas.style.height = '400px';
                mapcanvas.style.width = '560px';
                document.querySelector('statusChecker').appendChild(mapcanvas);
                
                //options and initialization for map
                  //marker for user position
                var positionMarker = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);          
                var myOptions = {
                    zoom: 9,
                    center: positionMarker,
                    mapTypeControl: false,
                    scaleControl: true,
                    navigationControlOptions: {style: google.maps.NavigationControlStyle.SMALL},
                    mapTypeId: google.maps.MapTypeId.ROADMAP
                };
                map = new google.maps.Map(document.getElementById("mapcanvas"), myOptions);
          
         
             
                var marker = new google.maps.Marker({
                     position: positionMarker,
                     map: map,
                     icon: 'http://www.google.com/mapfiles/arrow.png',
                     title:"You are here!"
                });
                
                var _scope = angular.element(jQuery('body')).scope();
                _scope.addEventstoMap(position.coords.latitude, position.coords.longitude);
            }

            function error(msg) {
                var s = document.querySelector('#status');
                s.innerHTML = typeof msg == 'string' ? msg : "failed";
                s.className = 'fail';

                // console.log(arguments);
            }

            function Findlocation(){
                if (navigator.geolocation) {
                    navigator.geolocation.getCurrentPosition(success, error);
                } else {
                    error('not supported');
                }
            }



	$scope.updateUserInfo = function(response) {
		FB.api('/me', function(response) {
			var imgUrl = 'https://graph.facebook.com/' + response.id + '/picture';
			currentUser= {
				first_name: response.first_name,
				last_name: response.last_name,
				email: response.id,
				imageUrl: imgUrl
			};

			//var _scope = angular.element(jQuery('body')).scope();
			$scope.$apply();
			//document.getElementById('user-info').innerHTML = '<img src="https://graph.facebook.com/' + response.id + '/picture">' + response.name + ', email: ' +response.email;
		});

		FB.api('/me/events', function(response){
			var allEvents=response.data;
			//remove past events
			events =[];
			var nowMoment = moment();
			for(var i=0; i<allEvents.length; i++){
				var eventMoment = moment(allEvents[i].start_time);
				//console.log("nowDiff " + nowMoment.diff(eventMoment));
				if(nowMoment.diff(eventMoment) < 0){
					events.push(allEvents[i]);
				}
			}
			//console.log(JSON.stringify(events));
			Findlocation();
			//events=response.data;
			$scope.$apply();
			
		});
		
	};

	$scope.addEventstoMap = function(latitude, longitude){
        // console.log("adding events to map: " + JSON.stringify(events));
		var basedLocation = new google.maps.LatLng(latitude, longitude);
		var service = new google.maps.places.PlacesService(map);
		for(var i=0; i<events.length; i++){
/*
			var marker = new google.maps.Marker({
			    map: map,
		        position: results[0].geometry.location,
	            title: events[i].name
	        });*/


	 		var request = {
    			location: basedLocation,
    			radius: '5000',
    			query: events[i].location
  			};

  			
  			service.textSearch(request, function(results, status){
  				if (status == google.maps.places.PlacesServiceStatus.OK) {
  						console.log("adding marker for " + results[0].name + ", location: "+ results[0].geometry.location);
      					var marker = new google.maps.Marker({
			    			map: map,
		        			position: results[0].geometry.location,
	            			title: results[0].name
	        			});	
	        			console.log("Success");
  				}
  			});
        }
	};

	$scope.currentUser = function() { 
		return currentUser;
	};

	$scope.events = function(){
	
		return events;
	};

  $scope.data = function(){
    $http.getData().success(function(data){
        var udata = console.log('here is the data: ' +JSON.stringify(data));
        return udata;
    });
  };

}