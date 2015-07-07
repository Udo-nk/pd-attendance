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

        loginWithRole: function(cb) {
          var user = $rootScope.currentUser;
          $.getJSON('/admin?uid=' + user.uid + '&token=' + user.access_token)
            .success(function(data) {
              Refs.root.authWithCustomToken(data, cb);
            })
            .fail(function(err) {
              cb(err);
            });
        },

        logout: function() {
          Refs.root.unauth();
          $rootScope.currentUser = null;
        },

        auth: function(authData, cb) {
          if(!authData) {
            // we're logged out. nothing else to do
            return cb(null);
          }
          var self = this;
          // construct the user record the way we want it
          var user = self.buildUserObjectFromGoogle(authData);
          $rootScope.currentUser = user;
          return cb(user);
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