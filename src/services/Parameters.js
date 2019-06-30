import Parameter from './../models/Parameter'
import paramemetersDefault from './../database/parametersDefault'
import { isNullOrUndefined } from 'util'

const pDefault = () => {
  const get = (index) => {
    let isIndex = paramemetersDefault.indexOf(index)
    if (isNullOrUndefined(isIndex) || isIndex == -1) return {}

    return paramemetersDefault.slice(isIndex)
  }

  return {
    get
  }
}

export default (establishment) => {
    let paramsDefault = pDefault()

    const list = async () => {
      let parameters = await Parameter
                              .find({establishment: establishment})
                              .select('-establishment')
                              .select('-__v')
                              .catch((err) => console.log(err))

      if (isNullOrUndefined(parameters) || parameters.length < 1) return paramemetersDefault

      return Object.assign(paramemetersDefault,parameters)
    }

    const get = async (index) => {
      let parameter = await Parameter
                              .findOne({establishment: establishment, index: index})
                              .select('-establishment')
                              .select('-__v')
                              .catch((err) => console.log(err))

      if (isNullOrUndefined(parameter)) return paramsDefault.get(index)

      return parameter
    }


    return {
      list,
      get
    }

}
