"use strict";

appServices.factory('group', ['$firebaseArray', '$firebaseObject', 'Refs',
  function($firebaseArray, $firebaseObject, Refs){
    return{
      create: function(name, cb){
        Refs.groups.push({'name': name}, function(err){
          cb(err);
        });
      },

      delete: function(groupid){
        Refs.groups.child(groupid).remove();
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