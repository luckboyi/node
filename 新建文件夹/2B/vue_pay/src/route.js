const routes = [
  { path: '/index/:merchantid/:terminal_sn/:appid', component: require(`./pages/product.vue`), },
  { path: '/back/:merchantid/:terminal_sn/:appid/:productid/:orderid', component: require(`./pages/payback.vue`), },
  { path: '/error/:merchantid/:terminal_sn/:appid/:productid/:orderid', component: require(`./pages/error.vue`), },
  { path: '/terminal/:merchantid/:terminal_sn/:appid', component: require(`./pages/terminal.vue`), }
]

export default routes;