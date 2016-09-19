import Ember from 'ember';
import ResetScroll from 'ember-on-rails5/mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model(params) {
    return Ember.RSVP.hash({
      user: this.modelFor('user'),
      microposts: this._fetchMicroposts(params.page)
    });
  },

  afterModel() {
    //transitionTo to the same route does not fire didTransition
    this._scrollUp();
  },

  _fetchMicroposts(page = 1) {
    return this.get('store').query('micropost', {
      user_id: this.modelFor('user').get('id'), page
    });
  }
});
