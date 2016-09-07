import Ember from 'ember';

export default Ember.Route.extend({
  notify: Ember.inject.service('notify'),

  model() {
    return this.get('store').createRecord('user', {});
  },

  actions: {
    createUser(user) {
      if (!user.valid()) { return false; }

      user.save().then(
        () => {
          this.get('notify').success('Please check your email to activate your account', {
            closeAfter: 10000
          });
          this.transitionTo('index');
        }
      );
    }
  }
});
