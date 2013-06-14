'use strict';

/* Filters */

angular.module('myApp.filters', [])
.filter('selectedFeatureTags', function($filter) {
	return function(feature) {
		var len;

	    // get customers that have been checked
	    var checkedTags = $filter('filter')(feature, {checked: true});
	    // var checkedTags = ["pie", "doh" ]

	    // for (var i = 0; i < checkedTags.length; i++) {
	    // 	console.log("checked: " + checkedTags[i]);
	    // 	console.log(checkedTags.length)
	    // };
	    
	    // Add in a check to see if any customers were selected. If none, return 
	    // them all without filters
	    if(checkedTags.length === 0) {
	    	return feature;
	    }
	    
	    // get all the unique cities that come from these checked customers
	    var tagList = {};
	    for(var i = 0, len = checkedTags.length; i < len; ++i) {
	      // if this checked customers cities isn't already in the cities object 
	      // add it
	      if(!tagList.hasOwnProperty(checkedTags[i].properties.tags[1])) {
	      	tagList[checkedTags[i].properties.tags[1]] = true;
	      }
	      console.log(tagList)

	  }

	    // Now that we have the cities that come from the checked customers, we can
	    //get all customers from those cities and return them
	    var ret = [];
	    for(var i = 0, len = feature.length;  i < len; ++i) {
	      // If this customer's city exists in the cities object, add it to the 
	      // return array
	      if(tagList[feature[i].properties.tags[1]]) {
	      	ret.push(feature[i]);
	      } 
	  }

	    // we have our result!
	    return ret;
};
})
.filter('capitalize', function() {
    return function(input, scope) {
        if (input!=null)
            {return input.substring(0,1).toUpperCase()+input.substring(1);}
    }
})
.filter('capArray', function() {
    return function(input, scope) {
        if (input!=null){
        	var split = input.split(/[ ,]+/);
        	var newArr = []; 
        	for (var i = 0; i < split.length; i++) {
        		newArr.push(split[i].substring(0,1).toUpperCase()+split[i].substring(1));
        	};
        	return newArr.join(" ");
        }
    }
});

// Don't need capitalize filter anymore...