import React from 'react';
import { mount } from 'enzyme'
import ProductPage from '../Products'
import { Provider } from 'react-redux';
import store from '../../../redux/store/store'

describe('Products page test case', () => {
    it("Snapshot test case", () => {
        const component = mount(
            <Provider store={store}>
                <ProductPage />
            </Provider>
        )
        expect(component).toMatchSnapshot()
    })
    it("Button click test case", () => {
        const setProductToStore = jest.fn()
        const component = mount(
            <Provider store={store}>
                <ProductPage onClick={setProductToStore} />
            </Provider>
        )
        expect(component.find('button').at(0).simulate('click'))
    })
})
