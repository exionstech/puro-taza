"use server";

import { prisma } from "@/lib/prisma";
import { UserType } from "@prisma/client";

export interface UserDataType {
  email: string;
  name: string;
  clerkId: string;
  role: UserType;
}

export async function getAllUsers() {
  try {
    const users = await prisma.user.findMany();

    console.log(users)
    return users;
  } catch (err) {
    console.error(err);
  }
}

export async function getUserById(clerkId: string) {
  try {
    const user = await prisma.user.findUnique({
      where: { clerkId },
    });
    
    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function createUser(userData: UserDataType) {
  try {
    const user = await prisma.user.create({
      data: userData,
    });

    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function updateUser(id: string, role: UserType) {
  try {
    await prisma.user.update({
      where: { id },
      data: { role },
    });

    const user = await prisma.user.findMany();

    return user;
  } catch (err) {
    console.error(err);
  }
}

export async function deleteUser(id: string) {
  try {
    await prisma.user.delete({
      where: { id },
    });

    const user = await prisma.user.findMany();

    return user;
  } catch (err) {
    console.error(err);
  }
}
