/**
*@FileName:categoryController.js
*@Created By:Habeeb
*@Date:
*@Purpose:To display the categoryImages
  */
var app = angular.module("myApp")
    .controller("mainController", function($scope, categoryService,$stateParams,myCache) {
        var array = [];

        $scope.images = [{
            'src': "loading.gif",
            caption: ' loading'
        }];
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
        var cache=myCache.get('categoryImages');
        console.log(cache);
        if(cache){
          $scope.images=cache;
        }
        else{
          console.log('not cached');
        var promise = categoryService.result();
        promise.then(function(data) {
            $scope.images = [];
            $scope.res=[];
            var result = data.data.Responsedetails.category_id_array;
          //  var array1=data.data.Responsedetails.category_id_array.content_count;
            for (i in result) {
                $scope.images.push({
                    'src': result[i].image_path["50x50"],
                    'caption': result[i].category_name,
                    'cid': result[i].category_id,
                    'pid': result[i].parent_category_id,
                    'content_count':result[i].content_count

                });
            }
            for(i in result){
              $scope.res.push({
                'content_count':result[i].content_count
              })
            }
            console.log($scope.res);
            console.log($scope.images);
            console.log(result);
            // console.log(array1)
        });
      }
      $scope.$watch("images",function(NewSlides,OldSlides){
        console.log(NewSlides);
        myCache.put("categoryImages",NewSlides);
         $scope.images=myCache.get("categoryImages");
       })
    });
