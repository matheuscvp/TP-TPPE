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
    [
      [50],
      50
    ],
    [
      [120, 50],
      170
    ],
    [
      [120, 50, 80],
      250
    ],
  ])("Teste parametrizado de cadastro de dedução de pensão alimenticia", (inputValues, result) => {
    inputValues.forEach((inputValue) => {
      calculadora.cadastrarPensao(inputValue);
    })
    expect(calculadora.obterTotalDeducoes()).toBe(result);
  });

  it.each([
    [
      [
        ['Luis', "21/12/1999"],
      ],
      [189.59, [ { nome: 'Luis', dataNascimento: "21/12/1999" } ]]
    ],
    [
      [
        ['Luis', "21/12/1999"],
        ['Pedro', "02/03/2001"],
      ],
      [379.18, [ { nome: 'Luis', dataNascimento: "21/12/1999" }, { nome: 'Pedro', dataNascimento: "02/03/2001" } ]]
    ],
    [
      [
        ['Luis', "21/12/1999"],
        ['Pedro', "02/03/2001"],
        ['João', "22/01/2017"],
      ],
      [568.77, [ { nome: 'Luis', dataNascimento: "21/12/1999" }, { nome: 'Pedro', dataNascimento: "02/03/2001" }, { nome: 'João', dataNascimento: "22/01/2017" } ]]
    ],
  ])("Teste parametrizado de cadastro de dependentes", (inputValues, result) => {
    inputValues.forEach((inputValue) => {
      calculadora.cadastrarDependente(inputValue[0], inputValue[1]);
    })

    expect(calculadora.obterTotalDeducoes()).toBe(result[0]);
    expect(calculadora.obterListaDeDependentes()).toEqual(result[1]);
  })
});

describe('Calculo de base de calculo', () => {
  beforeEach(() => {
    calculadora = new CalculadoraIRPF();
  });

  it.each([
    [[["Salario", 5000], ["Previdencia privada", 2500]], 2500],
    [[["Aluguel", 3000], ["Doações", 1000]], 2000],
    [[["Salario", 8000], ["Pensão alimentícia", 3250]], 4750],
  ])("Testes parametrizado de base de calculo", (inputValues, result) =>{
    calculadora.cadastrarRendimento(inputValues[0][0], inputValues[0][1]);
    calculadora.cadastrarDeducao(inputValues[1][0], inputValues[1][1]);

    expect(calculadora.obterBaseCalculo()).toBe(result);
  })
});