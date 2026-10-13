export const hash = jest.fn(async (password: string): Promise<string> => `hashed_${password}`);
export const compare = jest.fn(
  async (password: string, hash: string): Promise<boolean> => hash === `hashed_${password}`,
);
export const genSalt = jest.fn(async (): Promise<string> => 'salt');
