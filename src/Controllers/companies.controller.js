const db = require('../Models')

const User = db.user
const Company = db.company

exports.getCompanies = (req, res) => {
  User.findOne({
    where: {
      id: req.body.userId,
    },
    include: Company,
  }).then((user) => {
    if (!user) {
      return res.status(404).send({ message: 'User Not found.' })
    }

    const companies = user.companies

    return res.status(200).json(companies)
  })
}
exports.createCompany = (req, res) => {
  Company.create({
    name: req.body.name,
    CNPJ: req.body.cnpj,
    description: req.body.description,
    main_responsible: req.body.userId,
  })
    .then((result) => {
      console.log({ result })
      return res.status(200).send({ message: 'Company created successfully' })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
