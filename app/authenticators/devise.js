import Ember from 'ember';
import Devise from 'ember-simple-auth/authenticators/devise';

export default Devise.extend({
  store: Ember.inject.service('store'),
  serverTokenEndpoint: 'http://localhost:3000/api/v1/sessions',
  tokenAttributeName: 'token',
  identificationAttributeName: 'email'
});
