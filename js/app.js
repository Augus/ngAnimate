var app = angular.module('app', ['ngAnimate']);

function AppController ($scope, $rootScope, $http, $timeout) {

	$scope.list = [];
	$scope.animations = ["toggle", 
						"spinToggle", 
						"slideLeft", 
						"slideRight", 
						"slideTop", 
						"slideDown", 
						"bouncySlideLeft", 
						"bouncySlideRight", 
						"bouncySlideTop", 
						"bouncySlideDown", 
						"scaleFade", 
						"scaleFadeIn", 
						"bouncyScaleIn", 
						"flipIn", 
						"rotateIn"];

	/* ------------------------------------------- */
	/* Add Iems
	/* ------------------------------------------- */
	$scope.add = function (animation) {
		$scope.animation = animation;
		for (var i = 0; i < 3; i++) {
			pushDelay($scope.list, { title : "item" }, i, 100);
		};		
	}

	/* ------------------------------------------- */
	/* Remove Item
	/* ------------------------------------------- */
	$scope.remove = function (item) {
		var index = $scope.list.indexOf(item);
		$scope.list.remove(index);
	}

	/* ------------------------------------------- */
	/* Clean All Items
	/* ------------------------------------------- */
	$scope.clean = function () {
		for (var i = 0; i < $scope.list.length; i++) {
			removeDelay($scope.list, i, 100);
		};
	}

	/* ------------------------------------------- */
	/* Array Push Delay
	/* ------------------------------------------- */
	function pushDelay (array, item, i, duration) {
		$timeout(function () {
			array.push(item);
		}, duration * i);
	}

	/* ------------------------------------------- */
	/* Array Pop Delay
	/* ------------------------------------------- */
	function removeDelay (array, i, duration) {
		$timeout(function () {
			array.pop();
		}, duration * i);
	}
}


Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};