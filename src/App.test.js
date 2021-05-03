import React from 'react';
import { mount } from 'enzyme';
import App from './App'
import { Provider } from 'react-redux'
import store from '../src/redux/store/store'


describe('Products page test case', () => {
    it("Snapshot test case", () => {
        const component = mount(
            <Provider store={store}>
                <App />
            </Provider>
        )
        expect(component).toBeTruthy()
    })
})