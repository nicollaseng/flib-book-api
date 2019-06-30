import moment from 'moment'
import { isNullOrUndefined } from 'util';

const makeCounter = (start = 0) => {
  let current = start;

  const add = (value = 1) => current += value
  const remove = (value = 1) => add(value * -1)
  const get = () => current
  const reset = () => current = 0

  return { add, remove, get, reset };

};

// Transformar horas / dias / minutos
const convert = (unit, time) => {
  let u = unit
  let a = time

  const minutes = () => {
    switch (u) {
      case "M": return a
      case "H": return (a * 60).toFixed()
      case "D": return (a * 24 * 60).toFixed()
    }
  }
  const hours = () => {
    switch (u) {
      case "M": return (a * 60).toFixed()
      case "H": return a
      case "D": return (a / 24).toFixed()
    }
  }
  const days = () => {
    switch (u) {
      case "M": return (a * 24 * 60).toFixed()
      case "H": return (a * 24).toFixed()
      case "D": return a
    }
  }

  const total = () => {
    switch (u) {
      case "M": return minutes()
      case "H": return hours()
      case "D": return days()
    }
  }

  return {
    minutes,
    hours,
    days,
    total
  }
}

const metric = (unit) => {
  switch (unit) {
    case "H":
      return 'Hr'
    case "M":
      return "Min"
    case "D":
      return "Dias"
    default:
      return undefined
  }
}

/**
 * Função para calcular automaticamente
 * as datas do checkin/out
 * @param {*} dt_inicial
 * @param {*} dt_final
 */
export default (dt_inicial, dt_final) => {
  let isDate = moment(dt_inicial)
  let initDate = moment(dt_final)
  let duration = moment.duration(isDate.diff(initDate))
  let total = makeCounter(0)
  
  const days = () => {
    return Math.trunc(duration.asDays())
  }

  const hours = () => {
    return Math.trunc(duration.asHours());
  }

  const minutes = () => {
    return Math.trunc(duration.asMinutes())
  }

  /**
   * Envio do pricetable e minutes para calculos
   * @param {*} priceTable 
   * @param {*} time in minutes
   */
  const priceOutput = (priceTable, time) => {
    let outputs         = priceTable.output
    let endIndexAndNoC  = outputs.map((el) => el.metric).lastIndexOf('A')
    let t               = time
    let loopStop        = false

    //outputs.sort((a, b) => a.pos - b.pos)
    let quantities = []
    outputs.forEach(output => {
      if (loopStop) return;
      // abro o valor com a quantidade convertendo em minutos
      const timeConvert = convert("M", time) // sempre será minutos
      const timeConvertInOutput = convert(output.unit, output.quantity)
      const timeConvertInOutputEnd = convert(outputs[endIndexAndNoC].unit, outputs[endIndexAndNoC].quantity)

      // Pego o ultimo indice que passou por aqui.
      let lastIndexInMetricA  = quantities.map((el) => el.metric).lastIndexOf('A')
      let nextIndexInMetricA  = !isNullOrUndefined(lastIndexInMetricA) ? lastIndexInMetricA+2 : undefined

      // declaro as variaveis para cada tempo
      let timeInMinutes    = timeConvert.minutes()
      let timeInHours      = timeConvert.hours()
      let timeInDays       = timeConvert.days()

      // Tempo que passou da tabela
      let timePassed =  t - timeConvertInOutputEnd.minutes()

      // caso seja a CADA x TEMPO vamos calcular o valor do time cost
      if (output.metric == "C") {
        // se o timepassed for > 0, vamos então perguntar se o timePassed é
        // maior que o tempo de tolerância
        if (timePassed > priceTable.tolerance) {
          console.log('Passou do tempo de tolerancia...')
          total.reset()
          // vamos cobrar a ultima hora segundo a tabela
          total.add((timePassed * output.amount / timeConvertInOutput.minutes() + outputs[endIndexAndNoC].amount).toFixed(2))
          loopStop = true
        }
      }

      // caso seja ATÉ x tempo, então vamos verificar o tempo
      // sendo que este é para minutos
      if (output.metric == "A" && output.unit == "M" && output.quantity <= timeInMinutes) {
        total.reset()
        if (output.quantity < timeInMinutes && !isNullOrUndefined(nextIndexInMetricA)) {
          total.add(outputs[nextIndexInMetricA].amount)
        } else {
          total.add(output.amount)
        }
      }

      // caso seja ATÉ x tempo, então vamos verificar o tempo
      // sendo que este é para horas
      if (output.metric == "A" && output.unit == "H" && output.quantity <= timeInHours) {
        total.reset()
        if (output.quantity < timeInHours && !isNullOrUndefined(nextIndexInMetricA)) {
          total.add(outputs[nextIndexInMetricA].amount)
        } else {
          total.add(output.amount)
        }
      }

      // caso seja ATÉ x tempo, então vamos verificar o tempo
      // sendo que este é para dias
      if (output.metric == "A" && output.unit == "D" && output.quantity <= timeInDays) {
        total.reset()
        if (output.quantity < timeInDays && !isNullOrUndefined(nextIndexInMetricA)) {
          total.add(outputs[nextIndexInMetricA].amount)
        } else {
          total.add(output.amount)
        }
      } 
      
      quantities.push(output)
    });

    return total.get()
  }

  return { days, hours, minutes, priceOutput }
}