// Data yang dikirim ke server
export interface LoginRequest {
  email: string;
  password: string;
}

// Data yang diterima dari server
export interface LoginResponse {
  token: string;
  user: {
    id: string;
    name: string;
    email: string;
  };
}
