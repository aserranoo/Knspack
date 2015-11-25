'use strict';
(function() {
    angular.module('knsapackApp')
        .controller('KnspackController', KnspackController);

    function KnspackController($scope, $http, socket) {
        var ws = this;
        ws.volumenChecked = [{
            volumen: 11000,
            check: false
        }, {
            volumen: 6000,
            check: false
        }, {
            volumen: 8000,
            check: false
        }, {
            volumen: 9000,
            check: false
        }, {
            volumen: 10000,
            check: false
        }];
        ws.objetos = [{
            Descripcion: 'Caja1',
            Altura: "",
            Largo: "",
            Volumen: 3192,
            Beneficio: 7,
            Ruta: "",
            MenorA: 5,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja2',
            Altura: "",
            Largo: "",
            Volumen: 231,
            Beneficio: 11,
            Ruta: "",
            MenorA: 4,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja3',
            Altura: "",
            Largo: "",
            Volumen: 930,
            Beneficio: 8,
            Ruta: "",
            MenorA: 4,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja4',
            Altura: "",
            Largo: "",
            Volumen: 350,
            Beneficio: 2,
            Ruta: "",
            MenorA: 5,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja5',
            Altura: "",
            Largo: "",
            Volumen: 960,
            Beneficio: 12,
            Ruta: "",
            MenorA: 7,
            MayorA: 1,
            Checked: true
        }, {
            Descripcion: 'Caja6',
            Altura: "",
            Largo: "",
            Volumen: 2880,
            Beneficio: 30,
            Ruta: "",
            MenorA: 8,
            MayorA: 1,
            Checked: true
        }];

        ws.solutions = [];
        ws.volumenRestante;
        ws.beneficioTotal = 0;
        ws.optimizarEspacio = optimizarEspacio;
        ws.checkVol = checkVol;
        ws.obtenerVol = obtenerVol;
        ws.obtenerSolucionInicial = obtenerSolucionInicial;    

        function checkVol(index) {
            _.forEach(ws.volumenChecked, function(value, key) {
                if (key == index) {
                    ws.volumenChecked[key].check = true;
                } else {
                    ws.volumenChecked[key].check = false;
                }
            })
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
            _.forEach(ws.solutions, function(value, key){
                ws.beneficioTotal = ws.beneficioTotal + (value.Cantidad * value.Beneficio);
                ws.volumenRestante = ws.volumenRestante - (value.Cantidad * value.Volumen);                
            });            
            return ws.solutions
        }

        function optimizarEspacio() {
            var solucionBeta = {}
            var vol = 0;
            var tmpVol = 0;
            obtenerVol();
            ws.solutions = [];
            var iteraciones = [];
            solucionBeta = obtenerSolucionInicial(ws.objetos);        
            _.forEach(solucionBeta, function(value, key) {
                while (value.Cantidad * value.Volumen <= ws.volumenRestante && value.Cantidad <= value.CantidadMax) {                    
                    solucionBeta[key].Cantidad += 1;
                    vol = vol + solucionBeta[key].Volumen;
                    ws.beneficioTotal = ws.beneficioTotal + solucionBeta[key].Beneficio;
                    ws.volumenRestante = ws.volumenRestante - solucionBeta[key].Volumen;                    
                    iteraciones.push(value)
                }
            });    
            console.log(iteraciones)        
            console.log(ws.solutions, vol, ws.volumenRestante, ws.beneficioTotal);
        }
    }
})();
