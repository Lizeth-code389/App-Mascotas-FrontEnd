var app = new Vue({
    el: '#app',
    data: {
      respuesta:0,
      numero1: null,
      numero2: null,
      nameButton:'Sumar',

    },

    methods:{
        sumar(){
            this.respuesta=this.numero1+this.numero2
        },
        resta(){
            this.respuesta=this.numero1-this.numero2
        }
    }
  })
