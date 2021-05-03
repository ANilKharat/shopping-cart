import React from 'react';
import { mount } from 'enzyme'
import BasketPage from '../Basket'
import { Provider } from 'react-redux';
import store from '../../../redux/store/store'

describe('Products page test case', () => {
    it("Snapshot test case", () => {
        const component = mount(
            <Provider store={store}>
                <BasketPage />
            </Provider>
        )
        expect(component).toMatchSnapshot()
    })
    it("Plus Button click test case", () => {
        const incrementCount = jest.fn()
        const component = mount(
            <Provider store={store}>
                <BasketPage onClick={incrementCount} />
            </Provider>
        )
        console.log(component.debug());
        expect(component.find('#plus_button').at(0).simulate('click'))
    })
    it("Minus Button click test case", () => {
        const decrementCount = jest.fn()
        const component = mount(
            <Provider store={store}>
                <BasketPage onClick={decrementCount} />
            </Provider>
        )
        expect(component.find('#minus_button').at(0).simulate('click'))
    })
})