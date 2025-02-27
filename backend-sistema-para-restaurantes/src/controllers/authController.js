const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

// Sign Up
const signUp = async (req, res) => {
    try {
        const { email, password } = req.body;
    
        // Verificar que el email y password no estén vacíos
        if (!email || !password) {
          return res.status(400).json({ message: 'Faltan datos requeridos' });
        }
    
        // Verificar si el usuario ya existe
        const userExists = await User.findOne({ email });
        if (userExists) {
          return res.status(400).json({ message: 'El correo ya está registrado' });
        }
    
        // Crear un nuevo usuario
        const user = new User({
          email,
          password
        });
    
        // Encriptar la contraseña antes de guardarla
        user.password = await bcrypt.hash(password, 10);
    
        await user.save();
        res.status(201).json({ message: 'Usuario registrado correctamente' });
    
      } catch (err) {
        console.error(err); // Mostrar el error en consola
        res.status(500).json({ message: 'Error en el servidor' }); // Responder con error del servidor
      }
};

// Sign In
const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verificar si el usuario existe
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Verificar la contraseña
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(400).json({ message: 'Credenciales inválidas' });
    }

    // Crear JWT
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: '1h'
    });

    res.json({ 
        message: 'Inicio de sesión exitoso', 
        token,
        user: {
            id: user._id,
            email: user.email
        }
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error en el servidor' });
  }
};

// Log Out
const logOut = (req, res) => {
  res.json({ message: 'Cierre de sesión exitoso' });
};

module.exports = { signUp, signIn, logOut };
