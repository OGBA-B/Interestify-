import * as React from 'react';
import './App.css';
import InterestifyTable from './components/InterestifyTable';

function App() {
  var header = [
    { id: 'col1', title: 'Colunn 1' },
    { id: 'col2', title: 'Colunn 2' },
    { id: 'col3', title: 'Column 3' }
  ];
  var body = [ 
    { 
      col2: 'apple',
      col1: 'breakfast', 
      actions: [ 
        { name: 'add', icon: 'add', click: () => { console.log('add clicked') } }, 
        { name: 'delete', icon: 'delete', click: () => { console.log('delete clicked') } }
      ]
    },
    { col3: 'stop', col2: 'poundo'},
    { col2: 'beans', col1: 'lunch'},
    { col1: 'dinner', col2: 'rice', actions: [ { name: 'add', icon: 'delete' } ] }
  ];
  return (
    <div className="App">
      <InterestifyTable header={ header } body={ body } striped sortable missingValue="N/A"
                        pagination={ {
                          rowsPerPageOptions: [1, 3, 5],
                          rowsPerPage: 3,
                        } }
                        footer={ <div>Lorem Ipsum is simply dummy text of the printing.</div> } />
    </div>
  );
}

export default App;
