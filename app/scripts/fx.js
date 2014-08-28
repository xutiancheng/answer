/*global Modernizr, jQuery, Backbone, _, templates, Handlebars, define */

define("jquery", function () {
  var $ = jQuery.noConflict();
  $.ajaxSetup({
    cache: false
  });
  return $;
});

define("modernizr", function () {
  return Modernizr;
});


define("underscore", function () {
  return _;
});