angular.module('post',[])
 .controller('MainCtrl', [
  '$scope','$http','$filter',
  function($scope,$http,$filter){
    $scope.posts=[];
    $scope.addPost = function(){
    console.log("$scope.meme's value: "+$scope.meme);
     if($scope.meme === ''){
      console.log("Meme URL is blank");
      alert("Please enter a meme URL");
      return;
     }
     $scope.user = firebase.auth().currentUser;
     $scope.email = $scope.user.email;
     $scope.posterName = 'default';
     if($scope.email.indexOf('@') != -1){
       $scope.posterName = $scope.email.substring(0,$scope.email.indexOf('@'));
     }
     $scope.create({
      meme: $scope.meme,
      poster: $scope.posterName,
      upvotes: 0
     });
     $scope.meme = '';
    };

    $scope.incrementUpvotes=function(post){
     $scope.upvote(post);
    };
    $scope.upvote = function(post){
     return $http.put('/posts/'+post._id+'/upvote').success(function(data){
      console.log("upvote worked");
      post.upvotes += 1;
     });
    };

    $scope.create = function(post){
     return $http.post('/posts', post).success(function(data){
      $scope.posts.push(data);
     });
    };  

    $scope.delete = function(post){
     $http.delete('/posts/'+post._id).success(function(data){
      console.log("delete worked");
      $scope.getAll();
     });
    };

    $scope.checkUser = function(index){
     if(firebase.auth().currentUser === null){
       return false;
     }
     $scope.user = firebase.auth().currentUser;
     console.log($scope.user.email);
     $scope.email = $scope.user.email;
     $scope.username = 'default';
     if($scope.email.indexOf('@') != -1){
       $scope.username = $scope.email.substring(0,$scope.email.indexOf('@'));
     }
     $scope.filteredPosts = $filter('orderBy')($scope.posts,['-upvotes','poster'],false);
     console.log("Current user: "+$scope.username);
     console.log("Poster: "+$scope.filteredPosts[index].poster);
     if($scope.filteredPosts[index].poster === $scope.username){
       console.log("The current user and the poster are the same");
       return true;
     } else {
       console.log("The current user is not the poster");
       return false;
     }
    }

    $scope.getAll = function(){
     return $http.get('/posts').success(function(data){
      angular.copy(data, $scope.posts);
     });
    };
    $scope.getAll();
  }
]);
