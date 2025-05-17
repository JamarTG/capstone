// eslint-disable-next-line
export const handleRequest = async (request: Promise<any>) => {
  try {
    const { data } = await request;
    return data;
  } catch (error) {
    console.error("API Error:", error);
    throw error;
  }
};
