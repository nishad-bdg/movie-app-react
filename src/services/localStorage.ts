export const setTokens = (token: string) => {
  localStorage.setItem('token', token );
};

export const removeTokens = () => {
  localStorage.removeItem('user');
  localStorage.removeItem('accessToken');
  localStorage.removeItem('token');
};
export const getAccessToken = () => localStorage.getItem('token')
export const getUser = () => localStorage.getItem('user');
export const setUser = (user: any) => localStorage.setItem('user', JSON.stringify(user));
