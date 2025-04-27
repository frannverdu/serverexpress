import sales from '../data/ventas.json' with { type: "json" };
import users from '../data/usuarios.json' with { type: "json" };
import productsData from '../data/productos.json' with { type: "json" };

export const getSales = (req, res) => {
    if (!sales || sales.length === 0) {
        return res.status(400).json({ message: 'No hay ventas disponibles.' });
    }
    res.json(sales);
};

export const getSale = (req, res) => {
    const { id } = req.params;
    const sale = sales.find(sale => sale.id === parseInt(id));
    if (!sale) {
        return res.status(400).json({ message: 'Venta no encontrada.' });
    }
    res.json(sale);
};

export const createSale = (req, res) => {
    try {
        const { userId, date, total, address, products } = req.body || {};
        if (!userId || !date || !total || !address || !products || !products.length) {
            return res.status(400).json({ message: 'Faltan datos obligatorios para crear la venta.' });
        }
        // Validar que exista el usuario
        const userExists = users.some(user => user.id === userId);
        if (!userExists) {
            return res.status(400).json({ message: 'El usuario no existe.' });
        }
        // Validar que exista el producto
        const invalidProductIds = products.filter(product => !productsData.some(item => item.id === product.id)).map(product => product.id);
        if (invalidProductIds.length > 0) {
            return res.status(400).json({ message: `Los siguientes productos no existen: ${invalidProductIds.join(', ')}` });
        }
        const newId = sales.length > 0 ? Math.max(...sales.map(sale => sale.id)) + 1 : 1;
        const newSale = {
            id: newId,
            id_usuario: userId,
            fecha: date,
            total,
            direccion: address,
            productos: products
        };
        sales.push(newSale);
        res.status(201).json(newSale);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un error al crear la venta.' });
    }
};

export const getSalesByParams = (req, res) => {
    try {
        const { dates, users, totals } = req.body || {};
        let filteredSales = sales;
        if (dates && Array.isArray(dates) && dates.length) {
            filteredSales = filteredSales.filter(sale =>
                dates.some(fecha => sale.fecha.includes(fecha))
            );
        }
        if (users && Array.isArray(users) && users.length) {
            filteredSales = filteredSales.filter(sale =>
                users.includes(sale.id_usuario)
            );
        }
        if (totals && Array.isArray(totals) && totals.length) {
            filteredSales = filteredSales.filter(sale =>
                totals.some(total => sale.total.toString().includes(total.toString()))
            );
        }
        if (filteredSales.length === 0) {
            return res.status(400).json({ message: 'No se encontraron ventas con esos parámetros' });
        }
        res.status(200).json(filteredSales);
    } catch (error) {
        res.status(500).json({ message: 'Hubo un problema al buscar las ventas.' });
    }
};


// export const updateSale = (req, res) => {
//     try {
//         const { id } = req.params;
//         const { id_usuario, fecha, total, dirección, productos } = req.body || {};

//         if (!id || !id_usuario || !fecha || !total || !dirección || !productos || productos.length === 0) {
//             return res.status(400).json({ message: 'Faltan datos obligatorios para actualizar la venta.' });
//         }

//         const ventaIndex = sales.findIndex(venta => venta.id === parseInt(id));
//         if (ventaIndex === -1) {
//             return res.status(400).json({ message: 'Venta no encontrada.' });
//         }

//         sales[ventaIndex] = {
//             ...sales[ventaIndex],
//             id_usuario,
//             fecha,
//             total,
//             dirección,
//             productos,
//         };

//         res.status(200).json(sales[ventaIndex]);
//     } catch (error) {
//         res.status(500).json({ message: 'Hubo un problema al actualizar la venta.' });
//     }
// };
