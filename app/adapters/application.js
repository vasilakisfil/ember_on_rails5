import JSONAPIAdapter from 'ember-data/adapters/json-api';
import DataAdapterMixin from 'ember-simple-auth/mixins/data-adapter-mixin';
import ENV from 'ember-on-rails5/config/environment';
import HasManyQuery from 'ember-data-has-many-query';


export default JSONAPIAdapter.extend(DataAdapterMixin, HasManyQuery.RESTAdapterMixin, {
  host: ENV.APP.API_HOST,
  namespace: ENV.APP.API_NAMESPACE,
  authorizer: 'authorizer:devise'
});

