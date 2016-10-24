/**
*@FileName:videoController.js
*@Created By:Habeeb
*@Date:
*@Purpose:To display the videos based on content images
*/
var app = angular.module("myApp")
    .controller("videoController", function($scope, $stateParams, $http, $sce, Pagination,categoryService,$window) {
        // $scope.load=true;
        console.log('videoController');
        $scope.content_count = $stateParams.content_count;
        console.log($scope.content_count);
        var count = $scope.content_count;
        $scope.pagination = Pagination.getNew(count);
        var url = $stateParams.url;
        // var poster = $stateParams.poster;
        var pcatid = $stateParams.pid;
        var catid = $stateParams.cid;
        url = $sce.trustAsResourceUrl(url);
        $scope.url = url;
        console.log("hi");
        console.log(url);
        $scope.changeVideo = function(url) {
        //  console.log(url,poster);
            url = $sce.trustAsResourceUrl(url);
            var video = document.getElementById("myVideo")
            isSupp = video.canPlayType("video/mp4");
            if (isSupp == "") {
                video.src = "video4.ogg";
            } else {
                video.src = url;
                 video.poster ="loading.gif";
            }
        }
        // $scope.poster = poster;
        $scope.pcatid = pcatid;
        $scope.catid = catid;
        console.log(pcatid, catid);
        var url = 'http://beta.appystore.in/appy_app/appyApi_handler.php?method=getContentList&content_type=videos&limit=' + count + '&offset=0&catid=' + catid + '&pcatid=' + pcatid + '&age=1.5&incl_age=5';
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
            .then(function(response) {
                // $scope.load=false;
                // console.log("reponse",response);
                //          $scope.arr=[];
                //   var result = response.data.Responsedetails.data_arrays;
                //        for(i in result){
                //      $scope.arr.push(result[i].dnld_url);
                // }
                //       console.log($scope.arr);
                $scope.result = response.data.Responsedetails.data_array;
                $scope.pagination.numPages = Math.ceil($scope.result.length / $scope.pagination.perPage);
                console.log($scope.result);

            });
            $scope.myGoBack = function() {
                console.log("fc");
                // $ionicHistory.goBack();
                $window.history.back();
            };
    });
