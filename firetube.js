angular.module("firetube", ["firebase"]).controller(
  "Firetube", ["$scope", "angularFireCollection", "angularFireAuth",
  function($scope, angularFireCollection, angularFireAuth) {
    var url = "https://angularfiretube.firebaseio.com/comments";
    angularFireAuth.initialize(url, {scope: $scope, name: "user"});

    var ref = new Firebase(url);
    $scope.comments = angularFireCollection(ref.limit(10));

    $scope.login = function() {
      angularFireAuth.login("facebook");
    }
    $scope.logout = function() {
      angularFireAuth.logout();
    }
    $scope.addComment = function(e) {
      if (e.keyCode != 13) {
        return;
      }
      if (!$scope.user) {
        alert("You must be logged in to leave a comment");
      } else {
        $scope.comments.add({
          name: $scope.user.name, id: $scope.user.id, body: $scope.newComment
        });
        $scope.newComment = "";
        e.preventDefault();
      }
    }
  }
]);
