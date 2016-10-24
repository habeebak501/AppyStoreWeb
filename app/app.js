/**
*@FileName:app.js
*@Created By:Habeeb
*@Date:
*@Purpose:Main Routin Application
*/
angular.module('myApp', ['ui.router','angular-carousel-3d','simplePagination','ngImageCache'])
.config(function($stateProvider, $urlRouterProvider, ImageCacheProvider) {
  console.log("hi");
  /*  ImageCacheProvider is used to set images in the local storage*/
     ImageCacheProvider.setStorage(window.localStorage);
        $urlRouterProvider.otherwise('/category');
        $stateProvider
            .state('category', {
                url: '/category',
                templateUrl: 'templates/category.html',
                controller: 'mainController'
            })
            .state('content',{
              url:'/content/?pid?cid?content_count?caption',
              templateUrl:'templates/content.html',
              controller:'contentController'
            })
            .state('video',{
              url:'/video/?url?pid?cid?content_count',
              templateUrl:'templates/video.html',
              controller:'videoController'
            })
            .state('search',{
              url:'/search',
              templateUrl:'templates/search.html',
              controller:'searchController'
            })
            .state('search.searchImages',{
              url:'/searchImages',
              templateUrl:'templates/searchImages.html'
            })
          })
          /*create a service myCache using factory method and
use $cacheFactory to load json in localStorage*/
.factory('myCache', function($cacheFactory) {
  console.log("myCache");
    return $cacheFactory();
});
