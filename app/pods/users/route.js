import Ember from 'ember';

export default Ember.Route.extend({
  model(params) {
    Ember.Logger.debug('hello!');
    return this.get('store').findAll('user');
  }
});

