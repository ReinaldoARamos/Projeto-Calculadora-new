//CURSO AULA 19 16:42, erro de concatenação
class CalcController {
  constructor() {
    //this sendo usado para tranformar a variável em um atributo para
    //poder se chamado fora da classe
    this.audioONorOff = false; //armazena a informação se o audio ta ou nao ligado <- isso eh obvio!
    this._operacao = [];
    this.audio = new Audio("ohno.mp3");
    this.LastNumber = "";
    this.LastOperator = "";
    this._displayCalc = document.querySelector("#display"); // uso de API do browser, interessante enteder sobre e tb sobre Jquery (so por curiosidade)
    this._DateEl = document.querySelector("#data");
    this._TimeEl = document.querySelector("#hora");
    this.Inicialize();
    this._currentDate;
    this.InicializeButtons();
    this.initKeyboard(); // manter codigo ou em ptbr ou ingles
  }
  Inicialize() {
    this.SetDisplayTime();
    setInterval(() => {
      // legal!
      this.SetDisplayTime();
    }, 1000);
    this.SetNumberToDisplay();
    this.pasteFromClipboard();

    document.querySelectorAll(".btn-ac").forEach(btn => {
      //selecionamos os btn-ac, botão da frente e atrás, e como são 2, colocamos
      //forEach para se aplicar para os 2, além disso, colocamos uma Arrow
      //function (legal!) no btn
      btn.addEventListener("dblclick", e => {
        this.toggleAudio();
        //quando os 2 btn receberam o evento de click duplo, o toggleAudio ativa
      });
    });
  }
  copytoClipboard() {
    let input = document.createElement("input");
    input.value = this.displayCalc;
    document.body.appendChild(input);
    //colocamos ele dentro do body, pois o input existe, mas não pode ser selecionado
    //então colocamos o appendChild para pegar o input como filho.
    input.select(); //para ele pegar tudo que está selecionado
    document.execCommand("Copy"); //para copiar tudo selecionado
  }
  toggleAudio() {
    //jeito mais resumido, já que igualamos ele a false, porém ele pode virar
    //true dependendo dos eventos, false + false = true.
    this.audioONorOff = !this.audioONorOff;
    /*jeito com if ternário
    this.audioONorOff = (this.audioONorOff) ? false : true;
    /*
*/
    /*
    if (this.audioONorOff) {
      this.audioONorOff = false;
    } else {
      this.audioONorOff = true;
    }
  }
  */
  }
  playAudio() {
    if (this.audioONorOff == true) {
      this.audio.play();
      this.audio.currentTime = 0; //desse jeito quando o audio for tocado denovo
      //ele sempre será 0, ou seja, irá reiniciar.
    }
  }

  pasteFromClipboard() {
    document.addEventListener("paste", e => {
      let text = e.clipboardData.getData("Text"); //função para pegar o valor que está
      //no clipboard, no caso, o que foi copiado(tem que passar text como
      //parâmetro).
      this.displayCalc = parseFloat(text);
      if (isNaN(this.displayCalc)) this.setError();
      console.log(text);
    });
  }
  initKeyboard() {
    addEventListener("keyup", e => {
      this.playAudio();
      switch (e.key) {
        case "Escape":
          this.ClearAll();
          break;

        case "Backspace":
          this.ClearEntry();
          break;

        case "+":
          this.addoperation("+");
          break;

        case "-":
          this.addoperation("-");
          break;

        case "*":
          this.addoperation("*");
          break;

        case "%":
          this.addoperation("%");
          break;

        case "Enter":
          this.calc();
          break;

        case "/":
          this.addoperation("/");
          break;
        case ".":
        case ",":
          this.addDot();
          break;
        default:
          this.setError;
          break;

        case "0": // keyboardi parece bugado
        case "1":
        case "2":
        case "3":
        case "4":
        case "5":
        case "6":
        case "7":
        case "8":
        case "9":
          this.addoperation(parseInt(e.key));
          break;
        case "c":
          if (e.ctrlKey) {
            this.copytoClipboard();
            input.remove();
          }
          break;

        //esses cases dos números serve para que quando clicarmos nos
        //números eles retornem os valores dos dígitos da calculadora
        //como números.
      }
    });
  }

  addEventListenerAll(element, events, fn /*nome da função, na verdade a referencia dela mesmo*/) {
    //Vamos lá...esse código é um método que pega como parâmetros os
    //elementos, eventos e o nome da função. (ela ta pegando esses valores)
    //do addEventListenetALL() do inicalizeButtos)
    //nele nós usamos o slipt para que ele tranfome o click drag que está no
    //inicialize button em uma array, separada por um espaço
    // nao agrega mto passar um array de eventos aqui, vc poderia chamar essa funcao 2x.
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
    //de uma array; ler sobre Array.prototype.pop
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
    return ["+", "-", "/", "*", "%"].indexOf(value) > -1; // legal!
    //Nesse método, ele irá pegar o valor que o usuário colocar na calculadora
    //e caso ele seja um operador, vai executar o if no addOperation
    //já que ele vai retornar ou true ou false
  }

  SetNumberToDisplay() {
    let LastNumber;

    for (const operacao of this._operacao) {
      if (!this.isOperator(operacao)) {
        LastNumber = operacao;
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
    try {
      return eval(this._operacao.join(""));
    } catch (e) {
      setTimeout(() => {
        this.setError();
      }, 1);
    }
  }

  addDot() {
    let LastOperation = this.getlastOperation();
    if (
      typeof LastOperation === "String" &&
      LastOperation.split("").indexOf(".") > -1
      //aqui basicamente criei um if que caso o LastOperation seja uma string
      //E se no index de LastOperation houver um '.'. ele retorna o método(return)
      //encerra funções); solucao legal!
    )
      return;

    if (this.isOperator(LastOperation) || !LastOperation) {
      this.pushOperation("0.");
    } else {
      this.setLastOperator(LastOperation.toString() + ".");
    }
    this.SetNumberToDisplay();
  }
  getLastItem(isOperator = true /* legal uso de default params aqui */) {
    let LastItem;

    for (let i = this._operacao.length - 1; i >= 0; i--) {
      // for of, evitar forzao classico em JS, so em casos bem especificos
      if (this.isOperator(this._operacao[i]) == isOperator) {
        LastItem = this._operacao[i];
        break;
        //nesse código, basicamente oq aconteceu foi que pegamos o mesmo for
        //porém, passamos o isOperator(parametro) igual a true
        //e nesse if, se o isOperator(método) for igual ao isOperator(parametro = true)
        //ele executa a função dentro do if, no caso LastItem ´= this.operacao[i]
      }
      if (!LastItem) {
        // de forma getal normalmente comentamos *em cima* do codigo.
        // isso eh um bug, tenho bastante certeza.
        // let d = false
        // { d } ? // sempre true!
        LastItem = isOperator ? this.LastOperator : this.LastNumber;
        //if ternário
      }
    }
    return LastItem;
  }
  calc(value) {
    // bem confuso de ler o codigo dessa function de forma geral
    let Last = "";
    this.LastOperator = this.getLastItem();

    if (this._operacao.length > 3) {
      // oq signifca ter length > 3?
      Last = this._operacao.pop(value); // porque um pop?
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
      this._operacao = [result]; //como o Last é vazio, retiramos ele do array, na verdade vc criou um array.
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
    // variavel pra melhorar legibillidade do codigo
    let lastOperationIsSign = isNaN(this.getlastOperation());
    if (lastOperationIsSign) {
      //a função isNAN significa Is not a Number, ou seja, esse if será
      //executado caso a última operação NÃO seja um número
      // de forma geral eh ruim codar assim. Oq significa que nao eh um numero?
      // talvez porque seja um sinal?
      if (this.isOperator(value)) {
        //trocar o operador caso o último index seja uma operacao
        this.setLastOperator(value);

        //tranforma a última posição do array na operação selecionada pelo user
      } else { // if else if um dentro do outro fica confuso rapido
        this.pushOperation(value);
        this.SetNumberToDisplay();
      }
    } else {
      if (this.isOperator(value)) {
        this.pushOperation(value);
      } else {
        let newValue = this.getlastOperation().toString() + value.toString();
        this.setLastOperator(newValue);
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
    this.playAudio();
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
        this.addoperation(parseInt(value)); // legal!

        break;
      //esses cases dos números serve para que quando clicarmos nos
      //números eles retornem os valores dos dígitos da calculadora
      //como números.
    }
  }

  SetDisplayTime() {
    //ao invés de copiar esse código aqui de baixo no Set Interval
    //podemos apenas criar um método e chamar ele no Set Interval
    this.displayDate = this.currentDate.toLocaleDateString("PT-BR", { // legal!
      day: "2-digit",
      month: "long",
      year: "numeric"
    });
    this.displayTime = this.currentDate.toLocaleTimeString("PT-BR");
  }
  get displayTime() {
    this._TimeEl.innerHTML;
  }

  set displayTime(value) {
    this._TimeEl.innerHTML = value;
  }

  get displayCalc() { // legal uso de get set
    //o método get(getter) pega valores do display calc
    //e retorna o valor la de dentro;
    return this._displayCalc.innerHTML;
  }

  set displayCalc(value) {
    //o método set(setter) vai atribuir e alterar valores do displayCalc
    if (value.toString().length > 10) {
      this.setError();
      return false;
    }
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
