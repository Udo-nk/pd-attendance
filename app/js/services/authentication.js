"use strict";

appServices.factory('Authentication', ['$rootScope', 'Refs',
    function($rootScope, Refs) {
      return {
        login: function(cb) {
          var options = { remember: 'sessionOnly', scope: 'email' };
          Refs.root.authWithOAuthPopup('google', function(error, authData) {
            cb(error, authData);
          }, options);
        },

        isAdmin: function(usersEmail, cb){
          Refs.admin.once('value', function(snap){
            var admins = snap.val();
            for(var email in admins){
              if(admins.hasOwnProperty(email)){
                if(admins[email] == usersEmail){
                  cb(true);
                  return true;
                }
              }
            }
            cb(false);
          });
        },

        logout: function() {
          Refs.root.unauth();
          $rootScope.currentUser = null;
        },

        buildUserObjectFromGoogle: function(authData) {
          return {
            uid: authData.uid,
            name: authData.google.displayName,
            email: authData.google.email,
            access_token: authData.google.accessToken,
            first_name: authData.google.cachedUserProfile.given_name,
            known_as: authData.google.cachedUserProfile.given_name,
            last_name: authData.google.cachedUserProfile.family_name,
            picture: authData.google.cachedUserProfile.picture,
            created_at: Firebase.ServerValue.TIMESTAMP
          };
        }
      };
    }
  ]);