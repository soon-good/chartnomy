import Vue from 'vue'
import Router from 'vue-router'
// import HelloWorld from '@/components/HelloWorld'
import TrendingIndex from "@/components/TrendingIndex";
import ZingIndexVue from "@/components/ZingIndexVue";
import ZingIndex from "@/components/ZingIndex";
import ChartMenu from "@/components/ChartMenu";

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    // {
    //   path: '/',
    //   name: 'HelloWorld',
    //   component: HelloWorld
    // }
    {
      path: '/',
      name: 'ChartMenu',
      component: ChartMenu
    },
    {
      path: '/amchart4-vue',
      name: 'TrendingIndex',
      component: TrendingIndex
    },
    {
      path: '/zingchart-vue',
      name: 'ZingIndexVue',
      component: ZingIndexVue
    },
    {
      path: '/zingchart-org',
      name: 'ZingIndexOrg',
      component: ZingIndex
    }
  ]
})
