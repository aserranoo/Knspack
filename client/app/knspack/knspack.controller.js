'use strict';
(function() {
    angular.module('knsapackApp')
        .controller('KnspackController', KnspackController);

    function KnspackController($scope, $http, socket) {
        var ws = this;
        ws.obj = {};
        var items = [],                            
            max_val = 0,
            solutions = [],
            i, item, val;
        ws.objetos = [{
            Descripcion: 'Caja1',
            Area: 3192,
            Precio: 7
        }, {
            Descripcion: 'Caja2',
            Area: 231,
            Precio: 11
        }, {
            Descripcion: 'Caja3',
            Area: 930,
            Precio: 8
        }, {
            Descripcion: 'Caja4',
            Area: 350,
            Precio: 2
        }, {
            Descripcion: 'Caja5',
            Area: 960,
            Precio: 12
        }, {
            Descripcion: 'Caja6',
            Area: 2880,
            Precio: 30
        }, {
            Descripcion: 'Caja7',
            Area: 2184,
            Precio: 16
        }, {
            Descripcion: 'Caja8',
            Area: 240,
            Precio: 6
        }, {
            Descripcion: 'Caja9',
            Area: 3192,
            Precio: 7
        }];
        ws.agregarElementos = agregarElementos;
        ws.eliminarElementos = eliminarElementos;
        ws.optimizarEspacio = optimizarEspacio;

        function agregarElementos(data, $index) {
            var datos = {};
            datos = {
                Descripcion: data.Descripcion,
                Area: data.Area,
                Precio: data.Precio
            }
            ws.objetos.push(datos);
        }

        function eliminarElementos($index) {
            ws.objetos.splice($index, 1);
        }

        function optimizarEspacio() {
            for (i = 0; i < ws.objetos.length; i += 1) {              	
                item = ws.objetos[i];
                item.max = Math.min(
                    Math.floor(ws.obj.Volumen / ws.objetos[i].Area)
                );
            }

            for (objeto in ws.objetos){
            	for (var i 0; i <= ws.objetos.length; i++) {
            		i * ws.objetos[i].Area
            	};
            }

            for (g = 0; g <= gold.max; g += 1) {
                for (p = 0; p <= panacea.max; p += 1) {
                    for (i = 0; i <= ichor.max; i += 1) {
                        if (i * ichor.weight + g * gold.weight + p * panacea.weight > knapsack.weight) {
                            continue;
                        }
                        if (i * ichor.volume + g * gold.volume + p * panacea.volume > knapsack.volume) {
                            continue;
                        }
                        val = i * ichor.value + g * gold.value + p * panacea.value;
                        if (val > max_val) {
                            solutions = [];
                            max_val = val;
                        }
                        if (val === max_val) {
                            solutions.push([g, p, i]);
                        }
                    }
                }
            }
            console.log(solutions)
            // document.write("maximum value: " + max_val + '<br>');
            // for (i = 0; i < solutions.length; i += 1) {
            //     item = solutions[i];
            //     document.write("(gold: " + item[0] + ", panacea: " + item[1] + ", ichor: " + item[2] + ")<br>");
            // }
        }
    }
})();
