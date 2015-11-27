'use strict';
(function() {
    angular.module('knsapackApp')
        .controller('KnspackController', KnspackController);

    function KnspackController($scope, $http, socket) {
        var ws = this;
        ws.volumenChecked = [{
            volumen: 114750,
            check: false
        }, {
            volumen: 791200,
            check: false
        }, {
            volumen: 1240800,
            check: false
        }, {
            volumen: 655200,
            check: false
        }, {
            volumen: 1240800,
            check: false
        }];
        ws.objetos = [{
            Descripcion: 'Caja1',
            Altura: 11,
            Largo: 9,
            Ancho: 9,
            Volumen: 3192,
            Beneficio: 7,
            Ruta: "assets/images/objeto2.jpg",
            MenorA: 220,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja2',
            Altura: 25,
            Largo: 15,
            Ancho: 20,
            Volumen: 231,
            Beneficio: 11,
            Ruta: "assets/images/objeto3.jpg",
            MenorA: 100,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja3',
            Altura: 5,
            Largo: 2,
            Ancho: 7,
            Volumen: 930,
            Beneficio: 8,
            Ruta: "assets/images/objeto4.jpg",
            MenorA: 500,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja4',
            Altura: 6,
            Largo: 3,
            Ancho: 13,
            Volumen: 350,
            Beneficio: 2,
            Ruta: "assets/images/objeto5.jpg",
            MenorA: 300,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja5',
            Altura: 7,
            Largo: 5,
            Ancho: 10,
            Volumen: 960,
            Beneficio: 12,
            Ruta: "assets/images/objeto16.jpg",
            MenorA: 400,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja6',
            Altura: 12,
            Largo: 4,
            Ancho: 5,
            Volumen: 2880,
            Beneficio: 30,
            Ruta: "assets/images/objeto21.jpg",
            MenorA: 500,
            MayorA: 1,
            Checked: true
        }];

        ws.solutions = [];
        ws.volumenRestante;
        ws.beneficioTotal = 0;
        ws.volumenUtilizado;
        ws.optimizarEspacio = optimizarEspacio;
        ws.checkVol = checkVol;
        ws.obtenerVol = obtenerVol;
        ws.obtenerSolucionInicial = obtenerSolucionInicial;
        ws.validarObjetos = validarObjetos;

        function validarObjetos(index) {
            var sumaVolumenMinima;
            var sumaVolumenMaxima;
            _.forEach(ws.objetos, function(value, key) {
                if (value.Checked) {
                    sumaVolumenMinima += value.Volumen * value.MayorA
                    sumaVolumenMaxima += value.Volumen * value.MenorA
                }
            });
            if ((sumaVolumenMaxima || sumaVolumenMinima) > ws.volumenRestante) {
                
            }
        }

        function checkVol(index) {
            _.forEach(ws.volumenChecked, function(value, key) {
                if (key == index) {
                    ws.volumenChecked[key].check = true;
                } else {
                    ws.volumenChecked[key].check = false;
                }
            });
            ws.volumenRestante = ws.volumenChecked[index].volumen
        }

        function obtenerVol() {
            var vol = 0;
            _.forEach(ws.volumenChecked, function(value, key) {
                if (value.check) {
                    ws.volumenRestante = value.volumen
                }
            });
        }

        function obtenerSolucionInicial(objetos) {
            _.forEach(objetos, function(value, key) {
                if (value.Checked) {
                    ws.solutions.push({
                        Descripcion: value.Descripcion,
                        Cantidad: value.MayorA,
                        CantidadMax: value.MenorA,
                        Volumen: value.Volumen,
                        Beneficio: value.Beneficio
                    })
                }
            });
            _.forEach(ws.solutions, function(value, key) {
                ws.beneficioTotal = ws.beneficioTotal + (value.Cantidad * value.Beneficio);
                ws.volumenRestante = ws.volumenRestante - (value.Cantidad * value.Volumen);
            });
            return ws.solutions
        }

        function optimizarEspacio() {
            var solucionBeta = {}
            var vol = 0;
            var tmpVol = 0;
            var ben = 0;
            ws.solutions = [];
            ws.solucionFinal = [];
            ws.beneficioTotal = 0;
            ws.volumenRestante = 0;
            ws.volumenUtilizado = 0;
            obtenerVol();
            var iteraciones = [];
            solucionBeta = obtenerSolucionInicial(ws.objetos);
            _.forEach(solucionBeta, function(value, key) {
                while (value.Cantidad * value.Volumen < ws.volumenRestante && value.Cantidad < value.CantidadMax) {
                    ben = ben + solucionBeta[key].Beneficio;
                    if (ben >= ws.beneficioTotal) {
                        solucionBeta[key].Cantidad += 1;
                        vol = vol + solucionBeta[key].Volumen;
                        ws.beneficioTotal = ws.beneficioTotal + solucionBeta[key].Beneficio;
                        ws.volumenRestante = ws.volumenRestante - solucionBeta[key].Volumen;
                        iteraciones.push(value)
                    }
                }
            });
            _.forEach(ws.solutions, function(value, key) {
                ws.solucionFinal.push({
                    Objeto: value.Descripcion,
                    Cantidad: value.Cantidad
                })
            });
            ws.volumenUtilizado = vol;
            console.log(ws.solucionFinal)
            console.log(iteraciones)
            console.log(ws.solutions, vol, ws.volumenRestante, ws.beneficioTotal);
        }
    }
})();
