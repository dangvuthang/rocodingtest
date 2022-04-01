import User, { IUser } from '../models/User';

async function createUser({
    fullName,
    email,
    photoUrl,
    roles
}: IUser): Promise<IUser> {
  return User.create({
    fullName,
    email,
    photoUrl,
    roles
  })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function getAllUser({
    fullName,
    email,
    photoUrl,
    roles
}: IUser): Promise<IUser> {
  return User.create({
    fullName,
    email,
    photoUrl,
    roles
  })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function getById({
    fullName,
    email,
    photoUrl,
    roles
}: IUser): Promise<IUser> {
  return User.create({
    fullName,
    email,
    photoUrl,
    roles
  })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

async function update({
    fullName,
    email,
    photoUrl,
    roles
}: IUser): Promise<IUser> {
  return User.create({
    fullName,
    email,
    photoUrl,
    roles
  })
    .then((data: IUser) => {
      return data;
    })
    .catch((error: Error) => {
      throw error;
    });
}

export default {
  createUser,
  getAllUser,
  getById,
  update
};