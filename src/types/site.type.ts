export interface ISiteCreate {
  site_code: string;
  name: string;
  contact: string;
  site_password: string;
  agrigistics_site: boolean;
  send_agrigistics_gps: boolean;
  pull_employees: boolean;
  easyroster: boolean;
  easyroster_token: string;
  eduman: boolean;
  send_attendance: boolean;
  auto_remove_emp: boolean;

  // license_validity: string;
  data_format: string;
  data_format_other: string;
  // license_key: string;
  server_ip: string;
  access_user: boolean;
}
