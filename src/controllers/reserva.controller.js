
import { Reserva } from "../models/reserva.model.js";
import { Restaurante } from "../models/restaurante.model.js";
import { Mesa } from "../models/mesa.model.js";
import { Cliente } from "../models/cliente.model.js";
import { RangoDeHoraPorReserva } from "../models/hora.js";
export const getLibres = async (req, res) => {
    try {
      const { id_restaurante, fecha, desdeHora, hastaHora } = req.body;
  
      const rangos_de_hora = [];
      for (let index = desdeHora; index < hastaHora; index++) {
        rangos_de_hora.push(`${index}-${index + 1}`);
      }
  
      let listaMesas = await Mesa.findAll({
        where: {
          restauranteId: id_restaurante,
        },
      });
      const reservas = await Reserva.findAll({
        where: {
          fecha: new Date(fecha),
          id_restaurante: id_restaurante,
        },
      });
  
      if (reservas.length === 0) {
        res.json(listaMesas);
        return;
      }
  
      const rangos_de_hora_totales = await RangoDeHoraPorReserva.findAll();
  
      for (const reserva of reservas) {
        const rangos_horas = rangos_de_hora_totales.filter(
          (rangoHora) => rangoHora.id_reserva === reserva.id
        );
        reserva.dataValues.rangos_de_hora = [];
        for (const index of Object.keys(rangos_horas)) {
          let hora = rangos_horas[index].hora;
          reserva.dataValues.rangos_de_hora.push(hora);
        }
        for (const rango_de_hora of rangos_de_hora) {
          if (reserva.dataValues.rangos_de_hora.includes(rango_de_hora)) {
            listaMesas = listaMesas.filter((mesa) => mesa.id !== reserva.id_mesa);
          }
        }
      }
  
      res.json(listaMesas);
    } catch (error) {
      console.error("Error en getLibres:", error);
      res.status(500).json({ error: "Ocurrió un error en el servidor" });
    }
  };
  
export const postReservas = async (req, res) => {
    const {
        id_cliente, id_restaurante, id_mesa,
        fecha, cantidad, desdeHora, hastaHora,
    } = req.body

    const {capacidad} = await Mesa.findOne({
        where: {
            id: id_mesa
        }
    })
    console.log(capacidad, "aaaaaaaaaaaaaaaaaaaa")
    const reserva = await Reserva.create({
        id_cliente,
        id_restaurante,
        id_mesa,
        fecha,
        cantidad: capacidad,
    })

       // Actualizar el campo "ocupado" a true en la tabla de la mesa
       await Mesa.update({ ocupado: true }, {
        where: {
            id: id_mesa
        }
    })


    const rangos_de_hora = []
    for (let index = desdeHora; index < hastaHora; index++) {
        rangos_de_hora.push(`${index}-${index+1}`)
    }

    for (const rango_hora of rangos_de_hora) {
        RangoDeHoraPorReserva.create({
            id_reserva: reserva.dataValues.id,
            hora: rango_hora
        })
    }

    res.json(reserva)
}

export const getReservas = async (req, res) => {
    const reservas = await Reserva.findAll()
    const rangos_de_hora = await RangoDeHoraPorReserva.findAll()

    for (const reserva of reservas) {
        const rangos_horas = rangos_de_hora.filter(rangoHora => rangoHora.id_reserva === reserva.id)
        reserva.dataValues.rangos_de_hora = []
        for (const index of Object.keys(rangos_horas)) {
            let hora = rangos_horas[index].hora
            reserva.dataValues.rangos_de_hora.push(hora)
        }
    }

    res.json(reservas)
}

export const putReservas = async (req, res) => {
    const { id } = req.params
    const {
        id_restaurante, id_mesa, fecha,
        id_cliente, cantidad, rangos_de_hora,
    } = req.body

    const reserva = await Reserva.update(
        {
            id_cliente,
            id_restaurante,
            id_mesa,
            fecha,
            cantidad,
        },
        { where: { id } }
    )

    await RangoDeHoraPorReserva.destroy({
        where: { id_reserva: id }
    })

    for (const rango_hora of rangos_de_hora) {
        RangoDeHoraPorReserva.create({
            id_reserva: id,
            hora: rango_hora
        })
    }

    res.json(reserva)
}


export const deleteReservas = async (req, res) => {
    const { id } = req.params

    await RangoDeHoraPorReserva.destroy({
        where: { id_reserva: id }
    })

    await Reserva.destroy(
        { where: { id } }
    )

    res.json(Reserva)
}