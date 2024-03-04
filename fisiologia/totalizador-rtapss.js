"use strict";

const webStorage = {

    salvarFicha() {
        for(let c = 0; c < inputCels.length; c++) {
            inputCels[c].addEventListener("input", () => {
                localStorage.setItem(`trtapss-cel${c}`,`${inputCels[c].value}`);
            });
            inputCels[c].value = localStorage.getItem(`trtapss-cel${c}`);
        }
    },

    salvarDadosAdicionais(){
        let dadosAdicionais = document.querySelectorAll("div.container input[type=text], input[type=date], textarea#nota, input#ano, div.contentor-de-inputs-para-periodo-de-reporte input[type=number]");
        
        dadosAdicionais.forEach( dado => { 
            function destacarNota(dado) {
                "" !== dado.value ? dado.classList.add("bold") : dado.classList.remove("bold");
            }

            dado.addEventListener("input", () => {localStorage.setItem(`trtapss-${dado.id}`,`${dado.value}`)});
            dado.value=localStorage.getItem(`trtapss-${dado.id}`);

            dado.matches("#nota") && dado.addEventListener ("input", () => {
                destacarNota(dado);
            });
            destacarNota(dado)
            
        });
    },
                
    salvarDestaqueDeTotais() {
        readonlyCelsDarker.addEventListener("change",()=>{
            readonlyCelsDarker.checked ? localStorage.setItem("trtapss-destaque","on") : localStorage.removeItem("trtapss-destaque")
        });
        localStorage.getItem("trtapss-destaque") && (readonlyCelsDarker.setAttribute("checked",""));
        menu.destacarFundoDeTotais();        
    }      
}

const totalizador = {
    filtrarCelulas: (cel) => {
        if(cel.dataset.totalgrupo) {
            cel.classList.add(`${cel.dataset.totalgrupo}`);
            
            const $celulasPorSomar = document.querySelectorAll(`.${cel.dataset.totalgrupo}`);
            const $celulaDeSaida = document.querySelector(`#${cel.dataset.totalgrupooutput}`);

            totalizador.totalizarCelulas($celulasPorSomar, $celulaDeSaida);
        }

        if(cel.dataset.totalgeral) {
            cel.classList.add(`${cel.dataset.totalgeral}`);
            
            const $celulasPorSomar = document.querySelectorAll(`.${cel.dataset.totalgeral}`);
            const $celulaDeSaida = document.querySelector(`#${cel.dataset.totalgeraloutput}`);

            let soma = 0;

            for (const c of $celulasPorSomar) {
                soma += Number(c.value);
            }
            
            $celulaDeSaida.value = soma;
        }
    },

    totalizarCelulas: ($celulasPorSomar, $celulaDeSaida) => {
        let soma = 0;
        for (const c of $celulasPorSomar) {
            soma += Number(c.value);
        }
        $celulaDeSaida.value = soma;
    }
}

window.addEventListener("load", () => {
    webStorage.salvarFicha();
    webStorage.salvarDadosAdicionais();
    webStorage.salvarDestaqueDeTotais();

    inputCels.forEach( cel => {
        cel.addEventListener("input", () => {     
            totalizador.filtrarCelulas(cel);
        });

        cel.value != "" && totalizador.filtrarCelulas(cel);
    });

})