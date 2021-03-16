//const registerDog = require('../src/registerDog/registerDog');

import RegisterDogForm from "../src/registerDog/registerDog"


test('name input', ()=>{
     expect(RegisterDogForm)
});

/*describe('SomeComponent' () => {
  it('validates model on button click', () => {
      const handleSubmit = jest.fn();
      const wrapper = mount(
          <Login handleSubmit={handleSubmit}/>
      );
      const instance = wrapper.instance();
      const submitBtn = app.find('#sign-in')
      submitBtn.simulate('click')
      expect(handleSubmit).toHaveBeenCalled();
    });
  }*/
/*test('adds 1 + 2 to equal 3', () => {
  expect(sum(1, 2)).toBe(3);
});*/