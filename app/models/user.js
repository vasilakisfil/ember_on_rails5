import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name:  DS.attr('string'),

  admin: DS.attr('boolean'),

  password: DS.attr('string'),

  micropostsCount: DS.attr('number'),
  followersCount: DS.attr('number'),
  followingsCount: DS.attr('number'),

  created_at: DS.attr('moment'),
  updated_at: DS.attr('moment'),

  microposts: DS.hasMany('micropost', {async: true}),

  valid() {
    if (!this.get('password')) { return true; }

    this.get('errors')._clear();

    if (this.get('password') === this.get('passwordConfirmation')) { return true;}

    this.get('errors')._add('passwordConfirmation', 'is not the same with the password');
    return false;
  },

  clean() {
    this.setProperties({
      password: null,
      passwordConfirmation: null
    });
  }
});
