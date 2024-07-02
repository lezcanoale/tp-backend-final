import { Cliente } from "../models/index.js";

export const createCliente = async (req, res) => {
  const { nombre, apellido, cedula } = req.body;
  try {
    let newCliente = await Cliente.create(
      {
        nombre,
        apellido,
        cedula,
      },
      {
        fields: ["nombre", "apellido", "cedula"],
      }
    );
    if (newCliente) {
      return res.json({
        message: "Cliente creado exitosamente",
        data: newCliente,
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

export const getClientes = async (req, res) => {
  try {
    const clientes = await Cliente.findAll();
    res.json({
      data: clientes,
    });
  } catch (error) {
    console.log(error);
  }
};

export const getOneCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const cliente = await Cliente.findOne({
      where: {
        id,
      },
    });
    if (!cliente) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }
    res.json({
      data: cliente,
    });
  } catch (error) {
    console.log(error);
  }
};

export const deleteCliente = async (req, res) => {
  const { id } = req.params;
  try {
    const deleteRowCount = await Cliente.destroy({
      where: {
        id,
      },
    });
    if (deleteRowCount === 0) {
      return res.status(404).json({
        message: "Cliente no encontrado",
      });
    }
    res.json({
      message: "Cliente eliminado exitosamente",
      count: deleteRowCount,
    });
  } catch (error) {
    console.log(error);
  }
};

export const updateCliente = async (req, res) => {
  const { id } = req.params;
  const { nombre, apellido, cedula } = req.body;
  try {
    const clientes = await Cliente.findAll({
      attributes: ["id", "nombre", "apellido", "cedula"],
      where: {
        id,
      },
    });
    if (clientes.length > 0) {
      clientes.forEach(async (cliente) => {
        await cliente.update({
          nombre,
          apellido,
          cedula,
        });
      });
      return res.json({
        message: "Cliente actualizado exitosamente",
        data: clientes,
      });
    } else {
      return res.status(404).json({
        message: "Cliente no encontrado",
        data: {},
      });
    }
  } catch (error) {
    console.log(error);
  }
};

export const getClientByCedula = async (req, res) => {
    const { cedula } = req.params;
    try {
      const cliente = await Cliente.findOne({
        where: {
          cedula,
        },
      });
      if (!cliente) {
        return res.status(404).json({
          message: "Cliente no encontrado",
        });
      }
      res.json({
        data: cliente,
      });
    }
    catch (error) {
      console.log(error);
    }
  };
  
