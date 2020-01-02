class CalcController {
    constructor() {
        //this sendo usado para tranformar a variável em um atributo para 
        //poder se chamado fora da classe
        this._operacao = [];
        this._displayCalcEl = document.querySelector("#display");
        this._DateEl = document.querySelector("#data");
        this._TimeEl = document.querySelector("#hora");
        this.Inicialize();
        this._currentDate
        this.InicializeButtons();
    }
    Inicialize() {
        this.SetDisplayTime();
        setInterval(() => {
            this.SetDisplayTime();

        }, 1000);
    }


    addEventListenerAll(element, events, fn/*nome da função)*/) {
        //Vamos lá...esse código é um método que pega como parâmetros os
        //elementos, eventos e o nome da função. (ela ta pegando esses valores)
        //do addEventListenetALL() do inicalizeButtos)
        //nele nós usamos o slipt para que ele tranfome o click drag que está no
        //inicialize button em uma array, separada por um espaço
        events.split(' ').forEach(event => {
            element.addEventListener(event, fn, false);

        }
        )
    }
    ClearAll() {
        this._operacao = [];
    }
    ClearEntry() {
        this._operacao.pop();//o pop é uma função nativa do Js que apaga o último valor
        //de uma array;
    }
    setError() {
        this.displayCalc = "Error"
    }
    setLastOperator(value) {
        this._operacao[this._operacao.length - 1] = value;

    }
    getlastOperation() {
        //essa função que paga o último valor do array e verifica se é um
        //um número ou sinal
        return this._operacao[this._operacao.length - 1]
    }
    isOperator(value) {
        return (['+', '-', '/', '*', '%', '.'].indexOf(value) > -1);
        //Nesse método, ele irá pegar o valor que o usuário colocar na calculadora
        //e caso ele seja um operador, vai executar o if no addOperation
        //já que ele vai retornar ou true ou false
    }

    addoperation(value) {
        if (isNaN(this.getlastOperation())) {
            //a função isNAN significa Is not a Number, ou seja, esse if será 
            //executado caso a última operação NÃO seja um número
            if (this.isOperator(value)) {
                //trocar o operador caso o último index seja uma operacao
                this._setLastOperator(value);
                //tranforma a última posição do array na operação selecionada pelo user
            } else if (isNaN(value)) {

                //Programar depois
                console.log(value);

            } else {
                this._operacao.push(value);
            }

        } else {
            let newValue = this.getlastOperation().toString() + value.toString();
            this.setLastOperator(parseInt(newValue));
            //troca o útimo valor do array pelo novo valor concatenado
        }

        console.log(this._operacao)

    }
    InicializeButtons() {
        //esse código aqui faz com que a função de click passe por todos os 
        //elementos dos botões para que haja o evento do click
        //Isso é possível graças ao uso do ForEach, que pega todos as informações
        //de dentro dos botões
        let buttons = document.querySelectorAll("#buttons > g , #parts > g");
        // > significa tags filhas de tal coisa
        buttons.forEach((btn, index) => {
            this.addEventListenerAll(btn, 'click drag', e => {
                //esse console log com o bnt.class name serve para que quando 
                //o console retorne um valor, venha apenas o nome da classe

                //tranformar o nome dos botões em variáveis para puxar o valor
                //em funções
                let textBtn = btn.className.baseVal.replace("btn-", "");//lançada como parâmetro
                this.execBtn(textBtn);//manda o parámetro do método
            })
            this.addEventListenerAll(btn, "mouseouver mouseup mousedown", e => {
                btn.style.cursor = "pointer";
            });
        })
    }

    execBtn(value) {
        switch (value) {
            case 'ac':
                this.ClearAll();
                break;

            case 'ce':
                this.ClearEntry();
                break;

            case 'soma':
                this.addoperation("+");
                break;

            case 'subtracao':
                this.addoperation("-");
                break;

            case 'multiplicacao':
                this.addoperation("*");
                break;

            case 'porcento':
                this.addoperation("%");
                break;

            case 'igual':

                break;

            case 'divisao':
                this.addoperation("/");
                break;
            case 'ponto':
                this.addoperation(".");
                break;
            default:
                this.setError;
                break;

            case '0':
            case '1':
            case '2':
            case '3':
            case '4':
            case '5':
            case '6':
            case '7':
            case '8':
            case '9':
                this.addoperation(parseInt(value));

                break;
            //esses cases dos números serve para que quando clicarmos nos
            //números eles retornem os valores dos dígitos da calculadora
            //como números.


        }

    }

    SetDisplayTime() {
        //ao invés de copiar esse código aqui de baixo no Set Interval
        //podemos apenas criar um método e chamar ele no Set Interval
        this.displayDate = this.currentDate.toLocaleDateString("PT-BR", {
            day: "2-digit",
            month: "long",
            year: "numeric"
        })
        this.displayTime = this.currentDate.toLocaleTimeString("PT-BR")
    }
    get displayTime() {
        this._TimeEl.innerHTML;
    }
    set displayTime(value) {
        this._TimeEl.innerHTML = value;
    }

    get displayCalc() {
        //o método get(getter) pega valores do display calc
        //e retorna o valor la de dentro;
        return this._displayCalcEl.innerHTML
    }

    set displayCalc(value) {
        //o método set(setter) vai atribuir e alterar valores do displayCalc
        this._displayCalcEl.innerHTML = value;
    }
    get displayDate() {
        this._DateEl.innerHTML;
    }
    set displayDate(value) {
        this._DateEl.innerHTML = value;
    }
    get currentDate() {
        return new Date();
    }
    set currentDate(value) {
        this._currentDate.innerHTML = value;
    }

}
