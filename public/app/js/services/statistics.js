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
				if(!cb) {
						var qry = Refs.attendance,
					    timesRegistered = 0,
					    timesPresent = 0,
					    timesAbsent = 0,
					    attendanceCounts = {};

					qry.on('value', function(snapshot) {
						var val = snapshot.val();
						_.forEach(val, function(days) {
							_.forEach(days, function(res) {
								if(slack_id && res.slack === slack_id.toString()) {
									if(res.attended === true) {
										timesPresent++;
									}
									else if(res.attended === false) {
										timesAbsent++;
									}
								}
							});
						});
						attendanceCounts.present = timesPresent;
						attendanceCounts.absent = timesAbsent;
					});
					return attendanceCounts;
				}
			}
		};
}]);