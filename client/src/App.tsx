import * as React from 'react';
// import logo from './logo.svg';
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
      col2: 'stop',
      col1: 'start', 
      actions: [ 
        { name: 'add', icon: 'add', click: () => { console.log('add clicked') } }, 
        { name: 'delete', icon: 'delete', click: () => { console.log('delete clicked') } }
      ]
    },
    { col3: 'stop', col2: 'start'},
    { col2: 'stop', col1: 'start'},
    { col1: 'stop', col2: 'start', actions: [ { name: 'add', icon: 'delete' } ] }
  ];
  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Interestify</h1>
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          React Frontend
        </p>
      </header> */}
      <InterestifyTable header={ header } body={ body } striped />
    </div>
  );
}

export default App;
