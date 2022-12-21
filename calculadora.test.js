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

  it.each([
    [
      [
        ['INSS', 2500],
      ],
      //RETORNO
      [2500, [ { descricao: 'INSS', valor: 2500 } ]]
    ],
    [
      [
        ['INSS', 2500],
        ['Privada', 4100],
      ],
      //RETORNO
      [6600, [ { descricao: 'INSS', valor: 2500 }, { descricao: 'Privada', valor: 4100 } ]]
    ],
    [
      [
        ['INSS', 2500],
        ['Privada', 4100],
        ['Extra', 1500],
      ],
      //RETORNO
      [8100, [ { descricao: 'INSS', valor: 2500 }, { descricao: 'Privada', valor: 4100 }, { descricao: 'Extra', valor: 1500 } ]]
    ],
  ])("Teste parametrizado de cadastro de dedução de contribuição previdenciaria", (inputValues, result) => {
    inputValues.forEach((inputValue) => {
      calculadora.cadastrarPrevidencia(inputValue[0], inputValue[1]);
    })

    expect(calculadora.obterTotalDeducoes()).toBe(result[0]);
    expect(calculadora.obterListaDeducoesPrevidenciarias()).toEqual(result[1]);
  })

  it.each([
    [75, 75],
    [50, 50],
    [100, 100],
  ])("Teste parametrizado de cadastro de dedução de pensão alimenticia", (inputValue, result) => {
    calculadora.cadastrarPensao(inputValue);
    expect(calculadora.obterTotalDeducoes()).toBe(result);
  });
});