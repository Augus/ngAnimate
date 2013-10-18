var app = angular.module('app', ['ngAnimate']);

// TODO(Augus)
// var ngModule = angular.module('YourApp', []);
// ngModule.animation('.my-crazy-animation', function() {
//   return {
//     enter: function(element, done) {
//       //run the animation
//       //!annotate Cancel Animation|This function (if provided) will perform the cancellation of the animation when another is triggered
//       return function(element, done) {
//         //cancel the animation
//       }
//     }
//     leave: function(element, done) { },
//     move: function(element, done) { },
//     show: function(element, done) { },
//     hide: function(element, done) { },
//     addClass: function(element, className, done) { },
//     removeClass: function(element, className, done) { },
//   }
// });


function AppController ($scope, $rootScope, $http, $timeout) {

	// grid(0), list (1)
	$scope.layoutMode = 0;
	$scope.list = [];
	$scope.currentAnimation;
	$scope.isShow = true;
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
			$scope.addItem(animation);
			$timeout(function () {
				$scope.cleanList();
			}, 1000);
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

	$scope.toggle = function () {
		$scope.isShow = !$scope.isShow;
	}
}


Array.prototype.remove = function(from, to) {
  var rest = this.slice((to || from) + 1 || this.length);
  this.length = from < 0 ? this.length + from : from;
  return this.push.apply(this, rest);
};