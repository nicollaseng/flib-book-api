import User from '../../models/User'
import Establishment from '../../models/Establishment'
import PriceTable from '../../models/PriceTable';
import { isArray, isNullOrUndefined, isUndefined } from 'util'
import Parameter from '../../models/Parameter';

/**
 * API para criar um PriceTable
 * @params: 
 */
let metric = (metric, min) => {
  min = isUndefined(min) ? true : false

  switch(metric) {
    case "H":
      return min ? "Hr" : "Hora(s)"
    case "M":
      return min ? "Min" : "Minuto(s)"
    case "D":
      return min ? "Dia" : "Dia(s)"
  }
}

export default async (req, res) => {
  try {
    let data            = req.body
    if (!isNullOrUndefined(data.input)) {
      data.input        =  JSON.parse(data.input)
    }
    if (!isNullOrUndefined(data.output)) {
      data.output    =  JSON.parse(data.output)
      let quantities = []
      let timeAddon = data.output.map((el) => el.metric).indexOf("C");

      if ( isNullOrUndefined(timeAddon) ) {
        return res.json("Você precisa adicionar uma unidade métrica para a cada hora que passou do tempo")
      }

      // Vamos percorrer a tabela de preços
      // para averiguar possíveis erros
      data.output.filter((elem, i, array) => {
        let lastQtIndex = quantities.map((el) => el.quantity).indexOf(elem.quantity);
        let quantityInMinutes = 0
        let quantityInMinutesLastIndex = 0

        if (elem.unit == "M" ) quantityInMinutes = elem.quantity
        if (elem.unit == "H" ) quantityInMinutes = elem.quantity * 60
        if (elem.unit == "D" ) quantityInMinutes = elem.quantity  * 60 * 24
        if (!isNullOrUndefined(quantities[lastQtIndex]) && quantities[lastQtIndex].unit == "H" ) quantityInMinutesLastIndex = quantities[lastQtIndex].quantity
        if (!isNullOrUndefined(quantities[lastQtIndex]) && quantities[lastQtIndex].unit == "H" ) quantityInMinutesLastIndex = quantities[lastQtIndex].quantity * 60
        if (!isNullOrUndefined(quantities[lastQtIndex]) && quantities[lastQtIndex].unit == "D" ) quantityInMinutesLastIndex = quantities[lastQtIndex].quantity * 60 * 24

        if ( !isNullOrUndefined(quantities[lastQtIndex]) && quantityInMinutes <= quantityInMinutesLastIndex ) {
          return res.json("A quantidade => "+elem.quantity+" "+ metric(elem.unit,true) +" é menor ou igual que a quantidade anterior")
        }

        lastQtIndex = quantities.map((el) => el.metric).indexOf(elem.metric);
        if ( !isNullOrUndefined(quantities[lastQtIndex]) && elem.metric == "C" && quantities[lastQtIndex].metric == "C" ) {
          return res.json("A tabela para relacionar 'a cada' item não pode repetir.")
        }

        quantities.push({
          quantity: elem.quantity,
          unit: elem.unit,
          metric: elem.metric
        })
      })
    }

    let pricetable  = await PriceTable.findOneAndUpdate(
      {_id: req.params.id, establishment: req.user.establishment},
      data
    )

    return res.status(201)
            .json({ pricetable })
  } catch (err){
    return res.status(500)
            .json({ err })
  }
}