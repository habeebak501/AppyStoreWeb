/**
*@FileName:searchController.js
*@Created By:Habeeb
*@Date:
*@Purpose:To search images purpose
*/
/*searchController is used to search the images */
var app = angular.module("myApp")
    .controller("searchController", function ($scope, $stateParams, $http, $sce, categoryService, $window, $state) {
        // $scope.load=true;
        console.log('searchController');
        $scope.ChangeKeyword = function (name) {
            /* clear the data */
            $scope.result1 = "";
            if (!name) {
                alert("please type any text in the searchbar");
            } else {
                console.log(name);
                $scope.textbox = name;
                $scope.count = $stateParams.total_count;
                console.log($scope.count);
                console.log($scope.textbox);
                $scope.loading = true;
                console.log($scope.loading);
                var url = "http://beta.appystore.in/appy_app/appyApi_handler.php?method=search&keyword=" + name + "&content_type=appsgames&limit=4&offset=0&age=1&incl_age=6";
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
                        console.log(response);
                        $scope.loading = false;
                        console.log($scope.loading);
                        $scope.count = response.data.Responsedetails[0].total_count;
                        console.log($scope.count);
                        var count = $scope.count;
                        console.log(count);
                        var url = "http://beta.appystore.in/appy_app/appyApi_handler.php?method=search&keyword=" + name + "&content_type=appsgames&limit=" + count + "&offset=0&age=1&incl_age=6";
                        console.log(url);
                        $scope.url = url;
                        console.log(url);
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
                            .then(function (response) {
                                console.log(response);
                                $scope.result1 = response.data.Responsedetails[0].data_array;
                                console.log($scope.result1);
                            })
                    })
                if ($scope.textbox) {
                    console.log($scope.textbox);
                    var textbox = $scope.textbox;
                    console.log(textbox);
                    $state.go('.searchImages');
                }
            };
            /*goBack function is used to go previous page */
            $scope.myGoBack = function () {
                console.log("fc");
                // $ionicHistory.goBack();
                $window.history.back();
            };
        }
    });
