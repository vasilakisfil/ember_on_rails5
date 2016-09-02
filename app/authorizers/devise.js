import Devise from 'ember-simple-auth/authorizers/devise';

export default Devise.extend({
  serverTokenEndpoint: 'http://localhost:3000/api/v1/sessions'
});
