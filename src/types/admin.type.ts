export interface ICreateAdminBody {
  name: string;
  pin: string;
  permlevel: number;
  site_id: number;
  password: string;
  status: 'Active' | 'Disabled';
  user_type: 'Super Admin' | 'Site Admin' | 'Report Admin' | 'Dashboard Admin';
  created_at?: string;
  updated_at?: string;
  horizontal_bulk_employee: 'Yes' | 'No';
  vertical_bulk_reader: 'Yes' | 'No';
}


export interface ILogin {
    name: string;
    password: string;
}