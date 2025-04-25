const userSockets = new Map<string, string>();

export const saveUserSocket = (userId: string, socketId: string) => {
  userSockets.set(userId, socketId);
};

export const getUserSocket = (userId: string): string | undefined => {
  return userSockets.get(userId);
};

export const removeUserSocket = (socketId: string) => {
  for (const [userId, id] of userSockets.entries()) {
    if (id === socketId) {
      userSockets.delete(userId);
      break;
    }
  }
};
