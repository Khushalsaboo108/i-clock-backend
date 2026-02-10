export const create_site = {
  body: {
    type: "object",
    required: [
      "site_code",
      "name",
      "contact",
      "auto_remove_emp",
      "agrigistics_site",
      "pull_employees",
      "send_attendance",
      "easyroster",
      "eduman",
      "send_agrigistics_gps",
      "data_format",
      "server_ip",
      "access_user",
    ],
    properties: {
      // --- Site Table Fields ---
      site_code: { type: "string", minLength: 1 },
      name: { type: "string", minLength: 1 },
      contact: { type: "string" },
      site_password: { type: "string" },
      easyroster_token: { type: ["string", "null"] },
      
      // Enum Fields (Matching your DB 'Yes'/'No' requirements)
      auto_remove_emp: { type: "string", enum: ["Yes", "No"], default: "No" },
      agrigistics_site: { type: "string", enum: ["Yes", "No"], default: "No" },
      pull_employees: { type: "string", enum: ["Yes", "No"], default: "No" },
      send_attendance: { type: "string", enum: ["Yes", "No"], default: "No" },
      easyroster: { type: "string", enum: ["Yes", "No"], default: "No" },
      eduman: { type: "string", enum: ["Yes", "No"], default: "No" },
      send_agrigistics_gps: { type: "string", enum: ["Yes", "No"], default: "No" },

      // --- Site Trans Table Fields ---
      license_validity: { type: "string", format: "date-time" }, // Or just "string"
      data_format: { type: "string" },
      data_format_other: { type: "string", default: "" },
      license_key: { type: "string" },
      server_ip: { type: "string" },
      access_user: { type: "string", enum: ["Yes", "No"], default: "No" },
    },
  },
};