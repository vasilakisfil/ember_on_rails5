import DS from 'ember-data';

export default DS.JSONAPISerializer.extend({
  normalizeResponse(store, primaryModelClass, payload, id, requestType) {
    this.removeEmptyData(payload);

    return this._super(store, primaryModelClass, payload, id, requestType);
  },

  removeEmptyData(payload) {
    var relationships = payload.data.relationships;

    if(relationships) {
      Object.keys(relationships).forEach((key) => {
        let data = relationships[key].data;

        if(data && this._isNullOrEmptyArray(data)) {
          delete relationships[key].data;
        }
      });
    }

    var includedRel = payload.included || [];

    includedRel.forEach((resource, index, includes) => {
      var relationships = resource.relationships;

      if(relationships) {
        Object.keys(relationships).forEach((key) => {
          let data = relationships[key].data;

          if(data && this._isNullOrEmptyArray(data)) {
            delete relationships[key].data;
          }
        });
      }

      includes[index] = resource;
    });

    return payload;
  },

  serializeAttribute(snapshot, json, key, attributes) {
    if (snapshot.record.get('isNew') || snapshot.changedAttributes()[key]) {
      this._super(snapshot, json, key, attributes);
    }
  },

  _isNullOrEmptyArray(value) {
    return (value === null || value === undefined || value.length === 0);
  }
});
