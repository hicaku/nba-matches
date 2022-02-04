import { shallowMount } from '@vue/test-utils'
import HomeData from '@/components/HomeData.vue'

describe('HomeData.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(HomeData, {
      props: { msg }
    })
    expect(wrapper.text()).toMatch(msg)
  })
})
