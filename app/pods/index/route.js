import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    if(this.get('session.isAuthenticated')) {
      return Ember.RSVP.hash({
        feed: this.get('session.currentUser').get(
            'microposts'
          ).then(function(microposts) {
            return microposts.toArray().filterBy('isNew', false);
        }),
        micropost: this._newMicropost()
      });
    }
  },

  actions: {
    createMicropost(micropost) {
      var _this = this;

      micropost.save().then(function(micropost) {
        _this.controllerFor('index').get('model.feed').unshiftObject(micropost);
        _this.controllerFor('index').set('model.micropost', _this._newMicropost());
      });
    }
  },

  _newMicropost() {
    return this.get('store').createRecord('micropost', {
      user: this.get('session.currentUser')
    });
  }
});
