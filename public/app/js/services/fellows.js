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
      },

      find: function(googleid, cb){
        if(!cb) {
          return $firebaseArray(Refs.fellows.child(googleid));
        }
        else {
          Refs.fellows.child(googleid).on('value', function(snap) {
            cb(snap.val());
          });
        }
      },

      addToGroup: function(groupid, googleid){
        // Refs.fellows.child(googleid).update({'pd_group': groupid});
      },

      removeFromGroup: function(googleid){
        Refs.fellows.child(googleid).child('pd_group').remove();
      }

    }
  }]);