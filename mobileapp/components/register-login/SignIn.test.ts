// import React from 'react';
// import SignIn from './SignIn';
// import {Provider} from 'react-redux';
// import configureStore from 'redux-mock-store';
// import {render, cleanup, fireEvent} from 'react-native-testing-library';
// import {signInReducerData} from '../../SignIn/SignInData'

// afterEach(cleanup);

// describe('<SignIn />', () => {
//   // configureStore expects a list of middlewares
//   const mockStore = configureStore([]);

//   it('should dispatch increment action', () => {
//     const store = mockStore(signInReducerData);
//     const rendered = render(
//       <Provider store={store}><SignIn /></Provider>
//     );
//     const buttonComponent = rendered.getByTestId('button');

//     fireEvent(buttonComponent, 'press');

//     // This will return all actions dispatched on this store
//     const actions = store.getActions();
//     expect(actions.length).toBe(1);
//     expect(actions[0].type).toEqual('INCREMENT');
//   });
// });
