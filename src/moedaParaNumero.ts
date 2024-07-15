export default function moedaParaNumero(moeda: string): number | null{
    const numero = Number(moeda.replaceAll('.','').replace(',','.'))
    return isNaN(numero) ? null : numero;
}