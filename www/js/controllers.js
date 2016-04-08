angular.module('starter.controllers', [])

.controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})

.controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})

.controller('TodCtrl', function ($scope, $interval, $ionicPlatform, $cordovaBarcodeScanner) {

        $scope.puzzels = [
          {
            title: "Puzze #1",
            q: "This is my first battle in war?",
            isFinished: false,
            id: "tod-1"
          },
          {
            title: "Puzze #2",
            q: "I used to collect the water from the rain?",
            isFinished: true,
            id: "tod-1"
          },
          {
            title: "Puzze #3",
            q: "I'm the highest place in the citadel?",
            isFinished: true,
            id: "tod-1"
          },
          {
            title: "Puzze #4",
            q: "I'm hiding in the crusader room?",
            isFinished: true,
            id: "tod-1"
          },
          {
            title: "Puzze #5",
            q: "I'm hiding in the hourses room?",
            isFinished: true,
            id: "tod-1"
          }
        ]

        $scope.scanQR = function(puzzle) {
          $ionicPlatform.ready(function() {
            $cordovaBarcodeScanner.scan()
            .then(function(barcodeData) {

              if (barcodeData.text === puzzle.id) {
                success(puzzle)
              } else {
                alert("This is the wrong answer, continue searching...")
              }

            }, function(error) {
              alert(error)
            });
          });            
        }

        var totalSeconds = 0;
        $interval(setTime, 1000)
        $scope.secondsLabel = '00'
        $scope.minutesLabel = '00'

        function setTime()
        {
            ++totalSeconds;
            $scope.secondsLabel = pad(totalSeconds%60);
            $scope.minutesLabel = pad(parseInt(totalSeconds/60));
        }

        function pad(val)
        {
            var valString = val + "";
            if(valString.length < 2)
            {
                return "0" + valString;
            }
            else
            {
                return valString;
            }
        }

  function success (puzzle) {
    angular.forEach($scope.puzzels, function(p) {
      if (p.title === puzzle.title) {
        p.isFinished = true;
      }
    });

    swal('Good job!', 'You finished ' + puzzle.title, 'success')
  }
  // body...
})

.controller('StartCtrl', function($scope, $stateParams) {
});
