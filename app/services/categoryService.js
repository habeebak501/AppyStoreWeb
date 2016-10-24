/**
*@FileName:categoryService.js
*@Created By:Habeeb
*@Date:
*@Purpose:To Read the Json data Using Services
  */
/*Including the services to the myApp module*/
var app=angular.module("myApp");
/*Creating the CategoryService for calling the RestApi and returning the promise*/
app.service("categoryService",function($http,$q,$stateParams){
  var deffered=$q.defer();
  $http.get('http://beta.appystore.in/appy_app/appyApi_handler.php?method=getCategoryList&content_type=videos&limit_start=0&age=1.5&incl_age=5',{headers:{'X_APPY_USERID':'290903782','X_APPY_IMEI': '353368070301951','X_APPY_PCP_ID':' 999','X_APPY_CAMPAIGN_ID': '8700441600','X_APPY_APP_TYPE': 'lite','X_APPY_TTR': '10800000' ,'X_APPY_UTYPE': 'O','X_APPY_MSISDN': '0','X_APPY_IS_NEW_USER': 'N','X_APPY_API_KEY':'gh610rt23eqwpll'}}).then(function(data){
    deffered.resolve(data);
  });
  this.result=function()
  {
    return deffered.promise;
  }
});
