import Vue from 'vue'
import Search from '@/components/Search'
import Sinon from 'sinon'

describe('Search.vue', () => {
    let vm = null

    beforeEach(() => {
        const container = document.createElement('div')
        const SearchComponent = Vue.extend(Search)
        vm = new SearchComponent()
        vm.$mount(container)
    })

    it('should be instantiated', () => {
        expect(vm.query).to.equal('')
        expect(vm.$el.firstChild.tagName).to.equal('INPUT')
        expect(vm.$el.lastChild.tagName).to.equal('BUTTON')
    })

    it('should emit event when button is clicked', () => {
        const spy = Sinon.spy(vm, '$emit')
        vm.$el.lastChild.click()

        const [eventName, query] = spy.args[0]
        expect(eventName).to.equal('SearchRequested')
        expect(query).to.equal('')
    })

    it('should update query when input value changed', () => {
        const input = vm.$el.firstChild
        input.value = "Hello"
        input.dispatchEvent(new Event('input'))
        expect(vm.query).to.equal('Hello')
    })
})