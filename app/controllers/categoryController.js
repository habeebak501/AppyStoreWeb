/**
*@FileName:categoryController.js
*@Created By:Habeeb
*@Date:
*@Purpose:To display the categoryImages
  */
  /*To create AppyStore module */
  /*To create a categoryController for displaying Images */
var app = angular.module("myApp")
  .controller("categoryController", function ($scope, categoryService, $stateParams, myCache) {
    var array = [];
    $scope.images = [{
      'src': "loading.gif",
      caption: ' loading'
    }];
    /*carousel view options */
    $scope.options = {
      clicking: true,
      sourceProp: 'src',
      visible: 11,
      perspective: 35,
      startSlide: 0,
      border: 3,
      dir: 'rtl',
      width: 300,
      height: 180,
      top: 200,
      space: 220,
      autoRotationSpeed: 2000,
      loop: true
    };
    /*cache is using for Storing loacal Cache */
    var cache = myCache.get('categoryImages');
    console.log(cache);
    if (cache) {
      $scope.images = cache;
    }
    else {
      console.log('not cached');
      /*using categoryService to retrive data */
      var promise = categoryService.result();
      promise.then(function (data) {
        $scope.images = [];
        $scope.res = [];
        var result = data.data.Responsedetails.category_id_array;
        //  var array1=data.data.Responsedetails.category_id_array.content_count;
        for (i in result) {
          $scope.images.push({
            'src': result[i].image_path["50x50"],
            'caption': result[i].category_name,
            'cid': result[i].category_id,
            'pid': result[i].parent_category_id,
            'content_count': result[i].content_count

          });
        }
        for (i in result) {
          $scope.res.push({
            'content_count': result[i].content_count
          })
        }
        console.log($scope.res);
        console.log($scope.images);
        console.log(result);
        // console.log(array1)
      });
    }
    /*watch function is used to watching the newImages and oldImages */
    $scope.$watch("images", function (NewSlides, OldSlides) {
      console.log(NewSlides);
      myCache.put("categoryImages", NewSlides);
      $scope.images = myCache.get("categoryImages");
    })
  });
