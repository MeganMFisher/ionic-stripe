cordova.define("com.telerik.stripe.stripe", function(require, exports, module) {
var exec = require('cordova/exec');
var channel = require('cordova/channel');

function Stripe(){

}

if (typeof module !== "undefined" && module.exports) {
  module.exports = new Stripe();
}

});
