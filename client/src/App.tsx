import React, { Fragment } from 'react';
import Search from './Search';
import MealCard from './MealCard';
import SearchYoutube from './SearchYoutube';


const App: React.FC = (): JSX.Element => {
  return (
    <Fragment>
      <Search />
      <MealCard />
    </Fragment>
  );
};

export default App;
