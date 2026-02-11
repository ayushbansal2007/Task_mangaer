export interface LoginData {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  whatsapp_number: number;
  bio: string;
}

export interface AuthResponse {
  token: string;
  user: string;
}

// Days user can select
export type Day =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

// Task form data (user input)
export interface TaskFormData {
  title: string;
  days: Day[];      // multiple days now
  time: string;
  repeatDaily: boolean;
}

// Task saved in system
export interface Task {
  id: string;
  title: string;
  day: Day;
  time: string;
  completed: boolean;
  points: number;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  whatsapp_number: number;
  goal: string;
  bio: string;
}



