import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    var relationships = payload.data.relationships;

    if(relationships) {
      Object.keys(relationships).forEach(function(key) {
        if(relationships[key].data && relationships[key].data.length === 0) {
          delete relationships[key].data;
        }
      });
    }

    return this._super(store, primaryModelClass, payload, id, requestType);
  },
});
