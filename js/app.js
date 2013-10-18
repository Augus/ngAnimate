var app = angular.module('app', ['ngAnimate']);

function AppController ($scope, $rootScope, $http, $timeout) {

	// grid(0), list (1)
	$scope.layoutMode = 0;
	$scope.showMode = false;
	$scope.showAnim = true;
	$scope.showStatus = "";
	$scope.list = [];
	$scope.currentAnimation;
	$scope.animations = ["toggle", 
						"spin-toggle", 
						"scale-fade", 
						"scale-fade-in", 
						"bouncy-scale-in", 
						"flip-in", 
						"slide-left", 
						"slide-right", 
						"slide-top", 
						"slide-down", 
						"bouncy-slide-left", 
						"bouncy-slide-right", 
						"bouncy-slide-top", 
						"bouncy-slide-down", 
						"rotate-in"];

	$scope.addItem = function (animation) {
		$scope.animation = animation;
		if ($scope.showMode) {
			$scope.currentAnimation = animation;
			$scope.showIt();
			return;
		}

		for (var i = 0; i < 6; i++) {
			$timeout(function () {
				$scope.list.push({ title : "item" });
			}, 100 * i);
		};		
	}

	$scope.removeItem = function (item) {
		var index = $scope.list.indexOf(item);
		$scope.list.remove(index);
	}

	$scope.cleanList = function () {
		for (var i = 0; i < $scope.list.length; i++) {
			$timeout(function () {
				$scope.list.pop();
			}, 100 * i);
		};
	}

	// Play all animation, it will auto clean item list.
	$scope.autoPlayAnimation = function (index) {
		var animation = $scope.animations[index];
		if (animation) {
			$scope.currentAnimation = animation;
			if ($scope.showMode) {
				$scope.showIt();
			} else {
				$scope.addItem(animation);
				$timeout(function () {
					$scope.cleanList();
				}, 1000);
			}
			$timeout(function () {
				$scope.autoPlayAnimation(++index);
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

	$scope.switchShowMode = function () {
		$scope.showMode = $scope.showMode?false:true;
		$scope.showIt();
	}

	$scope.showIt = function() {
		$scope.showStatus = "";
		$scope.animationShow = !$scope.currentAnimation?undefined:$scope.currentAnimation + "-show";
		if (!$scope.animationShow) {
			return;
		}
		$scope.showAnim = true;
		$timeout(function () {
			$scope.showAnim = false;
			$scope.showStatus = "(ng-hide-add : hiding)";
			$timeout(function () {
				$scope.showAnim = true;
				$scope.showStatus = "(ng-hide-remove = showing)";
			}, 500);
		}, 500);
	}
}


Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};
