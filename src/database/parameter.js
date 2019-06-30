import Parameter from "../models/Parameter";
import Establishment from "../models/Establishment";

export default async () => {
  const store = async (data) => {
    console.log(data)
    let exists = await Parameter.findOne({establishment: data.establishment, index: data.index})

    if (exists) return false

    data.establishment = await Establishment.findById(data.establishment)

    let parameter = new Parameter(data)

    parameter.save()

    return parameter
  }

  const get = async (data) => {
    return await Parameter.findOne({establishment: data.establishment, index: data.index})
  }

  const update = async (data) => {
    return await Parameter.findOneAndUpdate({establishment: data.establishment, index: data.index},data)
  }

  const remove = async (_id) => {
    return await Parameter.findOneAndRemove({_id: _id})
  }

  return {
    store,
    get,
    update,
    remove
  }
}