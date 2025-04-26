import data from '../data/usuarios.json' with { type: "json" };

export const getUsers = (req, res) => {
  if (!data || data.length === 0) {
    return res.status(404).json({ message: 'No hay usuarios disponibles.' });
  }
  res.json(data);
};

export const getUser = (req, res) => {
  const { id } = req.params;
  const user = data.find(user => user.id === parseInt(id));
  if (!user) {
    return res.status(404).json({ message: 'Usuario no encontrado.' });
  }
  res.json(user);
};

export const createUser = (req, res) => {
  try {
    const { name, lastName, email, password } = req.body || {};
    if (!name || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos obligatorios' });
    }
    const existingUser = data.find(user => user.email === email);
    if (existingUser) {
      return res.status(400).json({ message: 'El correo electrónico ya está registrado' });
    }
    const newId = data.length > 0 ? Math.max(...data.map(user => user.id)) + 1 : 1;
    const newUser = {
      id: newId,
      nombre: name,
      apellido: lastName,
      email,
      contraseña: password
    };s
    data.push(newUser);
    res.status(201).json(newUser);
  } catch (error) {
    res.status(500).json({ message: 'Hubo un error al crear el usuario' });
  }
};

export const getUserByParams = (req, res) => {
  try {
    const { names, lastNames, emails } = req.body || {};
    let filteredUsers = data;
    if (names && Array.isArray(names)) {
      filteredUsers = filteredUsers.filter(user =>
        names.some(name => user.nombre.toLowerCase().includes(name.toLowerCase()))
      );
    }
    if (lastNames && Array.isArray(lastNames)) {
      filteredUsers = filteredUsers.filter(user =>
        lastNames.some(lastName => user.apellido.toLowerCase().includes(lastName.toLowerCase()))
      );
    }
    if (emails && Array.isArray(emails)) {
      filteredUsers = filteredUsers.filter(user =>
        emails.some(email => user.email.toLowerCase().includes(email.toLowerCase()))
      );
    }
    if (filteredUsers.length === 0) {
      return res.status(404).json({ message: 'No se encontraron usuarios con esos parámetros' });
    }
    res.status(200).json(filteredUsers);
  } catch (error) {
    res.status(500).json({ message: 'Hubo un problema al buscar los usuarios.' });
  }
};

export const updateUser = (req, res) => {
  try {
    const { id } = req.params;
    const { name, lastName, email, password } = req.body || {};
    if (!id || !name || !lastName || !email || !password) {
      return res.status(400).json({ message: 'Faltan datos obligatorios para actualizar el usuario.' });
    }
    const userIndex = data.findIndex(user => user.id === parseInt(id));
    if (userIndex === -1) {
      return res.status(404).json({ message: 'Usuario no encontrado.' });
    }
    data[userIndex] = {
      ...data[userIndex],
      nombre: name,
      apellido: lastName,
      email: email,
      contraseña: password,
    };
    res.status(200).json(data[userIndex]);
  } catch (error) {
    res.status(500).json({ message: 'Hubo un problema al actualizar el usuario.' });
  }
};