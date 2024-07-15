import countBy from "./countBy.js";

type TransacaoValor = Transacao & {valor: number};
function filtrarValor(transacao: Transacao): transacao is TransacaoValor{
    return transacao.valor !== null;
}

export default class Estatisticas{
    private transacoes;
    public total;
    public pagamento;
    public status;
    public semana;
    public melhorDia;

    constructor(transacoes: Transacao[]){
        this.transacoes = transacoes;
        this.total = this.setTotal();
        this.pagamento = this.setPagamento();
        this.status = this.setStatus();
        this.semana = this.setSemana();
        this.melhorDia = this.setMelhorDia();
    }

    private setTotal(){
        return this.transacoes.filter(filtrarValor).reduce((acc, item) => {
            return acc + item.valor;
        }, 0)
    }

    private setPagamento(){
        return countBy(this.transacoes.map(({pagamento}) => pagamento));
    }

    private setStatus(){
        return countBy(this.transacoes.map(({status}) => status));
    }

    private setSemana(){
        let semana = {
            'Domingo': 0,
            'Segunda': 0,
            'Terça': 0,
            'Quarta': 0,
            'Quinta': 0,
            'Sexta': 0,
            'Sabado': 0
        }

        this.transacoes.forEach((item) =>{
            const day = item.data.getDay();
            if(day === 0) semana.Domingo++;
            if(day === 1) semana.Segunda++;
            if(day === 2) semana.Terça++;
            if(day === 3) semana.Quarta++;
            if(day === 4) semana.Quinta++;
            if(day === 5) semana.Sexta++;
            if(day === 6) semana.Sabado++;
        })
        
        return semana;
    }

    private setMelhorDia(){
        const semanaArray = Object.entries(this.semana);
        let melhor = semanaArray[0]
        semanaArray.forEach((item) =>{
            if(item[1] > melhor[1]){
                melhor = item
            }
        })
        return melhor;
    }
}