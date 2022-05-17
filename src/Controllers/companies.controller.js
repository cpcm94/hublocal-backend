const db = require('../Models')

const User = db.user
const Company = db.company

exports.getCompanies = (req, res) => {
  User.findOne({
    where: {
      id: req.body.user_id,
    },
    include: Company,
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'User Not found.' })
      }
      const companies = user.Companies

      return res.status(200).send(companies)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.createCompany = (req, res) => {
  Company.create({
    name: req.body.name,
    CNPJ: req.body.cnpj,
    description: req.body.description,
    main_responsible: req.body.user_id,
    UserId: req.body.user_id,
  })
    .then((result) => {
      return res.status(200).send(result)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.getCompany = (req, res) => {
  User.findOne({
    where: {
      id: req.body.user_id,
    },
    include: {
      model: Company,
      where: {
        id: req.params.companyId,
      },
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Company not found' })
      }
      const company = user.Companies

      return res.status(200).send(company)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.deleteCompany = (req, res) => {
  let company

  User.findOne({
    where: {
      id: req.body.user_id,
    },
    include: {
      model: Company,
      where: {
        id: req.params.companyId,
      },
    },
  })
    .then((user) => {
      if (!user) {
        return res.status(404).send({ message: 'Company Not Found' })
      }
      company = user.Companies

      if (!company) {
        res.status(404).send({ message: 'Company Not Found.' })
      } else {
        Company.destroy({
          where: {
            id: req.params.companyId,
          },
        })
          .then(() => {
            return res
              .status(200)
              .send({ message: 'Company deleted successfully' })
          })
          .catch((error) => {
            res.status(500).send({ message: error.message })
          })
      }
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.updateCompany = (req, res) => {
  Company.update(
    {
      name: req.body.name,
      CNPJ: req.body.cnpj,
      description: req.body.description,
      main_responsible: req.body.user_id,
    },
    {
      where: {
        id: req.params.companyId,
      },
    }
  )
    .then(() => {
      return res.status(200).send({ message: 'Company updated successfully' })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
