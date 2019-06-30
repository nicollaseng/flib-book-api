export default async (req, res) => {
  try {
    let information = {
      date: new Date
    }
    return res
      .json({information})
  } catch(e) {
    return res.status(500).json({information})
  }
}