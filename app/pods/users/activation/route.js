import Ember from 'ember';

export default Ember.Route.extend({
  notify: Ember.inject.service('notify'),

  beforeModel(transition) {
    if(Ember.isBlank(transition.queryParams.token) || Ember.isBlank(transition.queryParams.token)) {
      this.transitionTo('sessions.new');
    }
    this.set('params', transition.queryParams);
  },

  setupController() {
    this._super(...arguments);

    let query = `email=${this.get('params').email}&token=${this.get('params').token}`;

    this.get('store').adapterFor('user').ajax(
      this.get('store').adapterFor('user').buildURL('users') + `/activate?${query}`,
      "POST",
      {}
    ).then(() => {
      this.transitionTo('sessions.new');
      this.get('notify').success('Great! You verified your email and you can now login');
    }, () => {
      this.transitionTo('application');
      this.get('notify').error('Activation link is invalid');
    });
  }
});

