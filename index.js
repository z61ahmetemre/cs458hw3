	    var map;
		var geocoder;
		var adress;
		var currentLocationn;
		var dst1;
		var dst2;
		var dst3;
		var dst4;
		var dst5;
		
      	function initMap() {
			geocoder = new google.maps.Geocoder();
        	map = new google.maps.Map(document.getElementById('map'), {
          		center: {lat: -34.397, lng: 150.644},
          		zoom: 8
			});
		
      	}
		
		var x;
		var y;
		function getLocation() {
			var success = -1;
			x = document.getElementById('Xcoor').value;
			y = document.getElementById('Ycoor').value;
			setTimeout(function(){
    			where(x,y);
				success = 1;
			}, 2000);
			return success;
		}
		
		function where( x, y){
			var success = -1;
			var myDiv = document.getElementById("test");
			var location = document.getElementById("location");
			location.innerHTML = "Your location is unknown!" + document.getElementById("Xcoor").value + "---" + document.getElementById("Ycoor").value 	;
			var myLL = new google.maps.LatLng( x, y);
			map = new google.maps.Map(document.getElementById('map'), {
          	center: myLL,
          	zoom: 8
        	});
			
			var address = document.getElementById( 'Xcoor').value + "," + document.getElementById( 'Ycoor').value;
			geocoder.geocode( { 'address' : address}, function( results, status) {
				if(status == 'OK') {
					map.setCenter(results[0].geometry.location);
					location.innerHTML = "Your location is " + results[0].formatted_address;
					adress = results[0].formatted_address;
					var marker = new google.maps.Marker( {
					map: map,
            		position: results[0].geometry.location
					});
					success = 1;
				} else {
					success = 0;
					alert('Geocode failed: ' + status);
				}
			});
			return success;
      	}
		 
		
		function currentLocation() {
			var pos;
			var success = -1;
			if (navigator.geolocation) {
			  	navigator.geolocation.getCurrentPosition(function(position) {
				pos = {lat: position.coords.latitude, lng: position.coords.longitude};
				currentLocationn = pos;
				
				map.setCenter(pos);
				var marker = new google.maps.Marker( {
					map: map,
					position: pos
				});
			   }, function() {
				handleLocationError(true, infoWindow, map.getCenter());
			   });
			   success = 1;
			} else {
			  // Browser doesn't support Geolocation
			  success = 0;
			  handleLocationError(false, infoWindow, map.getCenter());
			}
			return success;
		}
		
		adressAnkara = {lat: 39.925533, lng: 32.866287};
		adressIstanbul = {lat: 41.015137, lng: 28.979530};
		adressEskisehir = {lat: 39.766193, lng: 30.526714};
		adressTrabzon = {lat: 41.002697, lng: 39.716763};
		adressAdana = {lat: 37.000000, lng: 35.321335};
		
		var arrAddress = [adressAnkara, adressIstanbul, adressEskisehir, adressTrabzon, adressAdana];
		var dsts = [ dst1, dst2, dst3, dst4, dst5];
		
		function calculateDistanceTocity() {
			var success = 0;
			setTimeout(function() {
				distanceToCity( arrAddress[0], 0);
				distanceToCity( arrAddress[1], 1);
				distanceToCity( arrAddress[2], 2);
				distanceToCity( arrAddress[3], 3);
				distanceToCity( arrAddress[4], 4);
				
			},2000);
			setTimeout(function(){
				calculateNearest();
				success = 1;
			},2000);
			return success;
		}

		function distanceToCity(addresses,index) {
				var success = -1;
				var distanceService = new google.maps.DistanceMatrixService();
				
				distanceService.getDistanceMatrix({
					origins: [addresses],
					destinations: [currentLocationn],
					travelMode: "DRIVING",
					unitSystem: google.maps.UnitSystem.METRIC,
					durationInTraffic: true,
					avoidHighways: false,
					avoidTolls: false
				},
				function (response, status) {
					if (status !== google.maps.DistanceMatrixStatus.OK) {
						console.log('Error:', status);
						success = 0;
					} else {
						console.log(response);
						success = 1;
						dsts[index] = response.rows[0].elements[0].distance.text;
					}
				});
			return success;
		}
		
		function calculateNearest() {
			var success = 0;
			setTimeout(function(){
    			//do what you need here
				dsts.sort();
				document.getElementById('location2').innerHTML = "You are far from the city center " + dsts[0];
				success = 1;
			}, 2000);
			return success;
		}
			
		
		
		function handleLocationError(browserHasGeolocation, infoWindow, pos) {
			infoWindow.setPosition(pos);
			infoWindow.setContent(browserHasGeolocation ?
								  'Error: The Geolocation service failed.' :
								  'Error: Your browser doesn\'t support geolocation.');
			infoWindow.open(map);
		}	
			
		
		function distanceToEarth() {
			var success = -1;
			var distanceService = new google.maps.DistanceMatrixService();
			var adress2 = {lat: 40.552750, lng: 34.959420};
			distanceService.getDistanceMatrix({
				origins: [adress2],
				destinations: [currentLocationn],
				travelMode: "DRIVING",
				unitSystem: google.maps.UnitSystem.METRIC,
				durationInTraffic: true,
				avoidHighways: false,
				avoidTolls: false
				},
				function (response, status) {
					if (status !== google.maps.DistanceMatrixStatus.OK) {
						console.log('Error:', status);
						success = 0;
					} else {
						console.log(response);
						
						document.getElementById('location3').innerHTML="You are far from the earth center " + response.rows[0].elements[0].distance.text;
						success = 1;
					}
				});
				return success;
		}

   module.exports = { getLocation, where, currentLocation, calculateDistanceTocity, calculateNearest, distanceToCity, distanceToEarth};