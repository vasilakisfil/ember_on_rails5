import DS from 'ember-data';
import HasManyQuery from 'ember-data-has-many-query';
import Person from './person';

export default Person.extend(HasManyQuery.ModelMixin, {
  password: DS.attr('string'),

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
