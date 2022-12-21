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
    [
      [
        ['previdencia privada', 2500],
      ],
      //RETORNO
      [2500, [ { descricao: 'previdencia privada', valor: 2500 } ]]
    ],
    [
      [
        ['previdencia privada', 2500],
        ['funpresp', 3500],
      ],
      //RETORNO
      [6000, [ { descricao: 'previdencia privada', valor: 2500 }, { descricao: 'funpresp', valor: 3500 } ]]
    ],
    [
      [
        ['previdencia privada', 2500],
        ['funpresp', 3500],
        ['doações', 500]
      ],
      //RETORNO
      [6500, [ { descricao: 'previdencia privada', valor: 2500 }, { descricao: 'funpresp', valor: 3500 }, { descricao: 'doações', valor: 500 } ]]
    ],
    [
      [
        ['previdencia privada', 2500],
        ['funpresp', 3500],
        ['doações', 500],
        ['contribuicao sindical', 250]
      ],
      //RETORNO
      [6750, [ { descricao: 'previdencia privada', valor: 2500 }, { descricao: 'funpresp', valor: 3500 }, { descricao: 'doações', valor: 500 }, { descricao: 'contribuicao sindical', valor: 250 } ]]
    ],
  ])("Teste parametrizado de cadastro de deduções", (inputValues, result) => {
    inputValues.forEach((inputValue) => {
      calculadora.cadastrarDeducao(inputValue[0], inputValue[1]);
    })

    expect(calculadora.obterTotalDeducoes()).toBe(result[0]);
    expect(calculadora.obterListaDeducoesGerais()).toEqual(result[1]);
  });
});