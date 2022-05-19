const db = require('../Models')

const Ticket = db.ticket

exports.getTickets = (req, res) => {
  Ticket.findAll({
    where: {
      LocationId: req.body.location_id,
    },
  })
    .then((tickets) => {
      if (!tickets) {
        return res.status(404).send({ message: 'Tickets not found' })
      }

      return res.status(200).send(tickets)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.createTicket = (req, res) => {
  Ticket.create({
    id: req.body.id,
    title: req.body.title,
    creator: req.userId,
    responder: req.userId,
    status: req.body.status,
    updated_info: req.body.updated_info,
  })
    .then((result) => {
      return res.status(200).send(result)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.getTicket = (req, res) => {
  Ticket.findOne({
    where: {
      LocationId: req.body.location_id,
    },
  })
    .then((location) => {
      if (!location) {
        return res.status(404).send({ message: 'Ticket not found' })
      }

      return res.status(200).send(location)
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.deleteTicket = (req, res) => {
  Ticket.findOne({
    where: {
      LocationId: req.body.location_id,
      id: req.params.ticketId,
    },
  })
    .then(() => {
      Ticket.destroy({
        where: {
          id: req.params.ticketId,
        },
      })
        .then(() => {
          return res
            .status(200)
            .send({ message: 'Ticket deleted successfully' })
        })
        .catch((error) => {
          res.status(500).send({ message: error.message })
        })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
exports.updateTicket = (req, res) => {
  Ticket.update(
    {
      id: req.body.id,
      title: req.body.title,
      creator: req.userId,
      responder: req.body.responder_id,
      status: req.body.status,
      updated_info: req.body.updated_info,
    },
    {
      where: {
        id: req.params.ticketId,
      },
    }
  )
    .then(() => {
      return res.status(200).send({ message: 'Ticket updated successfully' })
    })
    .catch((error) => {
      res.status(500).send({ message: error.message })
    })
}
