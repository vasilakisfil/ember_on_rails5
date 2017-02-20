import Ember from 'ember';
import DS from 'ember-data';

export default DS.Model.extend({
  email: DS.attr('string'),
  name:  DS.attr('string'),

  admin: DS.attr('boolean'),

  followerState: DS.attr('boolean'),
  followingState: DS.attr('boolean'),

  micropostsCount: DS.attr('number'),
  followersCount: DS.attr('number'),
  followingsCount: DS.attr('number'),

  createdAt: DS.attr('moment'),
  updatedAt: DS.attr('moment'),

  microposts: DS.hasMany('micropost', {async: true}),
  feed: DS.hasMany('micropost', {async: true}),
  followers: DS.hasMany('person'),
  followings: DS.hasMany('person'),

  isFollower: Ember.computed.oneWay('followerState'),
  isFollowed: Ember.computed.oneWay('followingState'),
});

