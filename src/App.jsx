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
      const updateContacts = [...this.state.contacts, newContact];
      this.setState({
        contacts: updateContacts,
      });
      localStorage.setItem('contacts', JSON.stringify(updateContacts));
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

  componentDidMount(){
    const storedContacts = JSON.parse(localStorage.getItem('contacts'));
    if (storedContacts) {
      this.setState(prevState => ({ ...prevState, contacts: storedContacts }));
    }
  }

  deleteContact = contactId => {
    const updateContacts = this.state.contacts.filter(contact => contact.id !== contactId);
    this.setState(prevState => ({
      ...prevState,
      contacts: updateContacts,
    }));
    localStorage.setItem('contacts', JSON.stringify(updateContacts));
    Notify.info('Contact has been removed');
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
