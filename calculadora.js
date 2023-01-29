const MAX_FAIXA1 =  1903.98;
const ALIQUOTA_FAIXA2 = 0.075;
const MAX_FAIXA2 =  922.67;
const ALIQUOTA_FAIXA3 = 0.15;
const MAX_FAIXA3 =  924.40;
const ALIQUOTA_FAIXA4 = 0.225;
const MAX_FAIXA4 =  913.63;
const ALIQUOTA_FAIXA5 = 0.275;
const VALOR_DEPENDENTE = 189.59;

class CalculadoraIRPF {
  constructor() {
    this.totalRendimento = 0;
    this.listaRendimentos = [];
    this.impostoRendimento = 0;
    this.aliquota = 0;
    this.listaDeducoes = [];
    this.previdencia = [];
    this.dependentes = [];
    this.deducoes = {
      geral: 0,
      previdencia: 0,
      pensao: 0,
    }
  }

  cadastrarRendimento(descricao, valor) {
    if (!descricao) throw 'DescricaoEmBrancoException';
    if (!valor || valor < 0) throw 'ValorRendimentoInvalidoException'

    this.listaRendimentos.push({
      valor,
      descricao
    });
    this.totalRendimento += valor;
  }

  cadastrarDeducao(descricao, valor) {
    if (!descricao) throw new Error('DescricaoEmBrancoException');
    if (!valor || valor < 0) throw new Error('ValorDeducaoInvalidoException');

    this.listaDeducoes.push({
      valor,
      descricao
    })

    this.deducoes.geral += valor;
  };

  cadastrarPrevidencia(descricao, valor) {
    this.previdencia.push({
      descricao,
      valor
    });

    this.deducoes.previdencia += valor;
  }

  cadastrarPensao(valor) {
    this.deducoes.pensao += valor;
  }

  cadastrarDependente(nome, dataNascimento) {
    this.dependentes.push({
      nome,
      dataNascimento
    })
  }

  calculoImposto() {
    let baseImposto = this.obterBaseCalculo();

    baseImposto = this.obterPrimeiraFaixa(baseImposto);
    baseImposto = this.obterSegundoFaixa(baseImposto);
    baseImposto = this.obterTerceiraFaixa(baseImposto);
    baseImposto = this.obterQuartaFaixa(baseImposto);
    baseImposto = this.obterQuintaFaixa(baseImposto);

    return this.impostoRendimento;
  } 

  obterPrimeiraFaixa(baseImposto){
    let basePrimeiraFaixa = baseImposto;

    if (basePrimeiraFaixa < 0){
      this.impostoRendimento = 0;
    } 

    basePrimeiraFaixa = baseImposto - MAX_FAIXA1;

    return basePrimeiraFaixa;
  }

  obterSegundoFaixa(baseImposto){
    let baseSegundaFaixa = baseImposto;

    if (baseSegundaFaixa > 0 && baseSegundaFaixa < MAX_FAIXA2) {
      this.impostoRendimento += baseImposto * ALIQUOTA_FAIXA2;
      baseSegundaFaixa = 0;
    } else if (baseSegundaFaixa > MAX_FAIXA2) {
      this.impostoRendimento += MAX_FAIXA2 * ALIQUOTA_FAIXA2;
      baseSegundaFaixa = baseImposto - MAX_FAIXA2;
    }

    return baseSegundaFaixa;
  }

  obterTerceiraFaixa(baseImposto){
    let baseTerceiraFaixa = baseImposto;

    if (baseTerceiraFaixa > 0 && baseTerceiraFaixa < MAX_FAIXA3) {
      this.impostoRendimento += baseImposto * ALIQUOTA_FAIXA3;
      baseTerceiraFaixa = 0;
    } else if (baseTerceiraFaixa > MAX_FAIXA3) {
      this.impostoRendimento += MAX_FAIXA3 * ALIQUOTA_FAIXA3;
      baseTerceiraFaixa = baseImposto - MAX_FAIXA3;
    }

    return baseTerceiraFaixa;
  }

  obterQuartaFaixa(baseImposto){
    let baseQuartaFaixa = baseImposto;

    if (baseQuartaFaixa > 0 && baseQuartaFaixa < MAX_FAIXA4) {
      this.impostoRendimento += baseImposto * ALIQUOTA_FAIXA4;
      baseQuartaFaixa = 0;
    } else if (baseQuartaFaixa > MAX_FAIXA4) {
      this.impostoRendimento += MAX_FAIXA4 * ALIQUOTA_FAIXA4;
      baseQuartaFaixa = baseImposto - MAX_FAIXA4;
    }

    return baseQuartaFaixa;
  }

  obterQuintaFaixa(baseImposto){
    let baseQuintaFaixa = baseImposto;

    if (baseQuintaFaixa > 0) {
      this.impostoRendimento += baseImposto * ALIQUOTA_FAIXA5;
    }

    return baseQuintaFaixa;
  }

  obterAliquota(){
    this.calculoImposto();  
    let impost = this.impostoRendimento;  

    return this.aliquota = impost*100/this.totalRendimento;
  }
  

  obterTotalDeducoes() {
    return this.deducoes.geral + this.deducoes.previdencia + this.deducoes.pensao + (VALOR_DEPENDENTE * this.dependentes.length);
  }

  obterListaDeducoesGerais() {
    return this.listaDeducoes;
  }

  obterListaDeducoesPrevidenciarias() {
    return this.previdencia;
  }

  obterListaDeDependentes() {
    return this.dependentes;
  }


  obterTotalRendimentos() {
    return this.totalRendimento;
  }

  obterBaseCalculo() {
    return this.totalRendimento - this.obterTotalDeducoes();
  }
}

module.exports = CalculadoraIRPF;