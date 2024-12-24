// Fungsi helper untuk autentikasi
export const isAuthenticated = () => {
  const token = localStorage.getItem('token');
  return !!token;
};

export const login = (token) => {
  localStorage.setItem('token', token);
};

export const logout = () => {
  localStorage.removeItem('token');
  // Tambahan: Hapus data user lainnya jika ada
  window.location.href = '/';
};

export const getToken = () => {
  return localStorage.getItem('token');
}; 