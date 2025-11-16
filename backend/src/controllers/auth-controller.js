const { validationResult } = require('express-validator');
const AuthService = require('../services/auth-service');
const { StatusCodes } = require('http-status-codes');
const { SuccessResponse, ErrorResponse } = require('../utils/common');

async function register(req, res) {
  try {
    const { name, email, password, role, linkedVolunteerId } = req.body;
    const { user, token } = await AuthService.register({ name, email, password, role, linkedVolunteerId });
    return res.status(StatusCodes.CREATED).json({ success: true, data: { user, token } });
  } catch (err) {
    return res.status(StatusCodes.BAD_REQUEST).json({ success:false, error: err.message });
  }
}

async function login(req, res) {
  try {
    const { email, password } = req.body;
    const { user, token } = await AuthService.login({ email, password });
    return res.status(StatusCodes.OK).json({ success: true, data: { user, token } });
  } catch (err) {
    return res.status(StatusCodes.UNAUTHORIZED).json({ success:false, error: err.message });
  }
}

async function me(req, res) {
  try {
    const user = await AuthService.getMe(req.user.id);
    return res.status(StatusCodes.OK).json({ success:true, data: user });
  } catch (err) {
    return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ success:false, error: err.message });
  }
}

module.exports = { register, login, me };
