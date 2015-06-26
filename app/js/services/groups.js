"use strict";

appServices.factory('group', ['$firebaseArray', '$firebaseObject', 'Refs',
  function($firebaseArray, $firebaseObject, Refs){
    return{

      create: function(name, cb){
        Refs.groups.push(name, function(err){
          cb(err);
        });
      },

      all: function(cb){
        Refs.groups.once('value', function(snap){
          cb(snap.val());
        });
      }

    }

}]);