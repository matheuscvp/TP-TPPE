const CalculadoraIRPF = require('./calculadora');

let calculadora;

beforeEach(() => {
    calculadora = new CalculadoraIRPF();
});

test('Cadastro de rendimento', () => {
    calculadora.cadastrarRendimento("Salario", 5000);
    expect(calculadora.obterTotalRencimentos()).toBe(5000);
})


describe('Cadastro de Deduções', () => {
  beforeEach(() => {
    calculadora = new CalculadoraIRPF();
  });

  it.each([
    [["Salario", 5000], 5000],
    [["Salario", 7500], 7500],
    [["Salario", 11000], 11000],
  ])("Teste parametrizado de cadastro de rendimentos", (inputValue, result) => {
    calculadora.cadastrarRendimento(inputValue[0], inputValue[1]);
    expect(calculadora.obterTotalRendimentos()).toBe(result);
  });
});