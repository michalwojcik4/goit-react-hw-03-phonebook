import PropTypes from 'prop-types';

import { Component } from 'react';
import { nanoid } from 'nanoid';

import css from './ContactForm.module.css';

const INITIAL_STATE = {
  name: '',
  number: '',
};

export class ContactForm extends Component {
  state = {
    ...INITIAL_STATE,
  };

  handleChange = evt => {
    const { name, value } = evt.target;
    this.setState({ [name]: value });
  };

  handleSubmit = evt => {
    evt.preventDefault();

    const newContact = {
      id: nanoid(),
      name: evt.target.name.value,
      number: evt.target.number.value,
    };

    this.props.addNewContact(newContact);
    this.reset();
  };

  reset = () => {
    this.setState({ ...INITIAL_STATE });
  };

  render() {
    const { name, number } = this.state;
    return (
      <form className={css.form} onSubmit={this.handleSubmit}>
        <div className={css.form__side}>
          <h1 className={css.form__title}>Phonebook</h1>
        </div>
        <div className={css.form__side}>
          <div className={css.form__group}>
            <input
              className={css.form__input}
              type="text"
              name="name"
              placeholder='Imie i Nazwisko'
              //pattern="^[-a-zA-Za-яА-Я]+(([' -][-a-zA-Za-яА-Я])?[-a-zA-Za-яА-Я]*)*$"
              title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
              required
              value={name}
              onChange={this.handleChange}
            />
          </div>
          <div className={css.form__group}>
            <input
              className={css.form__input}
              type="tel"
              name="number"
              placeholder='000 000 000'
              //pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
              title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
              required
              value={number}
              onChange={this.handleChange}
            />
          </div>
          <div className={css.form__group}>
            <button type="submit" className={css.form__button}>
              Add Contact
            </button>
          </div>
        </div>
      </form>
    );
  }
}

ContactForm.propTypes = {
  addNewContact: PropTypes.func.isRequired,
};