import React from 'react';
import { Button } from '@material-ui/core';
import TextField  from '@material-ui/core/TextField';

interface SearchFormProps {
    dispatch: Function,
    searchKey: string
}

const SearchForm = (props: SearchFormProps): JSX.Element => {
    const { searchKey, dispatch } = props;

    /**
     * handles changes to the input text field
     * @param $event event object
     */
    const handleSearchChange = ($event: React.ChangeEvent<HTMLInputElement>): void => {
        dispatch({ type: 'typing', payload: { searchKey: $event.target.value } });
    }

    return (
        <form action="GET" onSubmit={ ($event) => {
            $event.preventDefault();
            dispatch({ type: 'startSearch', payload: { query: searchKey } });
        } }>
            <div className="row d-flex align-items-baseline justify-content-center">
                <TextField autoFocus size="small" type="text" variant="outlined" value={ searchKey } onChange={ handleSearchChange }
                            placeholder="search" style={ { padding: '10px' } } />
                <Button type="submit" className="btn-primary" variant="contained">Search</Button>
            </div>
        </form>
    );
}

export default SearchForm;