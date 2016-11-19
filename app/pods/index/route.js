import Ember from 'ember';
import ResetScroll from 'ember-on-rails5/mixins/reset-scroll';

export default Ember.Route.extend(ResetScroll, {
  queryParams: {
    page: {
      refreshModel: true
    }
  },

  model(params) {
    if(this.get('session.isAuthenticated')) {
      return Ember.RSVP.hash({
        feed: this._fetchFeed(params.page || 1),
        micropost: this._newMicropost()
      });
    }
  },

  afterModel() {
    //transitionTo to the same route does not fire didTransition
    this._scrollUp();
  },

  actions: {
    createMicropost(micropost) {
      var _this = this;

      micropost.save().then((micropost) => {
        _this.controllerFor('index').get('model.feed').unshiftObject(micropost);
        _this.controllerFor('index').set('model.micropost', _this._newMicropost());
      });
    }
  },

  _newMicropost() {
    return this.get('store').createRecord('micropost', {
      user: this.get('session.currentUser')
    });
  },

  _fetchFeed(page = 1) {
    return this.get('store').query('micropost', {
      user_id: this.get('session.currentUser.id'), page
    }).then(microposts => {
      return {
        microposts: microposts.filterBy('isNew', false),
        meta: microposts.get('meta')
      };
    });
  }
});
