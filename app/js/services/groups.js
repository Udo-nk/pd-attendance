"use strict";

appServices.factory('group', ['$firebaseArray', '$firebaseObject', 'Refs',
  function($firebaseArray, $firebaseObject, Refs){
    return{
      create: function(name, cb){
        Refs.groups.push({'name': name}, function(err){
          cb(err);
        });
      },

      all: function(cb){
        if(!cb) {
          return $firebaseArray(Refs.groups);
        }
        else {
          Refs.groups.on('value', function(snap) {
            cb(snap.val());
          });
        }
      }
    }
  }]);