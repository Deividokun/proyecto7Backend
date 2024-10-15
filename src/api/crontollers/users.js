const User = require('../models/users')
const { generateSign } = require('../../config/jwt')
const bcrypt = require('bcrypt')

const buscarUsuario = async (NickName) => {
  const user = await User.findOne({ NickName })
  return user
}

const GetUsr = async (req, res, next) => {
  try {
    const users = await User.find()
    return res.status(200).json(users)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const register = async (req, res, next) => {
  try {
    const newUser = new User({
      NickName: req.body.NickName,
      password: bcrypt.hashSync(req.body.password, 10),
      papel: 'user'
    })

    const usuarioDuplicado = await buscarUsuario(req.body.NickName)
    if (usuarioDuplicado) {
      return res.status(400).json('Este nombre ya está cogido')
    }

    const userSaved = await newUser.save()
    return res.status(201).json(userSaved)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const login = async (req, res, next) => {
  try {
    const user = await buscarUsuario(req.body.NickName)
    if (!user) {
      return res.status(400).json('El usuario no existe')
    }

    if (bcrypt.compareSync(req.body.password, user.password)) {
      const token = generateSign(user._id)
      return res.status(200).json({ user, token })
    } else {
      return res.status(400).json('Contraseña incorrecta')
    }
  } catch (error) {
    return res.status(400).json(error)
  }
}

const getUserById = async (req, res, next) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).json('Usuario no encontrado')
    }
    return res.status(200).json(user)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const updateUser = async (req, res, next) => {
  try {
    const userId = req.params.id

    if (req.user.rol !== 'admin' && req.user._id.toString() !== userId) {
      return res.status(403).json('No tienes permiso para realizar esta acción')
    }

    if (req.user.rol === 'admin' && req.body.rol) {
      if (req.body.rol !== 'user' && req.body.rol !== 'admin') {
        return res.status(400).json('Rol inválido. Debe ser "user" o "admin".')
      }
    }

    const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
      new: true
    })

    if (!updatedUser) {
      return res.status(404).json('Usuario no encontrado')
    }

    return res.status(200).json(updatedUser)
  } catch (error) {
    return res.status(400).json(error)
  }
}

const deleteUser = async (req, res, next) => {
  try {
    const userId = req.params.id

    if (req.user._id.toString() !== userId && req.user.rol !== 'admin') {
      return res.status(403).json('No tienes permiso para realizar esta acción')
    }

    const deletedUser = await User.findByIdAndDelete(userId)
    if (!deletedUser) {
      return res.status(404).json('Usuario no encontrado')
    }

    return res.status(200).json('Usuario eliminado correctamente')
  } catch (error) {
    return res.status(400).json(error)
  }
}

module.exports = {
  GetUsr,
  register,
  login,
  getUserById,
  updateUser,
  deleteUser
}
