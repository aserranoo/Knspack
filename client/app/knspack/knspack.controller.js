'use strict';
(function() {
    angular.module('knsapackApp')
        .controller('KnspackController', KnspackController);

    function KnspackController($scope, $http, socket) {
        var ws = this;
        ws.obj = {};
        ws.solutions = {Caja1: "",Caja2: "",Caja3: "",Caja4: "",Caja5: "",Caja6: "",Caja7: "",Caja8: ""};
        var items = [],
            max_val = 0, 
            solutions = [],          
            i, item, val;
        ws.solutions = [];
        ws.obj.Volumen = 5000
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

            for (var a = 0; a <= ws.objetos[0].max; a++) {
                for (var b = 0; b <= ws.objetos[1].max; b++) {
                    for (var c = 0; c <= ws.objetos[2].max; c++) {
                        for (var d = 0; d < ws.objetos[3].max; d++) {
                            for (var e = 0; e < ws.objetos[4].max; e++) {
                                for (var g = 0; g < ws.objetos[5].max; g++) {                                 
                                    if (g * ws.objetos[5].Area + a * ws.objetos[0].Area + b * ws.objetos[1].Area + c * ws.objetos[2].Area + d * ws.objetos[3].Area + e * ws.objetos[4].Area > ws.obj.Volumen) {
                                        continue;
                                    }
                                    val = g * ws.objetos[5].Precio + a * ws.objetos[0].Precio + b * ws.objetos[1].Precio + c * ws.objetos[2].Precio + d * ws.objetos[3].Precio + e * ws.objetos[4].Precio;
                                    if (val > max_val) {
                                        solutions = [];
                                        max_val = val;
                                    }
                                    if (val === max_val) {
                                        ws.solutions.push({Caja1: g, Caja2: a,Caja3: b, Caja4: c, Caja5: d, Caja6: e, Caja7: g});
                                    }
                                };
                            };
                        };
                    };
                };
            };
            console.log("maximum value: " + max_val + '<br>');
            for (i = 0; i < solutions.length; i += 1) {
                item = solutions[i];                
                document.write("(gold: " + item[0] + ", panacea: " + item[1] + ", ichor: " + item[2] + ")<br>");
            };
        };
    }
})();
