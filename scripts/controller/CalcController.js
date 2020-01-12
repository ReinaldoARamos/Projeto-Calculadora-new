//CURSO AULA 19 16:42, erro de concatenação
class CalcController {
  constructor() {
    //this sendo usado para tranformar a variável em um atributo para
    //poder se chamado fora da classe
    this._operacao = [];
    this.LastNumber = "";
    this.LastOperator = "";
    this._displayCalc = document.querySelector("#display");
    this._DateEl = document.querySelector("#data");
    this._TimeEl = document.querySelector("#hora");
    this.Inicialize();
    this._currentDate;
    this.InicializeButtons();
  }
  Inicialize() {
    this.SetDisplayTime();
    setInterval(() => {
      this.SetDisplayTime();
    }, 1000);
    this.SetNumberToDisplay();
  }

  addEventListenerAll(element, events, fn /*nome da função)*/) {
    //Vamos lá...esse código é um método que pega como parâmetros os
    //elementos, eventos e o nome da função. (ela ta pegando esses valores)
    //do addEventListenetALL() do inicalizeButtos)
    //nele nós usamos o slipt para que ele tranfome o click drag que está no
    //inicialize button em uma array, separada por um espaço
    events.split(" ").forEach(event => {
      element.addEventListener(event, fn, false);
    });
  }
  ClearAll() {
    this._operacao = [];
    this.LastNumber = "";
    this.LastOperator = "";
    this.SetNumberToDisplay();
    console.log("apaguei", this._operacao);
  }
  ClearEntry() {
    this._operacao.pop(); //o pop é uma função nativa do Js que apaga o último valor
    //de uma array;
    this.SetNumberToDisplay();
  }
  setError() {
    this.displayCalc = "Error";
  }
  setLastOperator(value) {
    this._operacao[this._operacao.length - 1] = value;
  }

  getlastOperation() {
    //essa função que paga o último valor do array e verifica se é um
    //um número ou sinal
    return this._operacao[this._operacao.length - 1];
  }
  isOperator(value) {
    return ["+", "-", "/", "*", "%"].indexOf(value) > -1;
    //Nesse método, ele irá pegar o valor que o usuário colocar na calculadora
    //e caso ele seja um operador, vai executar o if no addOperation
    //já que ele vai retornar ou true ou false
  }

  SetNumberToDisplay() {
    let LastNumber;

    for (let i = this._operacao.length - 1; i >= 0; i--) {
      if (!this.isOperator(this._operacao[i])) {
        LastNumber = this._operacao[i];
        break;
      }
    }
    if (!LastNumber) LastNumber = 0;
    this.displayCalc = LastNumber;
  }

  pushOperation(value) {
    this._operacao.push(value);
    if (this._operacao.length > 3) {
      this.calc();
    }
  }
  getResult() {
    console.log(eval(this._operacao.join(""), "a"));
    return eval(this._operacao.join(""));
  }
  addDot() {
    let LastOperation = this.getlastOperation();
    if (this.isOperator(LastOperation) || !LastOperation) {
      this.pushOperation("0.");
    } else {
      this.setLastOperator(LastOperation.toString() + ".");
    }
    this.SetNumberToDisplay();
  }
  getLastItem(isOperator = true) {
    let LastItem;

    for (let i = this._operacao.length - 1; i >= 0; i--) {
      if (this.isOperator(this._operacao[i]) == isOperator) {
        LastItem = this._operacao[i];
        break;
        //nesse código, basicamente oq aconteceu foi que pegamos o mesmo for
        //porém, passamos o isOperator(parametro) igual a true
        //e nesse if, se o isOperator(método) for igual ao isOperator(parametro = true)
        //ele executa a função dentro do if, no caso LastItem ´= this.operacao[i]
      }
      if (!LastItem) {
        LastItem = { isOperator } ? this.LastOperator : this.LastNumber;
        //if ternário
      }
    }
    return LastItem;
  }
  calc(value) {
    let Last = "";
    this.LastOperator = this.getLastItem();

    if (this._operacao.length > 3) {
      Last = this._operacao.pop(value);
      this.LastNumber = this.getResult();
    } else if (this._operacao.length == 3) {
      this.LastNumber = this.getLastItem(false); //é false pois é um número, e nao
      //um sinal
    }
    console.log("Last Operator", this.LastOperator);
    console.log("Last Numver", this.LastNumber);

    let result = this.getResult();
    if (Last == "%") {
      result /= 100;
      //this._operacao = [result];
    } else {
      this._operacao = [result]; //como o Last é vazio, retiramos ele do array
      if (Last) this._operacao.push(Last);
      //e depois damos um push dele dentro do array CASO ele seja alguma coisa.
    }

    this.SetNumberToDisplay();
  }

  /* CalcIgual() {
    let resultado = eval(this._operacao.join(""));
    this._operacao = [resultado];
    this.SetNumberToDisplay();
    console.log(this._operacao);
  }
  */

  addoperation(value) {
    if (isNaN(this.getlastOperation())) {
      //a função isNAN significa Is not a Number, ou seja, esse if será
      //executado caso a última operação NÃO seja um número
      if (this.isOperator(value)) {
        //trocar o operador caso o último index seja uma operacao
        this.setLastOperator(value);

        //tranforma a última posição do array na operação selecionada pelo user
      } else {
        this.pushOperation(value);
        this.SetNumberToDisplay();
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value);
      } else {
        let newValue = this.getlastOperation().toString() + value.toString();
        this.setLastOperator(parseFloat(newValue));
        this.SetNumberToDisplay();
        //troca o útimo valor do array pelo novo valor concatenado
        //atualizar display aqui;
      }
    }

    console.log(this._operacao);
  }
  InicializeButtons() {
    //esse código aqui faz com que a função de click passe por todos os
    //elementos dos botões para que haja o evento do click
    //Isso é possível graças ao uso do ForEach, que pega todos as informações
    //de dentro dos botões
    let buttons = document.querySelectorAll("#buttons > g , #parts > g");
    // > significa tags filhas de tal coisa
    buttons.forEach((btn, index) => {
      this.addEventListenerAll(btn, "click drag", e => {
        //esse console log com o bnt.class name serve para que quando
        //o console retorne um valor, venha apenas o nome da classe

        //tranformar o nome dos botões em variáveis para puxar o valor
        //em funções
        let textBtn = btn.className.baseVal.replace("btn-", ""); //lançada como parâmetro
        this.execBtn(textBtn); //manda o parámetro do método
      });
      this.addEventListenerAll(btn, "mouseouver mouseup mousedown", e => {
        btn.style.cursor = "pointer";
      });
    });
  }

  execBtn(value) {
    switch (value) {
      case "ac":
        this.ClearAll();
        break;

      case "ce":
        this.ClearEntry();
        break;

      case "soma":
        this.addoperation("+");
        break;

      case "subtracao":
        this.addoperation("-");
        break;

      case "multiplicacao":
        this.addoperation("*");
        break;

      case "porcento":
        this.addoperation("%");
        break;

      case "igual":
        this.calc();
        break;

      case "divisao":
        this.addoperation("/");
        break;
      case "ponto":
        this.addDot();
        break;
      default:
        this.setError;
        break;

      case "0":
      case "1":
      case "2":
      case "3":
      case "4":
      case "5":
      case "6":
      case "7":
      case "8":
      case "9":
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
      year: "numeric",
    });
    this.displayTime = this.currentDate.toLocaleTimeString("PT-BR");
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
    return this._displayCalc.innerHTML;
  }

  set displayCalc(value) {
    //o método set(setter) vai atribuir e alterar valores do displayCalc
    this._displayCalc.innerHTML = value;
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
