var db;

angular.module('Helper', ['ionic', 'Helper.controllers', 'ngCordova'])

.run(function($ionicPlatform, $cordovaSQLite, $cordovaDevice) {
  $ionicPlatform.ready(function() {
    if(window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);
    }
    if(window.StatusBar) {
      StatusBar.styleDefault();
    }
	
	// Important!!
        // 
        // Instantiate database file/connection after ionic platform is ready.
        //
        try {
		    if($cordovaDevice.getPlatform()=="Android")
			db = window.sqlitePlugin.openDatabase({name: "Helper.db", location: 1});
			$cordovaSQLite.execute(db, 'CREATE TABLE IF NOT EXISTS phones (id INTEGER PRIMARY KEY AUTOINCREMENT, phone TEXT)').then(function(result) { console.log('Table created'); }, function(error) { console.log('Error'); });
        } catch (error) {
            alert(error);
        }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {

  $stateProvider
    .state('tabs', {
      url: "/tab",
      abstract: true,
      templateUrl: "templates/tabs.html"
    })
    .state('tabs.home', {
      url: "/home",
      views: {
        'home-tab': {
          templateUrl: "templates/home.html",
          controller: 'HelperController'
        }
      }
    })
    .state('tabs.choose', {
      url: "/choose",
      views: {
		  'home-tab': {
          templateUrl: "templates/choose.html"
        }
      }
    })
	.state('tabs.contacts', {
      url: "/contacts",
      views: {
        'contacts-tab': {
          templateUrl: "templates/contacts.html"
        }
      }
    })
    .state('tabs.about', {
      url: "/about",
      views: {
        'about-tab': {
          templateUrl: "templates/about.html"
        }
      }
    });


   $urlRouterProvider.otherwise("/tab/home");
   
   $ionicConfigProvider.tabs.position('bottom');

});
