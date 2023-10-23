import { Component } from 'react';

import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { ContactForm } from './components/ContactForm/ContactForm';
import { Filter } from './components/Filter/Filter';
import { ContactList } from './components/ContactList/ContactList';

import css from './App.module.css';

export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  addNewContact = newContact => {
    const contactCheck = this.state.contacts.some(
      contact => contact.number === newContact.number
    );
    if (!contactCheck) {
      this.setState({
        contacts: [...this.state.contacts, newContact],
      });
      Notify.success('Great! Contact has been added');
    } else {
      Notify.failure('There is a contact for this number in the phone book');
    }
  };

  handleFilter = inputValue => {
    this.setState({
      filter: inputValue,
    });
  };

  SearchContact = () => {
    return this.state.contacts.filter(
      contact =>
        contact.name.toLowerCase().includes(this.state.filter.toLowerCase()) ||
        contact.number.includes(this.state.filter)
    );
  };

  deleteContact = contactId => {
    this.setState(prevState => ({
      ...prevState,
      contacts: this.state.contacts.filter(contact => contact.id !== contactId),
    }));
  };

  render() {
    return (
      <div className={css.container}>
        <div className={css.container__box}>
          <ContactForm addNewContact={this.addNewContact} />
        </div>
        <div className={css.container__box}>
          
          <Filter handleFilter={this.handleFilter} />
          <ContactList
            contacts={this.SearchContact()}
            deleteContact={this.deleteContact}
          />
        </div>
      </div>
    );
  }
}
