export interface NavLink {
    name: string;
    path: string;
}

export type ToastType = 'success' | 'error' | 'warning';

export interface Toast {
  type: ToastType;
  title: string;
  body: string;
  delay: number;
}

export interface PlayerStats {
  _id: string;
  name: string;
  value: number;
  team: {
    name: string;
    logo: string
  }
}

export interface TeamStats {
  _id: string;
  name: string;
  stadium: string;
  value: number;
  image: string;
}