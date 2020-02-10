import React, { useState, useEffect } from 'react';
import InterestifyTable from '../components/FunctionalTable';
import Panel from '../components/Panel';
import ApiService  from '../services/ApiService';
import TextField  from '@material-ui/core/TextField';
import { Button, Grid } from '@material-ui/core';
import CircularProgress from '@material-ui/core/CircularProgress'

const apiService = new ApiService();

interface TableData {
  header: any,
  body: any
}

interface SizeProps {
    id?: string
    width?: string,
    height?: string,
}

const SearchTweets = (props: SizeProps): JSX.Element => {
  const [ tableData, setTableData ] = useState<TableData>({
    header: [],
    body: []
  });

  const [ overflow, setOverflow ] = useState('hidden');
  const [ searchKey, setSearchKey ] = useState('');
  const [ query, setQuery ] = useState(searchKey);
  const [ isLoading, setIsLoading ] = useState(false);
  
  useEffect(() => {
    setTableData({
      header: [],
      body: []
    });

    if (query !== '') {
        setIsLoading(true);
        apiService.searchTweets(query).then(res => {
            setOverflow('scroll');
            var header = [
                { id: 'tweet', title: 'Tweet' },
                { id: 'retweetCount', title: 'Retweets' },
                { id: 'screenName', title: 'Screen\u00a0Name' },
                { id: 'location', title: 'Location' }
            ];
            var body: any[] = [];
            res.data.forEach((obj: any) => {
                body.push({
                tweet: obj.text,
                retweetCount: obj.retweet_count,
                screenName: '@' + obj.user.screen_name,
                location: obj.user.location
                });
            });
            
            setTableData({
                header, body
            });

            setIsLoading(false);
        }).catch(err => {
            console.log(err);
            setIsLoading(false);
        });
    } else {
        setOverflow('hidden');
    } 
  }, [query]);   

  const searchTweets = (): void => {
    setQuery(searchKey);
    console.log(query);
  }

  const handleSearchChange = ($event: React.ChangeEvent<HTMLInputElement>): void => {
    setSearchKey($event.target.value);
  }

  /**
   * calucates the top disposition of the dialog loader
   * based on the height of the panel
   */
  const disposition = () => {
      if (props.height) {
        var height = props.height;
        var unit = height.substring(height.length - 2);
        height = height.substring(0, height.length - 2);
        return (parseInt(height) / 3) + unit;
      } else return '';
  }

  return (
    <Panel id={ props.id } width={ props.width } height={ props.height } overflow={ overflow }>
        <Grid container spacing={ 2 }>
            <Grid item xs={ 12 }>
                <form onSubmit={ ($event) => {
                    $event.preventDefault();
                    searchTweets();
                } }>
                    <TextField size="small" type="text" variant="outlined" value={ searchKey } onChange={ handleSearchChange }
                                placeholder="search" style={ { padding: '0 10px' } } />
                    <Button type="submit" className="btn-primary" variant="contained">Search</Button>
                </form>
            </Grid>
            <Grid className="container" item xs={ 12 }>
                {
                    !isLoading && tableData.header.length > 0 ? 
                    <InterestifyTable header={ tableData.header } body={ tableData.body } striped sortable missingValue="N/A"
                        pagination={ {
                        rowsPerPageOptions: [5, 10, 15],
                        rowsPerPage: 5,
                        } }
                        sort={ {
                        id: 'retweetCount',
                        order: 'desc'
                        } } /> :
                    <div></div>
                }
                {
                isLoading && (
                    <CircularProgress 
                        variant="indeterminate"
                        className="dialogLoader"
                        style={{ top: disposition() }}
                    />
                )
            }
            </Grid>
        </Grid>
    </Panel>
  );
}

export default SearchTweets;