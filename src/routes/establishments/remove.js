

export default async (req, res) => {

  try {
    // let question = await Question.findById(req.params.id).populate('subject')
    // let subject = await Subject.findById(question.subject._id)
    // subject.questions.pull({_id: question._id})

    // await subject.save()
    // await question.remove()
    // await Question.findByIdAndRemove(req.params.id)
    return res.status(202).end()
  } catch (err){
    return res.status(500).json({err})
  }

}