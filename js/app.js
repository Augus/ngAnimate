var app = angular.module('app', ['ngAnimate']);

function AppController ($scope, $rootScope, $http, $timeout) {

	$scope.layoutMode = 0;
	$scope.list = [];
	$scope.currentAnimation;
	$scope.animations = ["toggle", 
						"spin-toggle", 
						"slide-left", 
						"slide-right", 
						"slide-top", 
						"slide-down", 
						"bouncy-slide-left", 
						"bouncy-slide-right", 
						"bouncy-slide-top", 
						"bouncy-slide-down", 
						"scale-fade", 
						"scale-fade-in", 
						"bouncy-scale-in", 
						"flip-in", 
						"rotate-in"];

	/* ------------------------------------------- */
	/* Add Iems
	/* ------------------------------------------- */
	$scope.add = function (animation) {
		$scope.animation = animation;
		for (var i = 0; i < 6; i++) {
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

	/* ------------------------------------------- */
	/* Play All Animations
	/* ------------------------------------------- */	
	$scope.playAll = function (index) {
		var animation = $scope.animations[index];
		if (animation) {
			$scope.currentAnimation = animation;
			$scope.add(animation);
			$timeout(function () {
				$scope.clean();
			}, 1000);
			$timeout(function () {
				$scope.playAll(++index);
			}, 2000);
		}
		else {
			$scope.currentAnimation = undefined;
		}
	}

	$scope.switchGridMode = function () {
		$scope.layoutMode = 0;
	}

	$scope.switchListMode = function () {
		$scope.layoutMode = 1;
	}
}


Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};