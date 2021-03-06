requirejs.config({
    paths: {
        "gettext": "xmodule_js/common_static/js/test/i18n",
        "mustache": "xmodule_js/common_static/js/vendor/mustache",
        "codemirror": "xmodule_js/common_static/js/vendor/CodeMirror/codemirror",
        "jquery": "xmodule_js/common_static/js/vendor/jquery.min",
        "jquery.ui": "xmodule_js/common_static/js/vendor/jquery-ui.min",
        "jquery.form": "xmodule_js/common_static/js/vendor/jquery.form",
        "jquery.markitup": "xmodule_js/common_static/js/vendor/markitup/jquery.markitup",
        "jquery.leanModal": "xmodule_js/common_static/js/vendor/jquery.leanModal.min",
        "jquery.smoothScroll": "xmodule_js/common_static/js/vendor/jquery.smooth-scroll.min",
        "jquery.scrollTo": "xmodule_js/common_static/js/vendor/jquery.scrollTo-1.4.2-min",
        "jquery.timepicker": "xmodule_js/common_static/js/vendor/timepicker/jquery.timepicker",
        "jquery.cookie": "xmodule_js/common_static/js/vendor/jquery.cookie",
        "jquery.qtip": "xmodule_js/common_static/js/vendor/jquery.qtip.min",
        "jquery.fileupload": "xmodule_js/common_static/js/vendor/jQuery-File-Upload/js/jquery.fileupload",
        "jquery.iframe-transport": "xmodule_js/common_static/js/vendor/jQuery-File-Upload/js/jquery.iframe-transport",
        "jquery.inputnumber": "xmodule_js/common_static/js/vendor/html5-input-polyfills/number-polyfill",
        "datepair": "xmodule_js/common_static/js/vendor/timepicker/datepair",
        "date": "xmodule_js/common_static/js/vendor/date",
        "underscore": "xmodule_js/common_static/js/vendor/underscore-min",
        "underscore.string": "xmodule_js/common_static/js/vendor/underscore.string.min",
        "backbone": "xmodule_js/common_static/js/vendor/backbone-min",
        "backbone.associations": "xmodule_js/common_static/js/vendor/backbone-associations-min",
        "tinymce": "xmodule_js/common_static/js/vendor/tiny_mce/tiny_mce",
        "jquery.tinymce": "xmodule_js/common_static/js/vendor/tiny_mce/jquery.tinymce",
        "xmodule": "xmodule_js/src/xmodule",
        "utility": "xmodule_js/common_static/js/src/utility",
        "sinon": "xmodule_js/common_static/js/vendor/sinon-1.7.1",
        "squire": "xmodule_js/common_static/js/vendor/Squire",
        "jasmine-stealth": "xmodule_js/common_static/js/vendor/jasmine-stealth",
        "jasmine.async": "xmodule_js/common_static/js/vendor/jasmine.async",
        "draggabilly": "xmodule_js/common_static/js/vendor/draggabilly.pkgd",
        "domReady": "xmodule_js/common_static/js/vendor/domReady",

        "mathjax": "//edx-static.s3.amazonaws.com/mathjax-MathJax-727332c/MathJax.js?config=TeX-MML-AM_HTMLorMML-full",
        "youtube": "//www.youtube.com/player_api?noext",
        "tender": "//edxedge.tenderapp.com/tender_widget.js"

        "coffee/src/ajax_prefix": "xmodule_js/common_static/coffee/src/ajax_prefix"
    }
    shim: {
        "gettext": {
            exports: "gettext"
        },
        "date": {
            exports: "Date"
        },
        "jquery.ui": {
            deps: ["jquery"],
            exports: "jQuery.ui"
        },
        "jquery.form": {
            deps: ["jquery"],
            exports: "jQuery.fn.ajaxForm"
        },
        "jquery.markitup": {
            deps: ["jquery"],
            exports: "jQuery.fn.markitup"
        },
        "jquery.leanModal": {
            deps: ["jquery"],
            exports: "jQuery.fn.leanModal"
        },
        "jquery.smoothScroll": {
            deps: ["jquery"],
            exports: "jQuery.fn.smoothScroll"
        },
        "jquery.scrollTo": {
            deps: ["jquery"],
            exports: "jQuery.fn.scrollTo"
        },
        "jquery.cookie": {
            deps: ["jquery"],
            exports: "jQuery.fn.cookie"
        },
        "jquery.qtip": {
            deps: ["jquery"],
            exports: "jQuery.fn.qtip"
        },
        "jquery.fileupload": {
            deps: ["jquery.iframe-transport"],
            exports: "jQuery.fn.fileupload"
        },
        "jquery.inputnumber": {
            deps: ["jquery"],
            exports: "jQuery.fn.inputNumber"
        },
        "jquery.tinymce": {
            deps: ["jquery", "tinymce"],
            exports: "jQuery.fn.tinymce"
        },
        "datepair": {
            deps: ["jquery.ui", "jquery.timepicker"]
        },
        "underscore": {
            exports: "_"
        },
        "backbone": {
            deps: ["underscore", "jquery"],
            exports: "Backbone"
        },
        "backbone.associations": {
            deps: ["backbone"],
            exports: "Backbone.Associations"
        },
        "youtube": {
            exports: "YT"
        },
        "codemirror": {
            exports: "CodeMirror"
        },
        "tinymce": {
            exports: "tinymce"
        },
        "mathjax": {
            exports: "MathJax"
        },
        "xmodule": {
            exports: "XModule"
        },
        "sinon": {
            exports: "sinon"
        },
        "jasmine-stealth": {
            deps: ["jasmine"]
        },
        "jasmine.async": {
            deps: ["jasmine"],
            exports: "AsyncSpec"
        },

        "coffee/src/main": {
            deps: ["coffee/src/ajax_prefix"]
        },
        "coffee/src/ajax_prefix": {
            deps: ["jquery"]
        }
    }
});

jasmine.getFixtures().fixturesPath += 'coffee/fixtures'

define([
    "coffee/spec/views/assets_spec"
    ])

