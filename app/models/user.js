import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name:  DS.attr('string'),

  admin: DS.attr('boolean'),

  created_at: DS.attr('moment'),
  updated_at: DS.attr('moment'),

  microposts: DS.hasMany('micropost', {async: true})
});
