'use strict';

appServices.factory('statistics', ['$firebaseArray', '$firebaseObject', 'Refs',
	function($firebaseArray, $firebaseObject, Refs) {
		return{

			byDate: function(date, cb){
				var qry = Refs.attendance.child(date);
				if(!cb){
					qry.on('value', function(snap) {
						cb(snap.val());
					});
					return $firebaseArray(qry);
				} else {
					qry.on('value', function(snap){
						cb(snap.val());
					});
				}
			},

			all: function (cb){
				var qry = Refs.attendance;
				if(!cb){
					return $firebaseArray(qry);
				} else {
					qry.on('value', function(snap){
						cb(snap.val());
					});
				}
			},

			byFellow: function (slack_id, cb) {
				var qry = Refs.attendance;
				qry.on('value', function(snapshot) {
					console.log(snapshot.val());
				});
			}
		};
}]);