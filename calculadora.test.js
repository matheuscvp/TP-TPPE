const CalculadoraIRPF = require('./calculadora');

let calculadora;

beforeEach(() => {
    calculadora = new CalculadoraIRPF();
});

test('Cadastro de rendimento', () => {
    calculadora.cadastrarRendimento("Salario", 5000);
    expect(calculadora.obterTotalRencimentos()).toBe(5000);
})