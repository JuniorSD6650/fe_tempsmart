import React from 'react';
import Header from './components/Header';
import ActivityList from './components/ActivityList';
import AddActivity from './components/AddActivity';

function App() {
    return (
        <div className="App">
            <Header />
            <ActivityList />
            <AddActivity />
        </div>
    );
}

export default App;
