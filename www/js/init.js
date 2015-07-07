/*
* Init script will be used to find the width of the window making the request
*/

(function initApplication($window){
    window.t = $window;
    var windowWidth = $(window).width();
    console.log('Width is ', windowWidth);
})();
