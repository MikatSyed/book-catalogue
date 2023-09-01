/* eslint-disable no-undef */

import prisma from '../../../shared/prisma';
import { IResponseUser } from './user.interface';

const getAllFromDB = async (): Promise<Partial<IResponseUser[]>> => {
  const result = await prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      contactNo: true,
      address: true,
      profileImg: true,
    },
  });
  return result;
};

// const getByIdFromDB = async (id: string): Promise<Building | null> => {
//     const result = await prisma.building.findUnique({
//         where: {
//             id
//         }
//     });
//     return result;
// };

// const updateOneInDB = async (id: string, payload: Partial<Building>): Promise<Building> => {
//     const result = await prisma.building.update({
//         where: {
//             id
//         },
//         data: payload
//     });
//     return result;
// };

// const deleteByIdFromDB = async (id: string): Promise<Building> => {
//     const result = await prisma.building.delete({
//         where: {
//             id
//         }
//     });
//     return result;
// };

export const UserService = {
  // insertIntoDB,
  getAllFromDB,
  // getByIdFromDB,
  // updateOneInDB,
  // deleteByIdFromDB
};
