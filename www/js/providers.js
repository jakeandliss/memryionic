/* Providers for the application */

(function(){
  angular
    .module('memryApp.providers', [])
    .provider('Layouts', function Layouts(){
      var windowLayout = null;

      // Init set the window width
      // USAGE: LayoutsProvider.setLayout() this sets the provider value to
      // 'desktop' or 'mobile'
      this.setLayout = function(){
        var width = $(window).width();
        /* We are considering that window size with width less than 480
         * is a mobile device(served ionic views) and width greater than
         * that is desktop screen
         */
        windowLayout =  width > 10 && width < 480 ? 'mobile' : 'desktop';
      }

      // this method will be used in config phase
      // USAGE: LayoutsProvider.getLayout() -> 'desktop'/'mobile'
      // Should be only used in Config phase
      this.getLayout = function () {
        if(windowLayout) return windowLayout;
        else {
          this.setLayout();
          return windowLayout;
        }
      }

      // USAGE: Layouts.layout()  -> 'desktop'/'mobile'
      // Can be used in or after run phase
      this.$get = function(){
        return {
          layout: function() {
            return windowLayout;
          }
        }
      };
    });
})();
