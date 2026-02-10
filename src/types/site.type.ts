export interface ISiteCreate {
  site_code: string;
  name: string;
  contact: string;
  site_password: string;
  agrigistics_site: "Yes" | "No";
  send_agrigistics_gps: "Yes" | "No";
  pull_employees: "Yes" | "No";
  easyroster: "Yes" | "No";
  easyroster_token: string;
  eduman: "Yes" | "No";
  send_attendance: "Yes" | "No";
  auto_remove_emp: "Yes" | "No";

  // license_validity: string;
  data_format: string;
  data_format_other: string;
  // license_key: string;
  server_ip: string;
  access_user: "Yes" | "No";
}
