import data from '../data/ventas.json' with { type: "json" };

export const getVentas = (req, res) => {
    if (!data || data.length === 0) {
        return res.status(400).json({ message: 'No hay ventas disponibles.' });
    }
    res.json(data);
};

export const getVenta = (req, res) => {
    const { id } = req.params;
    const venta = data.find(venta => venta.id === parseInt(id));
    if (!venta) {
        return res.status(400).json({ message: 'Venta no encontrada.' });
    }
    res.json(venta);
};

export const getVentasByUsuario = (req, res) => {
    const { id_usuario } = req.params;
    const ventasUsuario = data.filter(venta => venta.id_usuario === parseInt(id_usuario));

    if (ventasUsuario.length === 0) {
        return res.status(400).json({ message: 'No se encontraron ventas para este usuario.' });
    }

    res.json(ventasUsuario);
};

export const createVenta = (req, res) => {
    try {
        const { id_usuario, fecha, total, dirección, productos } = req.body || {};

        if (!id_usuario || !fecha || !total || !dirección || !productos || productos.length === 0) {
            return res.status(400).json({ message: 'Faltan datos obligatorios para crear la venta.' });
        }

        const newId = data.length > 0 ? Math.max(...data.map(venta => venta.id)) + 1 : 1;
        const newVenta = {
            id: newId,
            id_usuario,
            fecha,
            total,
            dirección,
            productos
        };
        
        data.push(newVenta);
        res.status(201).json(newVenta);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear la venta.' });
    }
};

export const updateVenta = (req, res) => {
    try {
        const { id } = req.params;
        const { id_usuario, fecha, total, dirección, productos } = req.body || {};

        if (!id || !id_usuario || !fecha || !total || !dirección || !productos || productos.length === 0) {
            return res.status(400).json({ message: 'Faltan datos obligatorios para actualizar la venta.' });
        }

        const ventaIndex = data.findIndex(venta => venta.id === parseInt(id));
        if (ventaIndex === -1) {
            return res.status(400).json({ message: 'Venta no encontrada.' });
        }

        data[ventaIndex] = {
            ...data[ventaIndex],
            id_usuario,
            fecha,
            total,
            dirección,
            productos,
        };

        res.status(200).json(data[ventaIndex]);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un problema al actualizar la venta.' });
    }
};
