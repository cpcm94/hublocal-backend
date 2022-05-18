const db = require('../Models')

const Company = db.company
const Responsible = db.responsible

exports.getCompanies = (req, res) => {
  Company.findAll({
    where: {
      UserId: req.userId,
    },
  })
    .then((companies) => {
      if (!companies) {
        return res.status(404).send({ message: 'User Not found.' })
      }

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
    main_responsible: req.body.main_responsible,
    UserId: req.userId,
  })
    .then((result) => {
      Responsible.bulkCreate(
        req.body.responsibles.map((responsible) => {
          return {
            name: responsible.name,
            contact_number: responsible.contact_number,
            address: responsible.address,
          }
        })
      )
        .then(() => console.log('Responsibles created successfully'))
        .catch((error) => console.error(error))
      return res.status(200).send(result)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.getCompany = (req, res) => {
  Company.findOne({
    where: {
      UserId: req.userId,
      id: req.params.companyId,
    },
    include: Responsible,
  })
    .then((company) => {
      if (!company) {
        return res.status(404).send({ message: 'Company not found' })
      }
      return res.status(200).send(company)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.deleteCompany = (req, res) => {
  Company.findOne({
    where: {
      UserId: req.userId,
      id: req.params.companyId,
    },
  })
    .then((result) => {
      if (!result) {
        return res.status(404).send({ message: 'Company Not Found' })
      }

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
      main_responsible: req.body.main_responsible,
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
