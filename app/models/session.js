import DS from 'ember-data';

export default DS.Model.extend({
  userId:  DS.attr('string'),
  email: DS.attr('string'),
  token: DS.attr('string'),

  user: DS.belongsTo('user')
});
