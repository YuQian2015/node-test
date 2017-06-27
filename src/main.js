//main.js
import Vue from 'vue';
var greeter = require('./Greeter.js');
document.body.appendChild(greeter());

var app = new Vue({
  el: '#app',
  data: {
    message: 'Hello Vue!'
  }
})
