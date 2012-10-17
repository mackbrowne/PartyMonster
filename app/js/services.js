'use strict';

/* Services */


// Demonstrate how to register services
// In this case it is a simple value service.
angular.module('myApp.services', []).
  value('version', '0.1');

djApp.factory('auth', function($rootScope) {
    var currentUser;
    var authService = {};
    /*
    if(db){
    	console.log('db exists!');

    }else{
    	console.log('db error');
    }*/

    //testing db
//     document.addEventListener('deviceready', function() {
//     	console.log('laoding');
//     	var savedUser = loadSavedUser();
//     	console.log('savedUser');
//     	setTimeout(function() {
//     		if (savedUser) 	login(savedUser);
//     	},1000);
//     });
    
//     function setSavedUser(user) {
//     	if (user !== null && user !== undefined) {
//     		window.localStorage.setItem('social.currentUser', JSON.stringify(user));
//     	} else {
//     		window.localStorage.removeItem('social.currentUser');
//     	}
//     }
//     function loadSavedUser() {
//     	return JSON.parse(window.localStorage.getItem('social.currentUser') || '{}');
//     }
//     function formatServerUser(user) {
//       return formatUppercaseKeys(user, ['firstName','lastName','imagePath','facebookToken','linkedInToken','email','longitude','latitude','twitterToken','userId']);
//     }
    
//     function login(options) {
//     	var facebookToken = options.facebookToken;
//     	var linkedInToken = options.linkedInToken;
//     	var twitterToken = options.twitterToken;
//     	var firstName = options.firstName;
//     	var lastName = options.lastName;
//     	var imagePath = options.imagePath;
//     	console.log('login() : options = ' + JSON.stringify(options));
//         WL.Client.invokeProcedure({
//           adapter: 'derbySQL',
//           procedure: 'addUser',
//           parameters: [facebookToken, linkedInToken, twitterToken, firstName, lastName, imagePath]
//         }, {
//           onSuccess: function(response) {
//         	console.log("auth.login: Success! Logged in as "+firstName+" "+lastName);
//         	console.log(JSON.stringify(response));
//             currentUser = formatServerUser(response.invocationResult.resultSet[0]);
//             currentUser.IMAGEPATH = currentUser.IMAGEPATH.replace(/\\/g, '');
//             setSavedUser(currentUser);
//             $rootScope.$apply();
//           }, onFailure: function(error) {
//         	console.log("auth.login: invokeProcedure Error! "+JSON.stringify(error));
//           }
//         });
//     };
    
//     function loginManual(email, password){
//     	console.log('Manually Logging In');
//         WL.Client.invokeProcedure({
//           adapter: 'derbySQL',
//           procedure: 'loginManual',
//           parameters: [email, password]
//         }, {
//           onSuccess: function(response) {
        	  
//         	console.log("Manual Login Success!");
//         	console.log(JSON.stringify(response));
//             currentUser = formatServerUser(response.invocationResult.resultSet[0]);
//             setSavedUser(currentUser);
//             $rootScope.$apply();
// //				login({
// //					email:email,
// //					password:password
// //				});
//           }, onFailure: function(error) {
//         	console.log("Manual login error! "+JSON.stringify(error));
//           }
//         });
//     };
    
//     function registerManual(email, password, firstName, lastName, imgUrl){
//     	console.log('Manually Registering');
//         WL.Client.invokeProcedure({
//           adapter: 'derbySQL',
//           procedure: 'addManualUser',
//           parameters: [firstName, lastName, email, password, imgUrl]
//         }, {
//           onSuccess: function(response) {
//         /*	authservice.login({
// 					email:email,
// 					password:password
//         	 });*/
//         	console.log("Manual Register Success! "+firstName+" "+lastName);
//         	loginManual(email, password);
//           }, onFailure: function(error) {
//         	console.log("Manual register error! "+JSON.stringify(error));
//           }
//         });
        
//     };
    
//     function logout() {
//     	setSavedUser(null);
//     	currentUser = null;
//     };

//     authService.login = function(withWhat) {
        
//         if (typeof ChildBrowser == 'undefined') {
//             //if on desktop, no childbrowser, do fake user
//           console.log('no childbrowser plugin found, using Desktop User');
          
          
//           /*
//           login({
//         	  facebookToken: 'abc123',
//         	  firstName: 'Andy',
//         	  lastName: 'Joslin'
//           });*/
          
//         } else if (withWhat == 'linkedIn') {
        	
//         	connect.authenticate('linkedIn', {
//         		consumer_key: "vhi1gjsw7k88",
//         		shared_secret: "SJTva2eU0P4vFa57",
//         		onSuccess: function(data) {
//         			connect.oauthAjax({
//         				url: 'https://api.linkedin.com/v1/people/~:(first-name,last-name,headline,picture-url,id)',
//         				signatures: data,
//         				parameters: { format: 'json' },
//         				action: 'GET' 
//         			}).then(function(userData) {
//         				console.log(JSON.stringify(userData));
//         				login({
//         					linkedInToken: userData.id,
//         					firstName: userData.firstName,
//         					lastName: userData.lastName,
//         					imagePath: userData.pictureUrl
//         				});
//         			}, function(err) {
//         				console.log(err);
//         			});
//         		},
//             	onFailure: function(err){ console.log(err); }
//             });
//         } else if (withWhat == 'facebook') {
//             connect.authenticate('facebook', {
//             	client_id: '156951604394357',
//             	scope: ['user_photos','email'],
//             	onSuccess: function(data) {
//             		jQuery.ajax({
//             			url: 'https://graph.facebook.com/me?access_token='+data.access_token
//             		}).then(facebookSuccess, function(error) {
//             			//For some reason, facebook sometimes gives back the proper results, but to the error callback
//             			//We check if the error's results can be parsed to userData, and if so we give 'em to the success fn
//             			try {
//             				var parsed = JSON.parse(error.responseText);
//             				if (parsed.name) facebookSuccess(parsed);
//             			} catch(e) {}
//             		});
//             		function facebookSuccess(userData) {
//             			console.log(JSON.stringify(userData));
//             			login({
//             				facebookToken: userData.email,
//             				firstName: userData.first_name,
//             				lastName: userData.last_name,
//             				imagePath: 'https://graph.facebook.com/me/picture?access_token='+data.access_token+'&type=large'
//             			});
//             		}
//             	},
//             	onFailure: function(data) {
//             		console.log("Facebook authentication error! "+data);
//             	}
//             });
//         }
//     };
    
//     authService.logout = logout;

//     authService.registerManual = registerManual;
//     authService.loginManual = loginManual;
    
//     authService.user = function() {
//         return currentUser;
//     };
    
    return authService;
});