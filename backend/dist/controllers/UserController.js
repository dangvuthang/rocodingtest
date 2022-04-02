"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const User_1 = __importDefault(require("../models/User"));
async function createUser({ fullName, email, photoUrl, roles }) {
    return User_1.default.create({
        fullName,
        email,
        photoUrl,
        roles
    })
        .then((data) => {
        return data;
    })
        .catch((error) => {
        throw error;
    });
}
async function getAllUser({ fullName, email, photoUrl, roles }) {
    return User_1.default.create({
        fullName,
        email,
        photoUrl,
        roles
    })
        .then((data) => {
        return data;
    })
        .catch((error) => {
        throw error;
    });
}
async function getById({ fullName, email, photoUrl, roles }) {
    return User_1.default.create({
        fullName,
        email,
        photoUrl,
        roles
    })
        .then((data) => {
        return data;
    })
        .catch((error) => {
        throw error;
    });
}
async function update({ fullName, email, photoUrl, roles }) {
    return User_1.default.create({
        fullName,
        email,
        photoUrl,
        roles
    })
        .then((data) => {
        return data;
    })
        .catch((error) => {
        throw error;
    });
}
exports.default = {
    createUser,
    getAllUser,
    getById,
    update
};
//# sourceMappingURL=UserController.js.map