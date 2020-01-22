# Explicação sobre o app da Calculadora

Esse projeto construído usando POO, tanto que todo o código JS foi todo feito dentro da classe (CalcController)

# Atributos

Dentro desse projeto os atributos tiveram uma função muito importante, explicarei cada um agora;

this.audioOnorOFF = atributo que armazena a informação que indica se o áudio da calculadora está ligado ou não

this.\_operacao = Array onde todos os números e operações eram jogados para ocorrer os cálculos matemáticos

this.audio = Audio mp3(com referencias a Sonic Adventure)

this.LastNumber = Como o nome sugere, esse atributo pega o último número do array

this.LastOperator = pega o último operador do array

this.displayCalc = Tela da calculadora

This.DateEl = data na tela da calculadora

this.\_timeEL = tempo na tela

this.Inicialize = método que sempre inicia junto com a calculadora

this.inicializeButtons = método dos botões

this.initKeyboard = Método das teclas do computador

# Métodos

Inicialize : O inicialize é um método que que eu criei apenas para que quando a calculadora fosse inicada algumas funções já fossem iniciadas juntas, além disso, também coloquei alguns ouitros método para começar juntos, como o de copia e cola , também coloquei um querySelector All na classe btn-ac, para que quando fosse clicada 2 vezes o áudio fosse ativado(essa parte infelizmente está bugada e não sei arrumar por enquanto)

CopytoClipBoard: Método para copiar informações com o control+C. para isso criei um input, e o valor desse input é igual ao display da calculadora. Após isso dei um appendChild para o input poder ser selecionado, logo após coloquei um select par puxar tudo selecionado e executei o comando Copy para manda pro ClipBoard.

ToggleAudio: Esse foi um método criado para ficar ligando e desligando o audio(true ou false)

PlayAudio: Toca o áudio caso o audioOnorOFF seja true, e sempre que o método é chamado ele zera o timer do áudio, isso porque se alguem clica rápido demais, o áudio fica atrasado.

PasteFromClipBoard: Método que cria um AddEventListener de paste e executa uma arrow function, função essa que iguala um let aos dados do clipBoard, e quando o user da Control+C coloca esse texto na tela já sendo um número. Caso nao seja a calculadora executa o SetError)

AddEventListenerAll: Esse método é extremamente importante, já que ele executa os eventos dos botões. o Método recebe o element, os events e o fn(função), logo em seguida ele pega os events e da um split nos espaços vazios(para poder ter mais de um tipo evento por vez), e para cada evento ele coloca um EventListenet nos elementos que pega esse evento e a função executada, o false é so precaução, já que como os botões tem 2 camadas, o evento pode ativar 2 vezes.

ClearALl: Simplesmente deixa tudo em branco

ClearEntry: Simplemente apaga o último valor do array

SetError: Coloca a palavra erro na tela

SetLastOperator: A função recebe um valor e iguala o último valor do array a esse valor, ou seja, o usuário pode alterar a operação caso mude de ideia.

GetLastOperation: retorna o último valor do array

isOperator: recebe um valor, e retorna um indexOf desse valor, verificando se esse valor é um dos sinais dentro do array, isso serve para verificar se é um sinal, e se for, qual sinal é.

SetNumberToDisplay: Aqui tem um let LastNumber declarado primeiramente, logo em seguida é feito um for de trás para frente até encontrar o último número, ele realiza isso graças ao if, cuja a condição é se NÂO for um operador ele iguale o LastNumber ao [i], que é a o let inicial. Também coloquei um if que é ativado caso não haja LastNumber, assim, ele só coloca 0 no display.

InicializeButtons: Esse método seleciona todos os botões, as tags filhas dos botões e as partes também(parte de trás do botão no HTML), e ele cria um ForEach para cada btn(element) e index, onde ele executa uma função, que no caso é a ativação do método AddEventListenerAll, que recebe btn como element, e cada element recebe os events(já com o split), e esses eventos também são passados como parâmetro no AddEventListenerAll, no caso o click e o drag, além disso, ele também executa uma função, que cria um let TextBtn que pega os valores dos botões, e também coloquei um replace para trocar o 'btn-' por nada, logo em seguida o botão é lançado como parâmetro para o execBTN

ExecBtn: O execBtn recebe os botões como valor, e executa um switch dependendo do valor selecionado, e cada case executa um método diferente(exceto os números);

initKeyboard: Mesma coisa do ExecBtn, porém com os botões do teclado, e para isso coloquei um AddEventListener("keyup)

PushOperation: recebe um valor e lança esse valor dentro do array this.operacao, também tem um if para caso o número de elementos no array seja maior que 3 ele executa o this.calc.

Getresult: retorna o eval do join do this.operacao, assim o join transforma o array em uma string e o eval interpreta como cálculo matemático.

GetLastItem: Aqui temos um LastItem declarado, logo em seguida um for é executado de trás para frente, e caso o IsOperator(método) for igual ao isOperator(parametro), ele iguala o Lastitem a esse últomo operador e caso não haja LastItem, ele será igualado ao LastNumber

AddOperation: Este é um método que contém vários ifs, oque ele faz é basicamente colocar os valores digitados dentro do array this.operacao. Cada if faz uma verifiação, para ver se é um número ou operador, e dependendo do resultado ele executa funções diferentes. Vale ressaltar que o último else faz a concatenação dos valores(os valores na array viram strings no caso, e dps passam para PasseFloat), quando é número e cai nesse else, ele pega o último valor do array, passa pra string e depois pega o novo valor recebido(também em sting) e concatena. No execBtn quando vc digita um número ou sinal ele já manda pro array, e se for numero ele faz essa concatenação no array.

Calc: Função que basicamente realiza os calculos da calculadora, primeiramente temos o let Last e o atributo lastOperator que pega o último item(operador). Temos um if ali que basicamente quando o número de itens no array supera 3, o let Last pega o pop do array, o LastNumber pega o resultado da conta, os LastsNumbers e Operatores são importantes pois graças a eles podemos realizar aqueles cálculos onde se realiza a operação com o último número(exemplo: 10+5= 15, e se apertar no = ele soma mais 5) ,temos também um else if, que diz que se o numero de elementos no array for igual a 3, o lastItem é false, pois nao é sinal, é numero. Nesse método também declaramos a let result, que é igual ao resultado das operações, logo abaixo dele temos um if que é responsável por fazer cálculos com %, onde ele divide o resultado por 100 e pra finalizar temos o else, que no caso é onde ocorre push do resultado no array this.operacao, nele temos um if que diz que caso haja um Last, esse valor também é puxado pro array(isso serve para fazer cálculos)

AddDot: Aqui temos um let LastOperation, que usa o método getLastOperation, logo em seguida criei um if, que diz que se o tipo de LastOperation for string e se dermos um split no lastOperation e no meio desse index tiver um ".", ele encerra a funçãoo(isso serve pra nao deixar o user colocar mais de 1 ponto no mesmo numero), temos também outro if, que diz que caso a ultima operacao seja um sinal, ou nao haja valor algum(0), ele puxa no array um "0.1" e por ultimo temos o else que concatena um "." com o ultimo numero do array.

# Se eu nao deixei algo claro nesse ReadMe favor me dizer.
