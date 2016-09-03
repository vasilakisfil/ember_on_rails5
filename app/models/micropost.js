import DS from 'ember-data';

export default DS.Model.extend({
  content: DS.attr('string'),
  picture: DS.attr('string'), //we  might change that to pictureUrl
  userId: DS.attr('string'),

  createdAt: DS.attr('moment'),
  updatedAt: DS.attr('moment'),

  user: DS.belongsTo('user', {async: true}),

  pictureUrl: function() {
    return 'http://localhost:3000/' + this.get('picture');
  }.property('picture')
});
