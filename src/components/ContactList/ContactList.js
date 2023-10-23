import PropTypes from 'prop-types';

import css from './ContactList.module.css';

export function ContactList({ contacts, deleteContact }) {
  return (
    <div className={css.contacts}>
      <div className={css.contacts__side}>
        <h2 className={css.contacts__title}>Contacts</h2>
      </div>
      <ul className={css.list}>
        {contacts.map(contact => (
          <li className={css.list__item} key={contact.id}>
            {contact.name}: {contact.number}{' '}
            <button
              className={css.list__button}
              type="button"
              onClick={e => deleteContact(contact.id)}
            >
              Delete
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

ContactList.propTypes = {
  contacts: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      number: PropTypes.string.isRequired,
    })
  ),
  deleteContact: PropTypes.func.isRequired,
};
