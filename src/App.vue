<template>
  <div id="app">

    <header-component></header-component>

    <calculator-component></calculator-component>

  </div>
</template>

<script>
import HeaderComponent from './components/Header'
import CalculatorComponent from './components/Calculator'

export default {
  name: 'app',
  components: {
    HeaderComponent,
    CalculatorComponent
  }
}
</script>
<style type="text/css">
  body { font: 12px Arial, Helvetica, sans-serif; }
</style>
