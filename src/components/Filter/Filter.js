import PropTypes from 'prop-types';

import css from './Filter.module.css';

export function Filter({ handleFilter }) {
  return (
    <div className={css.search}>
      <input
        className={css.search__input}
        id="search"
        placeholder="Search contact"
        onChange={e => handleFilter(e.target.value)}
      />
    </div>
  );
}

Filter.propTypes = {
  handleFilter: PropTypes.func.isRequired,
};