import { Consumo } from "../models/index.js";
import { DetallesConsumo } from "../models/index.js";
import { Mesa } from "../models/index.js";
import { Producto } from "../models/index.js";
import PDFDocument from 'pdfkit';
import fs from 'fs';



export const createConsumo = async (req, res) => {
  const {
    idMesa,
    idCliente,
    estado,
    fechaCierre,
    horaCierre,
    detallesConsumoId,
  } = req.body;

  try {
    // const detalles = await DetallesConsumo.findAll({
    //   where: {
    //     id: detallesConsumoId,
    //   },
    //   include: [
    //     {
    //       model: Producto,
    //       attributes: ["precio"],
    //     },
    //   ],
    // });

    let total = 6000;

    // detalles.forEach((detalle) => {
    //   total += detalle.Producto.precio * detalle.cantidad;
    // });

    let newConsumo = await Consumo.create(
      {
        idMesa,
        idCliente,
        estado,
        total,
        fechaCreacion: new Date(), // Generar fecha actual automáticamente
        horaCreacion: new Date().toLocaleTimeString(), // Generar hora actual automáticamente
        fechaCierre,
        horaCierre,
        detallesConsumoId,
      },
      {
        fields: [
          "idMesa",
          "idCliente",
          "estado",
          "total",
          "fechaCreacion",
          "horaCreacion",
          "fechaCierre",
          "horaCierre",
          "detallesConsumoId",
        ],
      }
    );

    if (newConsumo) {
      await Mesa.update(
        { ocupado: true },
        {
          where: {
            id: idMesa,
          },
        }
      );

      return res.json({
        message: "Consumo creado exitosamente",
        data: newConsumo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salió mal",
      error: error.parent.detail,
      data: {},
    });
  }
};

export const createDetallesConsumo = async (req, res) => {
  const { idProducto, cantidad } = req.body;
  try {
    let newDetallesConsumo = await DetallesConsumo.create(
      {
        idProducto,
        cantidad,
      },
      {
        fields: ["idProducto", "cantidad"],
      }
    );
    if (newDetallesConsumo) {
      return res.json({
        message: "DetallesConsumo creado exitosamente",
        data: newDetallesConsumo,
      });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salio mal",
      error: error.parent.detail,
      data: {},
    });
  }
};

export const getConsumosByMesa = async (req, res) => {
  const { idMesa } = req.params;
  try {
    const consumos = await Consumo.findAll({
      where: {
        idMesa,
      },
    });
    res.json({
      data: consumos,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: "Algo salio mal",
      data: {},
    });
  }
}

export const generatePDF = async (req, res) => {
  const { idMesa } = req.params;

  try {
    const consumos = await Consumo.findAll({
      where: {
        idMesa,
      },
    });

    const doc = new PDFDocument();
    const writeStream = fs.createWriteStream('consumos.pdf'); // Cambiar el nombre del archivo PDF si lo deseas
    doc.pipe(writeStream);

    consumos.forEach((consumo) => {
      doc
        .fontSize(12)
        .text(`ID: ${consumo.id}`, 50, doc.y)
        .text(`ID Mesa: ${consumo.idMesa}`, 50, doc.y + 20)
        .text(`ID Cliente: ${consumo.idCliente}`, 50, doc.y + 40)
        .text(`Estado: ${consumo.estado}`, 50, doc.y + 60)
        .text(`Total: ${consumo.total}`, 50, doc.y + 80)
        .text(`Fecha Creación: ${consumo.fechaCreacion}`, 50, doc.y + 100)
        .text(`Hora Creación: ${consumo.horaCreacion}`, 50, doc.y + 120)
        .text(`Fecha Cierre: ${consumo.fechaCierre}`, 50, doc.y + 140)
        .text(`Hora Cierre: ${consumo.horaCierre}`, 50, doc.y + 160)
        .text(`Detalles Consumo ID: ${consumo.detallesConsumoId}`, 50, doc.y + 180)
        .moveDown();
    });

    doc.end();

    writeStream.on('finish', () => {
      res.json({
        message: 'Archivo PDF generado exitosamente',
      });
    });

    writeStream.on('error', (error) => {
      console.log(error);
      res.status(500).json({
        message: 'Algo salió mal al generar el PDF',
        data: {},
      });
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      message: 'Algo salió mal',
      data: {},
    });
  }
};

export const closeStatus = async (req, res) => {
  const { id } = req.params;
  const estado = "Cerrado";
  try {
    const consumos = await Consumo.findAll({
      attributes: [
        "id",
        "idMesa",
        "idCliente",
        "estado",
        "total",
        "fechaCreacion",
        "horaCreacion",
        "fechaCierre",
        "horaCierre",
        "detallesConsumoId",
      ],
      where: {
        id,
      },
    });
    if (consumos.length > 0) {
      consumos.forEach(async (consumo) => {
        await consumo.update({
          estado,
        });
      });
      return res.json({
        message: "Consumo actualizado exitosamente",
        data: consumos,
      });
    } else {
      return res.status(404).json({
        message: "Consumo no encontrado",
        data: consumos,
      });
    }
  } catch (error) {
    console.log(error);
    return res.status(500).json({
      message: "Algo salio mal",
      data: {},
    });
  }
}
