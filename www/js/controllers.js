angular.module('starter.controllers', [])

.controller('DashCtrl', ['$scope', 'stripe', '$http', '$state', function($scope, stripe, $http, $state) {

  $scope.payment = {};
  $scope.price = {};

  $scope.charge = function (payment) {

    return stripe.card.createToken($scope.payment.card)
    .then(function (response) {
      console.log('token created for card ending in ', response.card.last4);
      console.log($scope.payment)

      var payment = angular.copy($scope.payment); 
      console.log(payment)
      // console.log($scope.payment)
      // payment.card = void 0;
      console.log(payment.cart)
      payment.token = response.id;

      return $http({
        method: 'POST',
        url: 'http://localhost:7950/api/payment',
        data: {
          amount: $scope.price,
          payment: payment
        }
      })
    })
    .then(function(payment) {
      console.log('successfully submitted payment for $', payment);
      $state.go('congrats');
    })
    .catch(function (err) {
       if (err.type && /^Stripe/.test(err.type)) {
         console.log('Stripe error: ', err.message);
         alert(err.message)
       }
       else {
         console.log('Other error occurred, possibly with your API', err);
         alert(err.message)
       }
     });
  };
}
])


.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  };
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
});
