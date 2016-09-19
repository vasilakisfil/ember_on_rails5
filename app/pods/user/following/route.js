import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      user: this.modelFor('user'),
      followings: this.modelFor('user').get('followings')
    });
  }
});
