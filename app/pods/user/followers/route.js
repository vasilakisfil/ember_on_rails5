import Ember from 'ember';

export default Ember.Route.extend({
  model() {
    return Ember.RSVP.hash({
      user: this.modelFor('user'),
      followers: this.modelFor('user').get('followers')
    });
  }
});
