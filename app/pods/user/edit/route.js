import Ember from 'ember';

export default Ember.Route.extend({
  notify: Ember.inject.service('notify'),

  actions: {
    updateUser(user) {
      if(user.valid()) {
        user.save().then(
          () => {
            user.clean();
            this.get('notify').success('Your profile has been updated!');
            this.transitionTo('index');
          }
        );
      }
    }
  }
});


