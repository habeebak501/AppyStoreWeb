/**
*@FileName:contentController.js
*@Created By:Habeeb
*@Date:
*@Purpose:To display the ContentImages based on pcatid and catid
*/
/*contentController is used to displaying the content Images */
var app = angular.module("myApp")
  .controller("contentController", function ($scope, $stateParams, $http, Pagination, categoryService, myCache, $window) {
    //  $scope.load=true;
    console.log('contentController');
    $scope.content_count = $stateParams.content_count;
    console.log($scope.content_count);
    var count = $scope.content_count;
    $scope.content_count = count;
    $scope.pagination = Pagination.getNew(count);
    var pcatid = $stateParams.pid;
    var catid = $stateParams.cid;
    $scope.caption = $stateParams.caption;
    $scope.pcatid = pcatid;
    $scope.catid = catid;
    console.log(pcatid, catid);
    if ($stateParams.caption) {
      var cache = myCache.get($scope.caption);
    }
    if (cache) {
      $scope.result = cache;
    }
    else {
      console.log("not cached");
      var url = $stateParams.url;
      /*Spinner Image Displayed */
      $scope.loading = true;
      console.log($scope.loading);
      /* using url*/
      var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=' + count + '&offset=0&catid=' + catid + '&pcatid=' + pcatid + '&age=1.5&incl_age=5';
      $scope.url = url;
      console.log(url);
      /*using restApi to retrive the data */
      $http.get(url, {
        headers: {
          'Access-Control-Allow-Origin': 'true',
          'Access-Control-Allow-Methods': 'PUT, GET, POST',
          'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept',
          'X_APPY_USERID': '290903782',
          'X_APPY_API_KEY': 'gh610rt23eqwpll',
          'X_APPY_USERID': '290903782',
          'X_APPY_IMEI': '353368070301951',
          'X_APPY_PCP_ID': '999',
          'X_APPY_CAMPAIGN_ID': '8700441600',
          'X_APPY_APP_TYPE': 'lite',
          'X_APPY_TTR': '10800000',
          'X_APPY_UTYPE': 'O',
          'X_APPY_MSISDN': '0',
          'X_APPY_IS_NEW_USER': 'N',
          'X_APPY_UserAgent': 'Mozilla/5.0 (Linux; Android 5.0.2; Panasonic ELUGA Switch Build/LRX22G; wv) AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Chrome/51.0.2704.81 Mobile Safari/537.36'
        }
      })
      /*using promises */
        .then(function (response) {

          $scope.loading = false;
          console.log($scope.loading);
          // $scope.load=false;
          $scope.result = response.data.Responsedetails.data_array;
          console.log($scope.result);
          $scope.pagination.numPages = Math.ceil($scope.result.length / $scope.pagination.perPage);
        });
    }
    /*goBack is used to go previous page */
    $scope.myGoBack = function () {
      console.log("fc");
      // $ionicHistory.goBack();
      $window.history.back();
    };
    /*watch function is used to washing the newImage and oldImages */
    $scope.$watch("result", function (NewData, OldData) {
      console.log("slides changed");
      myCache.put($scope.caption, NewData);
      $scope.result = myCache.get($scope.caption);
    })
  });
