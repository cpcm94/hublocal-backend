const db = require('../Models')

const Location = db.location
const Responsible = db.responsible

exports.getLocations = (req, res) => {
  Location.findAll({
    where: {
      CompanyId: req.body.company_id,
    },
  })
    .then((locations) => {
      if (!locations) {
        return res.status(404).send({ message: 'Locations not found' })
      }

      return res.status(200).send(locations)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.createLocation = (req, res) => {
  Location.create({
    name: req.body.name,
    address: req.body.address,
    main_responsible: req.body.main_responsible,
    CompanyId: req.body.company_id,
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
exports.getLocation = (req, res) => {
  Location.findOne({
    where: {
      CompanyId: req.body.company_id,
    },
    include: Responsible,
  })
    .then((location) => {
      if (!location) {
        return res.status(404).send({ message: 'Location not found' })
      }

      return res.status(200).send(location)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.deleteLocation = (req, res) => {
  Location.findOne({
    where: {
      CompanyId: req.body.company_id,
      id: req.params.locationId,
    },
  })
    .then(() => {
      Location.destroy({
        where: {
          id: req.params.locationId,
        },
      })
        .then(() => {
          return res
            .status(200)
            .send({ message: 'Location deleted successfully' })
        })
        .catch((error) => {
          res.status(500).send({ message: error.message })
        })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.updateLocation = (req, res) => {
  Location.update(
    {
      name: req.body.name,
      address: req.body.address,
      main_responsible: req.body.user_id,
    },
    {
      where: {
        id: req.params.locationId,
      },
    }
  )
    .then(() => {
      return res.status(200).send({ message: 'Location updated successfully' })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
