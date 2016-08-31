import Ember from 'ember';
import ApplicationRouteMixin from 'ember-simple-auth/mixins/application-route-mixin';

export default Ember.Route.extend(ApplicationRouteMixin, {
  notify: Ember.inject.service('notify'),

  actions: {
    createSession(session) {
      this.get('session').authenticate(
        'authenticator:devise',
        session.get('identifier'),
        session.get('password')
      ).then(
        () => {
          this.get('notify').success('You are in!');
          this.controllerFor('sessions.new').set('loginError', null);
        },
        (reason) => this.controllerFor('sessions.new').set('loginError', reason)
      );
    },
    destroySession() {
      this.get('session').invalidate();
    },
  },

  sessionObserver: Ember.observer('session.isAuthenticated', function() {
    Ember.Logger.debug(this.get('session.isAuthenticated'));
    if(this.get('session.isAuthenticated')) {
      let userId = this.get('session.data.authenticated.userId');

      if(this.get('store').recordIsLoaded('user', userId)) {
        this._loadCurrentUser();
      } else {
        this._fetchCurrentUser();
      }
    } else {
      this.set('session.currentUser', null);
    }
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

    this.get('store').findRecord('user', userId).then(function(user) {
      _this.set('session.currentUser', user);
    });
  }
});
