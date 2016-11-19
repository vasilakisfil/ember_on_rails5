import Ember from 'ember';

export default Ember.Route.extend({
  actions: {
    followUser(userId) {
      this.get('store').adapterFor('application').ajax(
        this.get('store').adapterFor('user').buildURL(
          'user', this.get('session.currentUser.id')
        ) + '/followings/' + userId,
        "POST",
        {}
      ).then((userData) => this.get('store').pushPayload(userData));
    },

    unfollowUser(userId) {
      this.get('store').adapterFor('application').ajax(
        this.get('store').adapterFor('user').buildURL(
          'user', this.get('session.currentUser.id')
        ) + '/followings/' + userId,
        "DELETE",
        {}
      ).then((userData) => this.get('store').pushPayload(userData));
    }
  },
});
