/* global it, expect */
import React from 'react';
import { Provider } from 'react-redux';
import { createStore, applyMiddleware } from 'redux';
import reduxThunk from 'redux-thunk';

// import ReactDOM from 'react-dom';
import { configure, mount } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import reducers from './reducers';

import App from './App';
configure({ adapter: new Adapter() });

const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
  applyMiddleware(reduxThunk),
);

const component = mount(<App />);
<Provider store={store}>
  it('renders without crashing', () => {
    // wrapper = shallow(<Home output={output} />);
    component.find(App).to.have.length(1);
  };
</Provider>
