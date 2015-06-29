"use strict";

appServices.factory('Fellows', ['$firebaseArray', '$firebaseObject', 'Refs',
  function($firebaseArray, $firebaseObject, Refs){
    return{

      all: function(cb){
        if(!cb) {
          return $firebaseArray(Refs.fellows);
        }
        else {
          Refs.fellows.on('value', function(snap) {
            cb(snap.val());
          });
        }
      }
    }
  }]);