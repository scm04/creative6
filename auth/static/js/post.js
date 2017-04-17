angular.module('post',[])
 .controller('postCtrl', postCtrl);

  function postCtrl($scope,$http){
    $scope.posts=[];
    $scope.addPost = function(){
    console.log("$scope.meme's value: "+$scope.meme);
     if($scope.meme === ''){
      console.log("Meme URL is blank");
      alert("Please enter a meme URL");
      return;
     }
     $scope.create({
      meme: $scope.meme,
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

    $scope.getAll = function(){
     return $http.get('/posts').success(function(data){
      angular.copy(data, $scope.posts);
     });
    };
    $scope.getAll();
  }

