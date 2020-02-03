import * as React from 'react';
import './App.css';
import InterestifyTable from './components/InterestifyTable';
import ApiService  from './services/ApiService';
import TextField  from '@material-ui/core/TextField';
import { Button } from '@material-ui/core';

const apiService = new ApiService();

interface TableData {
  header: any,
  body: any
}

function App() {
  const [tableData, setTableData] = React.useState<TableData>({
    header: [],
    body: []
  });
  
  const [searchKey, setSearchKey] = React.useState('');
  const [query, setQuery] = React.useState(searchKey);
  
  React.useEffect(() => {
    setTableData({
      header: [],
      body: []
    });
    apiService.searchTweets(query).then(res => {
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
    }); 
  }, [query]);   

  function searchTweets() {
    setQuery(searchKey); 
  }

  function handleSearchChange($event: React.ChangeEvent<HTMLInputElement>) {
    setSearchKey($event.target.value);
  }

  return (
    <div className="App">
      <div style={ { paddingBottom: '15px' } }>
        <TextField size="small" type="text" variant="outlined" value={ searchKey } onChange={ handleSearchChange }
                    placeholder="search" style={ { width: '50%', padding: '0 10px' } } />
        <Button className="btn-primary" variant="contained" onClick={ searchTweets } >Search</Button>
      </div>
      {
        tableData.header.length > 0 ? 
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
    </div>
  );
}

export default App;
