import DS from 'ember-data';

export default DS.Model.extend({
  user_id:  DS.attr('string'),
  user: DS.belongsTo('user'),

  email: DS.attr('string'),
  password: DS.attr('string')
});

