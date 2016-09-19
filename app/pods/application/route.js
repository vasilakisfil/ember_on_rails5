import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  notify: Ember.inject.service('notify'),

  afterModel() {
    if(this.get('session.isAuthenticated')) {
      let userId = this.get('session.data.authenticated.userId');

      if(this.get('store').recordIsLoaded('user', userId)) {
        this._loadCurrentUser();
      } else {
        return this._fetchCurrentUser();
      }
    } else {
      this.set('session.currentUser', null);
    }
  },

  actions: {
    createSession(session) {
      this.get('session').authenticate(
        'authenticator:devise',
        session.get('identifier'),
        session.get('password')
      ).then(
        () => {
          this.get('notify').success('You are in!');
          this._loadCurrentUser();
          this.controllerFor('sessions.new').set('loginError', null);
        },
        (reason) => this.controllerFor('sessions.new').set('loginError', reason)
      );
    },
    destroySession() {
      this.get('session').invalidate();
    },
    getPage(page) {
      this.transitionTo({ queryParams: { page }});
    }
  },

  sessionObserver: Ember.observer('session.isAuthenticated', function() {
    Ember.Logger.debug(this.get('session.isAuthenticated'));
  }),

  _loadCurrentUser() {
    this.set(
      'session.currentUser',
      this.get('store').peekRecord(
        'user', this.get('session.data.authenticated.userId')
      )
    );
  },

  _fetchCurrentUser() {
    var userId = this.get('session.data.authenticated.userId');
    var _this = this;

    return this.get('store').findRecord('user', userId).then(function(user) {
      _this.set('session.currentUser', user);
    });
  }
});
