"use client";
import { io } from "socket.io-client";

const serverURL = process.env.NEXT_PUBLIC_BACKEND_URI;
export const socket = io(serverURL, { autoConnect: false });
