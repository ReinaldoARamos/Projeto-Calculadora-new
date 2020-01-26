// legal entender porque o CalcController existe aqui
window.calculator = new CalcController();

calculator.displayCalc;
calculator.displayTime;
calculator.displayDate;
//quando a gente quer acessar a informação do displayCal a gente coloca assim
//porém como essa variável não existe aqui, o JavaScript vai procurar se tem
//um método, e se tiver ele pega o valor de la
