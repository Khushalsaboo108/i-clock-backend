import { mysqlTable, mysqlSchema, AnyMySqlColumn, index, primaryKey, int, text, varchar, timestamp, mysqlEnum, datetime, smallint, decimal, mediumtext, tinyint, date, unique, longtext, foreignKey, char, bigint, double, time, json } from "drizzle-orm/mysql-core"
import { sql } from "drizzle-orm"

export const access_manual_control_command = mysqlTable("access_manual_control_command", {
	command_id: int("command_id", { unsigned: true }).autoincrement().notNull(),
	cmd_id: int("cmd_id"),
	reader_id: int("reader_id").default(0).notNull(),
	command: text(),
	login_id: int("login_id").notNull(),
	sourceinfo: varchar({ length: 255 }),
	ip_address: varchar("ip_address", { length: 30 }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	index("reader_id").on(table.reader_id),
	primaryKey({ columns: [table.command_id], name: "access_manual_control_command_command_id"}),
]);

export const admin = mysqlTable("admin", {
	admin_id: int("admin_id", { unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 35 }).default('').notNull(),
	pin: varchar({ length: 20 }).default('').notNull(),
	permlevel: int().default(0).notNull(),
	site_id: int("site_id").default(0).notNull(),
	password: varchar({ length: 255 }).notNull(),
	status: mysqlEnum(['Active','Disabled']).default('Active').notNull(),
	user_type: mysqlEnum("user_type", ['Super Admin','Site Admin','Report Admin','Dashboard Admin']).default('Site Admin').notNull(),
	created_at: datetime("created_at", { mode: 'string'}),
	updated_at: datetime("updated_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
	horizontal_bulk_employee: mysqlEnum("horizontal_bulk_employee", ['Yes','No']).default('Yes'),
	vertical_bulk_reader: mysqlEnum("vertical_bulk_reader", ['Yes','No']).default('Yes'),
},
(table) => [
	index("site_id").on(table.site_id),
	primaryKey({ columns: [table.admin_id], name: "admin_admin_id"}),
]);

export const admin_department = mysqlTable("admin_department", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	admin_id: int("admin_id"),
	department_id: int("department_id"),
},
(table) => [
	index("admin_id").on(table.admin_id),
	index("department_id").on(table.department_id),
	primaryKey({ columns: [table.id], name: "admin_department_id"}),
]);

export const admin_reader_trans = mysqlTable("admin_reader_trans", {
	id: int().autoincrement().notNull(),
	admin_id: int("admin_id").notNull(),
	reader_id: int("reader_id").notNull(),
	created_at: datetime("created_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
},
(table) => [
	primaryKey({ columns: [table.id], name: "admin_reader_trans_id"}),
]);

export const admin_site_trans = mysqlTable("admin_site_trans", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	admin_id: int("admin_id").default(0).notNull(),
	site_id: int("site_id").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	index("employee_id").on(table.admin_id),
	index("reader_id").on(table.site_id),
	primaryKey({ columns: [table.id], name: "admin_site_trans_id"}),
]);

export const agri_employee_group = mysqlTable("agri_employee_group", {
	id: int().autoincrement().notNull(),
	site_id: int("site_id"),
	site_code: varchar("site_code", { length: 255 }).notNull(),
	name: varchar({ length: 255 }).notNull(),
	group_id: varchar("group_id", { length: 255 }).notNull(),
	description: text(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "agri_employee_group_id"}),
]);

export const agrigistics_token = mysqlTable("agrigistics_token", {
	id: int().autoincrement().notNull(),
	token_id: varchar("token_id", { length: 255 }),
	name: varchar({ length: 255 }),
	surname: varchar({ length: 255 }),
	username: varchar({ length: 255 }),
	password: varchar({ length: 255 }),
	confirm_password: varchar("confirm_password", { length: 255 }),
	token: text(),
	role: varchar({ length: 255 }),
	farm_ids: varchar("farm_ids", { length: 255 }),
	site_id: varchar("site_id", { length: 255 }),
	tagid: varchar({ length: 255 }),
	created_at: datetime("created_at", { mode: 'string'}),
	expired_at: datetime("expired_at", { mode: 'string'}),
},
(table) => [
	primaryKey({ columns: [table.id], name: "agrigistics_token_id"}),
]);

export const attendance = mysqlTable("attendance", {
	attendance_id: int("attendance_id", { unsigned: true }).autoincrement().notNull(),
	employee_pin: varchar("employee_pin", { length: 255 }),
	employee_id: int("employee_id").default(0).notNull(),
	reader_id: int("reader_id").default(0).notNull(),
	attendance_site_id: int("attendance_site_id").default(0).notNull(),
	clock: datetime({ mode: 'string'}),
	mode: smallint(),
	status: varchar({ length: 3 }).default('').notNull(),
	work: varchar({ length: 8 }).default('').notNull(),
	job: varchar({ length: 8 }).default('').notNull(),
	downloaded: mysqlEnum(['Yes','No']).default('No').notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	is_remove: mysqlEnum("is_remove", ['Yes','No']).default('No'),
	mask: int().default(0).notNull(),
	temperature: decimal({ precision: 15, scale: 2 }).default('0.00').notNull(),
	sent: mysqlEnum(['Yes','No']).default('No').notNull(),
	sent_to_easyroster: mysqlEnum("sent_to_easyroster", ['Yes','No']).default('No').notNull(),
	sent_to_eduman: mysqlEnum("sent_to_eduman", ['Yes','No']).default('No').notNull(),
	clock_gps: varchar("clock_gps", { length: 50 }),
	clock_photo: text("clock_photo"),
	site_activity_code: text("site_activity_code"),
},
(table) => [
	index("employee_id").on(table.employee_id),
	index("reader_id").on(table.reader_id),
	index("employee_pin").on(table.employee_pin),
	primaryKey({ columns: [table.attendance_id], name: "attendance_attendance_id"}),
]);

export const attendance_archive_2023 = mysqlTable("attendance_archive_2023", {
	attendance_id: int("attendance_id", { unsigned: true }).autoincrement().notNull(),
	employee_pin: varchar("employee_pin", { length: 255 }),
	employee_id: int("employee_id").default(0).notNull(),
	reader_id: int("reader_id").default(0).notNull(),
	clock: datetime({ mode: 'string'}),
	mode: smallint(),
	status: varchar({ length: 3 }).default('').notNull(),
	work: varchar({ length: 3 }).default('').notNull(),
	job: varchar({ length: 3 }).default('').notNull(),
	downloaded: mysqlEnum(['Yes','No']).default('No').notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	is_remove: mysqlEnum("is_remove", ['Yes','No']).default('No'),
	mask: int().default(0).notNull(),
	temperature: decimal({ precision: 15, scale: 2 }).default('0.00').notNull(),
	sent: mysqlEnum(['Yes','No']).default('No').notNull(),
	sent_to_easyroster: mysqlEnum("sent_to_easyroster", ['Yes','No']).default('No').notNull(),
	sent_to_eduman: mysqlEnum("sent_to_eduman", ['Yes','No']).default('No').notNull(),
	clock_gps: varchar("clock_gps", { length: 50 }),
	clock_photo: mediumtext("clock_photo"),
},
(table) => [
	index("employee_id").on(table.employee_id),
	index("reader_id").on(table.reader_id),
	index("employee_pin").on(table.employee_pin),
	primaryKey({ columns: [table.attendance_id], name: "attendance_archive_2023_attendance_id"}),
]);

export const attendance_extras = mysqlTable("attendance_extras", {
	attendance_id: int("attendance_id", { unsigned: true }).autoincrement().notNull(),
	employee_pin: varchar("employee_pin", { length: 255 }),
	employee_id: int("employee_id").default(0).notNull(),
	reader_id: int("reader_id").default(0).notNull(),
	clock: datetime({ mode: 'string'}),
	mode: smallint(),
	status: varchar({ length: 3 }).default('').notNull(),
	work: varchar({ length: 3 }).default('').notNull(),
	job: varchar({ length: 3 }).default('').notNull(),
	downloaded: mysqlEnum(['Yes','No']).default('No').notNull(),
	extra1: varchar({ length: 3 }).default('').notNull(),
	extra2: varchar({ length: 3 }).default('').notNull(),
},
(table) => [
	index("employee_id").on(table.employee_id),
	index("reader_id").on(table.reader_id),
	index("employee_pin").on(table.employee_pin),
	primaryKey({ columns: [table.attendance_id], name: "attendance_extras_attendance_id"}),
]);

export const attendance_march_archive_2024 = mysqlTable("attendance_march_archive_2024", {
	attendance_id: int("attendance_id", { unsigned: true }).autoincrement().notNull(),
	employee_pin: varchar("employee_pin", { length: 255 }),
	employee_id: int("employee_id").default(0).notNull(),
	reader_id: int("reader_id").default(0).notNull(),
	clock: datetime({ mode: 'string'}),
	mode: smallint(),
	status: varchar({ length: 3 }).default('').notNull(),
	work: varchar({ length: 8 }).default('').notNull(),
	job: varchar({ length: 3 }).default('').notNull(),
	downloaded: mysqlEnum(['Yes','No']).default('No').notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
	is_remove: mysqlEnum("is_remove", ['Yes','No']).default('No'),
	mask: int().default(0).notNull(),
	temperature: decimal({ precision: 15, scale: 2 }).default('0.00').notNull(),
	sent: mysqlEnum(['Yes','No']).default('No').notNull(),
	sent_to_easyroster: mysqlEnum("sent_to_easyroster", ['Yes','No']).default('No').notNull(),
	sent_to_eduman: mysqlEnum("sent_to_eduman", ['Yes','No']).default('No').notNull(),
	clock_gps: varchar("clock_gps", { length: 50 }),
	clock_photo: mediumtext("clock_photo"),
},
(table) => [
	index("employee_id").on(table.employee_id),
	index("reader_id").on(table.reader_id),
	index("employee_pin").on(table.employee_pin),
	primaryKey({ columns: [table.attendance_id], name: "attendance_march_archive_2024_attendance_id"}),
]);

export const category = mysqlTable("category", {
	category_id: int("category_id", { unsigned: true }).autoincrement().notNull(),
	category_name: varchar("category_name", { length: 255 }).notNull(),
	show_for_visitors: mysqlEnum("show_for_visitors", ['Yes','No']).default('No').notNull(),
	site_id: int("site_id").notNull(),
	created_at: datetime("created_at", { mode: 'string'}),
	updated_at: datetime("updated_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.category_id], name: "category_category_id"}),
]);

export const deleted_employee = mysqlTable("deleted_employee", {
	employee_id: int("employee_id").autoincrement().notNull(),
	pin: varchar({ length: 12 }),
	name: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 12 }),
	upgrade: tinyint().default(1),
	priv: tinyint().default(0).notNull(),
	card: varchar({ length: 12 }).default('').notNull(),
	site_id: int("site_id").default(0).notNull(),
	status: mysqlEnum(['Active','Inactive']).default('Active').notNull(),
	category_id: int("category_id").default(0),
	sub_category_id: int("sub_category_id").default(0),
	address: varchar({ length: 255 }),
	phone: varchar({ length: 50 }),
	vehicle_reg_no: varchar("vehicle_reg_no", { length: 255 }),
	id_no: varchar("id_no", { length: 255 }),
	permanent_user: mysqlEnum("permanent_user", ['Yes','No']).default('No'),
	username: varchar({ length: 255 }),
	access_code_generator: mysqlEnum("access_code_generator", ['Enable','Disable']).default('Disable'),
	employee_code: varchar("employee_code", { length: 255 }).notNull(),
	alias_employee: varchar("alias_employee", { length: 255 }).notNull(),
	nif_dni: varchar("nif_dni", { length: 255 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_birth: date("date_birth", { mode: 'string' }).notNull(),
	picture: varchar({ length: 255 }).notNull(),
	town: varchar({ length: 255 }).notNull(),
	postal_code: varchar("postal_code", { length: 255 }).notNull(),
	area: varchar({ length: 255 }).notNull(),
	telephone_number: varchar("telephone_number", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	mobile_number: varchar("mobile_number", { length: 255 }).notNull(),
	work_center_id: int("work_center_id").notNull(),
	notes: varchar({ length: 255 }).notNull(),
	property_number: varchar("property_number", { length: 255 }),
	access_group: int("access_group").notNull(),
	visit_multi_times: mysqlEnum("visit_multi_times", ['Yes','No']).default('No'),
},
(table) => [
	index("site_id").on(table.site_id),
	primaryKey({ columns: [table.employee_id], name: "deleted_employee_employee_id"}),
]);

export const department = mysqlTable("department", {
	department_id: int("department_id", { unsigned: true }).autoincrement().notNull(),
	name: varchar({ length: 35 }).default('').notNull(),
	site_id: int("site_id").default(0).notNull(),
},
(table) => [
	index("site_id").on(table.site_id),
	primaryKey({ columns: [table.department_id], name: "department_department_id"}),
]);

export const employee = mysqlTable("employee", {
	employee_id: int("employee_id", { unsigned: true }).autoincrement().notNull(),
	agrigistics_employee_id: varchar("agrigistics_employee_id", { length: 255 }).default('null'),
	pin: varchar({ length: 25 }).default('').notNull(),
	name: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 12 }).default(''),
	upgrade: tinyint().default(1),
	priv: tinyint().default(0).notNull(),
	card: varchar({ length: 14 }).default('').notNull(),
	agri_card: int("agri_card").default(0),
	site_id: int("site_id").default(0).notNull(),
	status: mysqlEnum(['Active','Inactive']).default('Active').notNull(),
	category_id: int("category_id").default(0),
	sub_category_id: int("sub_category_id").default(0),
	address: varchar({ length: 255 }),
	phone: varchar({ length: 50 }),
	vehicle_reg_no: varchar("vehicle_reg_no", { length: 255 }),
	id_no: varchar("id_no", { length: 255 }),
	permanent_user: mysqlEnum("permanent_user", ['Yes','No']).default('No'),
	mobile: mysqlEnum(['Yes','No']).default('No').notNull(),
	username: varchar({ length: 255 }),
	access_code_generator: mysqlEnum("access_code_generator", ['Enable','Disable']).default('Disable'),
	employee_code: varchar("employee_code", { length: 255 }).notNull(),
	alias_employee: varchar("alias_employee", { length: 255 }).notNull(),
	nif_dni: varchar("nif_dni", { length: 255 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_birth: date("date_birth", { mode: 'string' }),
	picture: varchar({ length: 255 }).notNull(),
	town: varchar({ length: 255 }).notNull(),
	postal_code: varchar("postal_code", { length: 255 }).notNull(),
	area: varchar({ length: 255 }).notNull(),
	telephone_number: varchar("telephone_number", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	mobile_number: varchar("mobile_number", { length: 255 }).notNull(),
	work_center_id: int("work_center_id").notNull(),
	notes: varchar({ length: 255 }).notNull(),
	property_number: varchar("property_number", { length: 255 }),
	access_group: int("access_group"),
	is_antipass: mysqlEnum("is_antipass", ['Yes','No']).default('No'),
	visit_multi_times: mysqlEnum("visit_multi_times", ['Yes','No']).default('No'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	start_date: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	end_date: date("end_date", { mode: 'string' }),
	emp_permission: varchar("emp_permission", { length: 6 }),
	emp_type: varchar("emp_type", { length: 100 }).default('1'),
	emp_m_address: text("emp_m_address"),
	ignore_move_copy: mysqlEnum("ignore_move_copy", ['Yes','No']).default('No').notNull(),
},
(table) => [
	index("site_id").on(table.site_id),
	index("pin").on(table.pin),
	primaryKey({ columns: [table.employee_id], name: "employee_employee_id"}),
]);

export const employee_20230315 = mysqlTable("employee_20230315", {
	employee_id: int("employee_id", { unsigned: true }).autoincrement().notNull(),
	pin: varchar({ length: 17 }).default('').notNull(),
	name: varchar({ length: 50 }).notNull(),
	password: varchar({ length: 12 }).default(''),
	upgrade: tinyint().default(1),
	priv: tinyint().default(0).notNull(),
	card: varchar({ length: 14 }).default('').notNull(),
	site_id: int("site_id").default(0).notNull(),
	status: mysqlEnum(['Active','Inactive']).default('Active').notNull(),
	category_id: int("category_id").default(0),
	sub_category_id: int("sub_category_id").default(0),
	address: varchar({ length: 255 }),
	phone: varchar({ length: 50 }),
	vehicle_reg_no: varchar("vehicle_reg_no", { length: 255 }),
	id_no: varchar("id_no", { length: 255 }),
	permanent_user: mysqlEnum("permanent_user", ['Yes','No']).default('No'),
	username: varchar({ length: 255 }),
	access_code_generator: mysqlEnum("access_code_generator", ['Enable','Disable']).default('Disable'),
	employee_code: varchar("employee_code", { length: 255 }).notNull(),
	alias_employee: varchar("alias_employee", { length: 255 }).notNull(),
	nif_dni: varchar("nif_dni", { length: 255 }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_birth: date("date_birth", { mode: 'string' }),
	picture: varchar({ length: 255 }).notNull(),
	town: varchar({ length: 255 }).notNull(),
	postal_code: varchar("postal_code", { length: 255 }).notNull(),
	area: varchar({ length: 255 }).notNull(),
	telephone_number: varchar("telephone_number", { length: 255 }).notNull(),
	email: varchar({ length: 255 }).notNull(),
	mobile_number: varchar("mobile_number", { length: 255 }).notNull(),
	work_center_id: int("work_center_id").notNull(),
	notes: varchar({ length: 255 }).notNull(),
	property_number: varchar("property_number", { length: 255 }),
	access_group: int("access_group"),
	is_antipass: mysqlEnum("is_antipass", ['Yes','No']).default('No'),
	visit_multi_times: mysqlEnum("visit_multi_times", ['Yes','No']).default('No'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	start_date: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	end_date: date("end_date", { mode: 'string' }),
	emp_permission: varchar("emp_permission", { length: 6 }),
},
(table) => [
	index("site_id").on(table.site_id),
	primaryKey({ columns: [table.employee_id], name: "employee_20230315_employee_id"}),
]);

export const employee_backup = mysqlTable("employee_backup", {
	employee_id: int("employee_id", { unsigned: true }).autoincrement().notNull(),
	agrigistics_employee_id: varchar("agrigistics_employee_id", { length: 255 }).default('null'),
	pin: varchar({ length: 25 }).default('').notNull(),
	name: varchar({ length: 50 }).default('').notNull(),
	password: varchar({ length: 12 }).default(''),
	upgrade: tinyint().default(1),
	priv: tinyint().default(0).notNull(),
	card: varchar({ length: 14 }).default('').notNull(),
	site_id: int("site_id").default(0).notNull(),
	status: mysqlEnum(['Active','Inactive']).default('Active').notNull(),
	category_id: int("category_id").default(0),
	sub_category_id: int("sub_category_id").default(0),
	address: varchar({ length: 255 }),
	phone: varchar({ length: 50 }),
	vehicle_reg_no: varchar("vehicle_reg_no", { length: 255 }),
	id_no: varchar("id_no", { length: 255 }),
	permanent_user: mysqlEnum("permanent_user", ['Yes','No']).default('No'),
	username: varchar({ length: 255 }),
	access_code_generator: mysqlEnum("access_code_generator", ['Enable','Disable']).default('Disable'),
	employee_code: varchar("employee_code", { length: 255 }).default('').notNull(),
	alias_employee: varchar("alias_employee", { length: 255 }).default('').notNull(),
	nif_dni: varchar("nif_dni", { length: 255 }).default('').notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	date_birth: date("date_birth", { mode: 'string' }),
	picture: varchar({ length: 255 }).default('').notNull(),
	town: varchar({ length: 255 }).default('').notNull(),
	postal_code: varchar("postal_code", { length: 255 }).default('').notNull(),
	area: varchar({ length: 255 }).default('').notNull(),
	telephone_number: varchar("telephone_number", { length: 255 }).default('').notNull(),
	email: varchar({ length: 255 }).default('').notNull(),
	mobile_number: varchar("mobile_number", { length: 255 }).default('').notNull(),
	work_center_id: int("work_center_id"),
	notes: varchar({ length: 255 }).default('').notNull(),
	property_number: varchar("property_number", { length: 255 }),
	access_group: int("access_group"),
	is_antipass: mysqlEnum("is_antipass", ['Yes','No']).default('No'),
	visit_multi_times: mysqlEnum("visit_multi_times", ['Yes','No']).default('No'),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	start_date: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	end_date: date("end_date", { mode: 'string' }),
	emp_permission: varchar("emp_permission", { length: 6 }),
	// dataForTheTable `employee` 
	data_for_the_table_employee: varchar("/*Data for the table `employee` */", { length: 50 }),
	column1: varchar("Column1", { length: 50 }),
},
(table) => [
	index("site_id").on(table.site_id),
	primaryKey({ columns: [table.employee_id], name: "employee_backup_employee_id"}),
]);

export const employee_bio = mysqlTable("employee_bio", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	employee_id: int("employee_id").default(0).notNull(),
	no: int().default(0).notNull(),
	index: int().default(0).notNull(),
	valid: int().default(0).notNull(),
	duress: int().default(0).notNull(),
	type: int().default(0).notNull(),
	majorver: int().default(0).notNull(),
	minorver: int().default(0).notNull(),
	format: int().default(0).notNull(),
	data: longtext(),
	source_no: mysqlEnum("source_no", ['Yes','No']).default('No'),
},
(table) => [
	index("employee_id_2").on(table.employee_id),
	primaryKey({ columns: [table.id], name: "employee_bio_id"}),
	unique("employee_id").on(table.employee_id, table.no, table.index, table.type),
]);

export const employee_bio_pic = mysqlTable("employee_bio_pic", {
	id: int().autoincrement().notNull(),
	employee_id: int("employee_id").notNull(),
	file_name: varchar("file_name", { length: 255 }),
	type: int().notNull(),
	size: varchar({ length: 255 }),
	content: longtext(),
	source_fp: mysqlEnum("source_fp", ['Yes','No']).default('No'),
},
(table) => [
	primaryKey({ columns: [table.id], name: "employee_bio_pic_id"}),
]);

export const employee_biodata_face = mysqlTable("employee_biodata_face", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	employee_id: int("employee_id").default(0).notNull(),
	no: int().default(0).notNull(),
	index: int().default(0).notNull(),
	valid: int().default(0).notNull(),
	duress: int().default(0).notNull(),
	type: int().default(0).notNull(),
	majorver: int().default(0).notNull(),
	minorver: int().default(0).notNull(),
	format: int().default(0).notNull(),
	data: longtext(),
	source_no: mysqlEnum("source_no", ['Yes','No']).default('No'),
},
(table) => [
	index("employee_id_2").on(table.employee_id),
	primaryKey({ columns: [table.id], name: "employee_biodata_face_id"}),
	unique("employee_id").on(table.employee_id, table.no, table.index, table.type),
]);

export const employee_block = mysqlTable("employee_block", {
	blockid: int().autoincrement().notNull(),
	employee_id: int("employee_id", { unsigned: true }).notNull().references(() => employee.employee_id),
	reader_id: int("reader_id", { unsigned: true }).notNull(),
	access_group: int("access_group").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	index("employee_id").on(table.employee_id),
	primaryKey({ columns: [table.blockid], name: "employee_block_blockid"}),
]);

export const employee_face = mysqlTable("employee_face", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	employee_id: int("employee_id").default(0).notNull(),
	fid: int().default(0).notNull(),
	data: text(),
	upgrade: tinyint().default(1),
	readertype: char({ length: 1 }).default('0').notNull(),
	source_fp: mysqlEnum("source_fp", ['Yes','No']).default('No'),
},
(table) => [
	index("employee_id_2").on(table.employee_id),
	primaryKey({ columns: [table.id], name: "employee_face_id"}),
	unique("employee_id").on(table.employee_id, table.fid),
]);

export const employee_finger_data = mysqlTable("employee_finger_data", {
	id: int().autoincrement().notNull(),
	employee_id: int("employee_id").notNull(),
	finger_number: int("finger_number").notNull(),
	finger_template: longtext("finger_template").notNull(),
	registered_at: datetime("registered_at", { mode: 'string'}).notNull(),
	employee_pin: varchar("employee_pin", { length: 20 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "employee_finger_data_id"}),
	unique("composit_key_emp_finger").on(table.employee_id, table.finger_number),
]);

export const employee_fp = mysqlTable("employee_fp", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	employee_id: int("employee_id"),
	fid: int(),
	data: text(),
	upgrade: tinyint().default(1),
	readertype: char({ length: 1 }).default('0').notNull(),
	source_fp: mysqlEnum("source_fp", ['Yes','No']).default('No'),
	no: varchar({ length: 20 }),
	index: varchar({ length: 20 }),
	valid: varchar({ length: 20 }),
	duress: varchar({ length: 20 }),
	type: varchar({ length: 20 }),
	major_ver: varchar("major_ver", { length: 20 }),
	minor_ver: varchar("minor_ver", { length: 20 }),
	format: varchar({ length: 20 }),
	horus_device: mysqlEnum("horus_device", ['Yes','No']).default('No'),
},
(table) => [
	index("employee_id").on(table.employee_id),
	primaryKey({ columns: [table.id], name: "employee_fp_id"}),
]);

export const employee_mobile_face = mysqlTable("employee_mobile_face", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	employee_id: int("employee_id").notNull(),
	face_id: varchar("face_id", { length: 255 }).notNull(),
	face_data: longtext("face_data").notNull(),
	template: longtext().notNull(),
	site_id: int("site_id").notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).default('0000-00-00 00:00:00').onUpdateNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "employee_mobile_face_id"}),
]);

export const employee_pic = mysqlTable("employee_pic", {
	id: int().autoincrement().notNull(),
	employee_id: int("employee_id").notNull(),
	file_name: varchar("file_name", { length: 255 }),
	size: varchar({ length: 255 }),
	// Warning: Can't parse blob from database
	// blobType: blob("content"),
	source_fp: mysqlEnum("source_fp", ['Yes','No']).default('No'),
},
(table) => [
	primaryKey({ columns: [table.id], name: "employee_pic_id"}),
]);

export const employee_reader_trans = mysqlTable("employee_reader_trans", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	employee_id: int("employee_id").default(0).notNull(),
	reader_id: int("reader_id").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	index("employee_id").on(table.employee_id),
	index("reader_id").on(table.reader_id),
	primaryKey({ columns: [table.id], name: "employee_reader_trans_id"}),
]);

export const employee_reader_trans_backup = mysqlTable("employee_reader_trans_backup", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	employee_id: int("employee_id").default(0).notNull(),
	reader_id: int("reader_id").default(0).notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	index("employee_id").on(table.employee_id),
	index("reader_id").on(table.reader_id),
	primaryKey({ columns: [table.id], name: "employee_reader_trans_backup_id"}),
]);

export const exit_reader_trans = mysqlTable("exit_reader_trans", {
	exit_reader_id: int("exit_reader_id", { unsigned: true }).autoincrement().notNull(),
	reader_access_groups_id: int("reader_access_groups_id").default(0).notNull(),
	exit_reader: varchar("exit_reader", { length: 255 }),
	site_id: int("site_id"),
	order_id: int("order_id"),
},
(table) => [
	primaryKey({ columns: [table.exit_reader_id], name: "exit_reader_trans_exit_reader_id"}),
]);

export const galager = mysqlTable("galager", {
	id: int("Id").autoincrement().notNull(),
	card_number: varchar("CardNumber", { length: 9 }),
	first_name: varchar("FirstName", { length: 45 }),
	last_name: varchar("LastName", { length: 45 }),
	reader_name: varchar("ReaderName", { length: 45 }),
	reader_sn: varchar("ReaderSN", { length: 10 }),
	reader_direction: varchar("ReaderDirection", { length: 1 }),
	occurence_time: datetime("OccurenceTime", { mode: 'string'}),
	upload_time: datetime("UploadTime", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
	downloaded: tinyint("Downloaded").default(0).notNull(),
	site_id: int("SiteId"),
	event_id: bigint("EventId", { mode: "number" }).notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "galager_Id"}),
]);

export const in_reader_trans = mysqlTable("in_reader_trans", {
	in_reader_id: int("in_reader_id", { unsigned: true }).autoincrement().notNull(),
	reader_access_groups_id: int("reader_access_groups_id").default(0).notNull(),
	in_reader: varchar("in_reader", { length: 255 }),
	site_id: int("site_id"),
	order_id: int("order_id"),
},
(table) => [
	primaryKey({ columns: [table.in_reader_id], name: "in_reader_trans_in_reader_id"}),
]);

export const mobile_data = mysqlTable("mobile_data", {
	id: int().autoincrement().notNull(),
	visitors_access_code_id: int("visitors_access_code_id").notNull(),
	access_group_id: int("access_group_id"),
	qrcode: text(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "mobile_data_id"}),
]);

export const mobile_site_activity_code = mysqlTable("mobile_site_activity_code", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	desc: varchar({ length: 255 }).notNull(),
	site_id: int("site_id").notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "mobile_site_activity_code_id"}),
]);

export const mobile_site_code = mysqlTable("mobile_site_code", {
	id: int().autoincrement().notNull(),
	name: varchar({ length: 255 }).notNull(),
	desc: varchar({ length: 100 }),
	site_id: int("site_id").notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "mobile_site_code_id"}),
]);

export const multisite_reader_trans = mysqlTable("multisite_reader_trans", {
	id: int().autoincrement().notNull(),
	reader_id: int("reader_id").notNull(),
	site_id: int("site_id").notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "multisite_reader_trans_id"}),
]);

export const out_reader_trans = mysqlTable("out_reader_trans", {
	out_reader_id: int("out_reader_id", { unsigned: true }).autoincrement().notNull(),
	reader_access_groups_id: int("reader_access_groups_id").default(0).notNull(),
	out_reader: varchar("out_reader", { length: 255 }),
	site_id: int("site_id"),
	order_id: int("order_id"),
},
(table) => [
	primaryKey({ columns: [table.out_reader_id], name: "out_reader_trans_out_reader_id"}),
]);

export const personel = mysqlTable("personel", {
	personel_id: int("personel_id").autoincrement().notNull(),
	name: varchar({ length: 64 }).default('').notNull(),
	pin: varchar({ length: 16 }).default('').notNull(),
	depidxs: varchar({ length: 2048 }).default('').notNull(),
	permlevel: int().default(0).notNull(),
	site_id: int("site_id").default(0).notNull(),
},
(table) => [
	index("site_id").on(table.site_id),
	primaryKey({ columns: [table.personel_id], name: "personel_personel_id"}),
]);

export const preferences = mysqlTable("preferences", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	server_ip: varchar("server_ip", { length: 20 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	expiry_date: date("expiry_date", { mode: 'string' }),
	offline_timeout: int("offline_timeout"),
	license_key: varchar("license_key", { length: 255 }),
	password: varchar({ length: 255 }).notNull(),
	old_password: varchar("old_password", { length: 255 }),
	auto_refresh_time: int("auto_refresh_time"),
	command_max_capacity: decimal("command_max_capacity", { precision: 10, scale: 1 }),
	command_max_number: int("command_max_number"),
	timed_access_duration: decimal("timed_access_duration", { precision: 10, scale: 2 }),
	one_time_access_duration: decimal("one_time_access_duration", { precision: 10, scale: 2 }),
	sms_provider: varchar("sms_provider", { length: 25 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "preferences_id"}),
]);

export const reader = mysqlTable("reader", {
	reader_id: int("reader_id", { unsigned: true }).autoincrement().notNull(),
	sn: varchar({ length: 20 }),
	name: varchar({ length: 64 }).default('').notNull(),
	department_id: int("department_id").default(0).notNull(),
	mobile: mysqlEnum(['Yes','No']).default('No').notNull(),
	profile_id: int("profile_id").default(0),
	site_id: int("site_id").default(0).notNull(),
	stamp: bigint({ mode: "number" }),
	delay: int().default(120),
	ttimes: varchar({ length: 64 }).default('00:00;14:00'),
	transmission_interval: int("transmission_interval").default(1),
	opstamp: bigint({ mode: "number" }),
	seen: timestamp({ mode: 'string' }),
	uistamp: bigint({ mode: "number" }).notNull(),
	fpstamp: bigint({ mode: "number" }).notNull(),
	fpsource: mysqlEnum(['Yes','No']).default('No').notNull(),
	facestamp: bigint({ mode: "number" }).notNull(),
	biodatastamp: bigint({ mode: "number" }).notNull(),
	temp: tinyint().default(0).notNull(),
	lat: double().notNull(),
	lon: double().notNull(),
	online: tinyint().default(0).notNull(),
	zone: char({ length: 1 }).default('').notNull(),
	type: char({ length: 1 }).default('0').notNull(),
	password_exempted: mysqlEnum("password_exempted", ['Yes','No']).default('No'),
	order_id: int("order_id").default(0).notNull(),
	sync_att: mysqlEnum("sync_att", ['Yes','No']).default('No'),
	bioface_device: mysqlEnum("bioface_device", ['Yes','No']).default('No'),
	enable_biodata_face: mysqlEnum("enable_biodata_face", ['Yes','No']).default('No'),
	transflag: varchar({ length: 255 }).default('1101101110'),
	reader_in_out_status: mysqlEnum("reader_in_out_status", ['','I','O']).default('').notNull(),
	cellphone: varchar({ length: 255 }).notNull(),
	apply_new_option: mysqlEnum("apply_new_option", ['Yes','No']).default('No'),
	multisite_reader: mysqlEnum("multisite_reader", ['Yes','No']).default('No').notNull(),
	share_clockings: mysqlEnum("share_clockings", ['Yes','No']).default('No').notNull(),
	send_to_agrigistics: mysqlEnum("send_to_agrigistics", ['Yes','No']).default('No').notNull(),
	horus_device: mysqlEnum("horus_device", ['Yes','No']).default('No').notNull(),
	override_work_code: bigint("override_work_code", { mode: "number" }),
	e1_horus_device: mysqlEnum("e1_horus_device", ['Yes','No']).default('No'),
},
(table) => [
	index("site_id").on(table.site_id),
	index("sn").on(table.sn),
	index("department_id").on(table.department_id),
	primaryKey({ columns: [table.reader_id], name: "reader_reader_id"}),
]);

export const reader_access_groups = mysqlTable("reader_access_groups", {
	reader_access_groups_id: int("reader_access_groups_id", { unsigned: true }).autoincrement().notNull(),
	code_id: varchar("code_id", { length: 255 }).notNull(),
	description: varchar({ length: 255 }).notNull(),
	site_id: int("site_id").default(0).notNull(),
	group_verify_type: int("group_verify_type").notNull(),
	is_antipass: mysqlEnum("is_antipass", ['Yes','No']).default('No').notNull(),
	created_at: datetime("created_at", { mode: 'string'}),
	updated_at: datetime("updated_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.reader_access_groups_id], name: "reader_access_groups_reader_access_groups_id"}),
]);

export const reader_command = mysqlTable("reader_command", {
	command_id: int("command_id", { unsigned: true }).autoincrement().notNull(),
	cmd_id: int("cmd_id"),
	reader_id: int("reader_id").default(0).notNull(),
	command: longtext(),
	status: mysqlEnum(['Active','Inactive']).default('Inactive').notNull(),
	sourceinfo: varchar({ length: 255 }),
	ip_address: varchar("ip_address", { length: 30 }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	index("reader_id").on(table.reader_id),
	index("command").on(table.command),
	primaryKey({ columns: [table.command_id], name: "reader_command_command_id"}),
]);

export const reader_command_capacity_profile = mysqlTable("reader_command_capacity_profile", {
	profile_id: int("profile_id").autoincrement().notNull(),
	profile_name: varchar("profile_name", { length: 255 }).notNull(),
	command_max_capacity: decimal("command_max_capacity", { precision: 10, scale: 1 }).notNull(),
	command_max_number: int("command_max_number").notNull(),
},
(table) => [
	primaryKey({ columns: [table.profile_id], name: "reader_command_capacity_profile_profile_id"}),
]);

export const reader_command_copy = mysqlTable("reader_command_copy", {
	command_id: int("command_id", { unsigned: true }).autoincrement().notNull(),
	cmd_id: int("cmd_id"),
	reader_id: int("reader_id").default(0).notNull(),
	command: text(),
	status: mysqlEnum(['Active','Inactive']).default('Inactive').notNull(),
	sourceinfo: varchar({ length: 255 }),
	ip_address: varchar("ip_address", { length: 30 }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	index("reader_id").on(table.reader_id),
	primaryKey({ columns: [table.command_id], name: "reader_command_copy_command_id"}),
]);

export const reader_command_history = mysqlTable("reader_command_history", {
	history_id: int("history_id", { unsigned: true }).autoincrement().notNull(),
	command_id: int("command_id").default(0).notNull(),
	cmd_id: int("cmd_id"),
	reader_id: int("reader_id").default(0).notNull(),
	command: longtext(),
	sourceinfo: varchar({ length: 255 }),
	ip_address: varchar("ip_address", { length: 30 }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.history_id], name: "reader_command_history_history_id"}),
]);

export const reader_command_history_unsuccessful = mysqlTable("reader_command_history_unsuccessful", {
	history_id: int("history_id", { unsigned: true }).autoincrement().notNull(),
	command_id: int("command_id").default(0).notNull(),
	cmd_id: int("cmd_id"),
	reader_id: int("reader_id").default(0).notNull(),
	command: longtext(),
	sourceinfo: varchar({ length: 255 }),
	ip_address: varchar("ip_address", { length: 30 }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	index("reader_id").on(table.reader_id),
	primaryKey({ columns: [table.history_id], name: "reader_command_history_unsuccessful_history_id"}),
]);

export const readerCommandHistoryUnsuccessful_x = mysqlTable("reader_command_history_unsuccessful)x", {
	history_id: int("history_id", { unsigned: true }).autoincrement().notNull(),
	command_id: int("command_id").default(0).notNull(),
	cmd_id: int("cmd_id"),
	reader_id: int("reader_id").default(0).notNull(),
	command: text(),
	sourceinfo: varchar({ length: 255 }),
	ip_address: varchar("ip_address", { length: 30 }),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow().notNull(),
},
(table) => [
	primaryKey({ columns: [table.history_id], name: "reader_command_history_unsuccessful)x_history_id"}),
]);

export const reader_command_library = mysqlTable("reader_command_library", {
	command_id: int("command_id").autoincrement().notNull(),
	command: varchar({ length: 255 }).notNull(),
	command_description: text("command_description").notNull(),
},
(table) => [
	primaryKey({ columns: [table.command_id], name: "reader_command_library_command_id"}),
]);

export const readers_galager = mysqlTable("readers_galager", {
	id: int("Id").autoincrement().notNull(),
	reader_id: varchar("ReaderId", { length: 45 }).notNull(),
	reader_name: varchar("ReaderName", { length: 45 }),
	site_id: int("SiteId").notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "readers_galager_Id"}),
]);

export const serial_number = mysqlTable("serial_number", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	site_id: int("site_id"),
	reader_id: int("reader_id"),
	serial_number: varchar("serial_number", { length: 255 }).notNull(),
	occupied: mysqlEnum(['Yes','No']).default('No').notNull(),
	created_at: timestamp("created_at", { mode: 'string' }).defaultNow(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "serial_number_id"}),
]);

export const share_multisiteclocking = mysqlTable("share_multisiteclocking", {
	id: int().autoincrement().notNull(),
	reader_id: int("reader_id").notNull(),
	site_id: int("site_id").notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "share_multisiteclocking_id"}),
]);

export const site = mysqlTable("site", {
	site_id: int("site_id", { unsigned: true }).autoincrement().notNull(),
	site_code: varchar("site_code", { length: 255 }).default('').notNull(),
	name: varchar({ length: 255 }).default('').notNull(),
	contact: varchar({ length: 255 }).default('').notNull(),
	notes: mediumtext(),
	auto_remove_emp: mysqlEnum("auto_remove_emp", ['Yes','No']).default('No'),
	site_password: varchar("site_password", { length: 20 }),
	agrigistics_site: mysqlEnum("agrigistics_site", ['Yes','No']).default('No').notNull(),
	pull_employees: mysqlEnum("pull_employees", ['Yes','No']).default('No').notNull(),
	send_attendance: mysqlEnum("send_attendance", ['Yes','No']).default('No').notNull(),
	easyroster: mysqlEnum(['Yes','No']).default('No').notNull(),
	easyroster_token: text("easyroster_token"),
	eduman: mysqlEnum(['Yes','No']).default('No').notNull(),
	send_agrigistics_gps: mysqlEnum("send_agrigistics_gps", ['Yes','No']).default('No').notNull(),
},
(table) => [
	primaryKey({ columns: [table.site_id], name: "site_site_id"}),
]);

export const site_trans = mysqlTable("site_trans", {
	id: int({ unsigned: true }).autoincrement().notNull(),
	site_id: int("site_id").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	license_validity: date("license_validity", { mode: 'string' }),
	data_format: text("data_format").notNull(),
	data_format_other: text("data_format_other"),
	license_key: varchar("license_key", { length: 50 }).default('').notNull(),
	server_ip: varchar("server_ip", { length: 15 }).default('107.170.15.81').notNull(),
	server_port: int("server_port").default(80).notNull(),
	swver: varchar({ length: 35 }).default('').notNull(),
	status: mysqlEnum(['Enabled','Disabled']).default('Enabled').notNull(),
	access_user: mysqlEnum("access_user", ['Yes','No']).default('No').notNull(),
},
(table) => [
	index("site_id").on(table.site_id),
	primaryKey({ columns: [table.id], name: "site_trans_id"}),
]);

export const sms_template = mysqlTable("sms_template", {
	template_id: int("template_id").autoincrement().notNull(),
	title: varchar({ length: 50 }).notNull(),
	content: text().notNull(),
},
(table) => [
	primaryKey({ columns: [table.template_id], name: "sms_template_template_id"}),
]);

export const sub_category = mysqlTable("sub_category", {
	sub_category_id: int("sub_category_id", { unsigned: true }).autoincrement().notNull(),
	category_id: int("category_id").default(0).notNull(),
	sub_category_name: varchar("sub_category_name", { length: 255 }).notNull(),
	timed_access: mysqlEnum("timed_access", ['times duration access','normal timed access']).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	time_duration_access_start_date: date("time_duration_access_start_date", { mode: 'string' }).notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	time_duration_access_end_date: date("time_duration_access_end_date", { mode: 'string' }).notNull(),
	time_duration_access_end_time: time("time_duration_access_end_time").notNull(),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	normal_timed_access_start_date: date("normal_timed_access_start_date", { mode: 'string' }).notNull(),
	normal_timed_access_hours_duration: varchar("normal_timed_access_hours_duration", { length: 5 }).notNull(),
	normal_timed_access_min_duration: varchar("normal_timed_access_min_duration", { length: 5 }).notNull(),
	is_antipass: mysqlEnum("is_antipass", ['Yes','No']).default('No').notNull(),
	reader_access_groups_id: int("reader_access_groups_id").notNull(),
	max_clocking: int("max_clocking").notNull(),
	max_clocking_time: int("max_clocking_time").notNull(),
	site_id: int("site_id").notNull(),
	created_at: datetime("created_at", { mode: 'string'}),
	updated_at: datetime("updated_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`).notNull(),
},
(table) => [
	primaryKey({ columns: [table.sub_category_id], name: "sub_category_sub_category_id"}),
]);

export const time_expire = mysqlTable("time_expire", {
	id: int().autoincrement().notNull(),
	site_id: int("site_id").notNull(),
	expiry_time: int("expiry_time").notNull(),
},
(table) => [
	primaryKey({ columns: [table.id], name: "time_expire_id"}),
]);

export const time_manager_users = mysqlTable("time_manager_users", {
	user_id: int("user_id").autoincrement().notNull(),
	username: varchar({ length: 255 }).notNull(),
	password: varchar({ length: 255 }).notNull(),
	sites: json().notNull(),
	user_setting: text("user_setting"),
	status: varchar({ length: 50 }).notNull(),
	created_at: datetime("created_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
},
(table) => [
	primaryKey({ columns: [table.user_id], name: "time_manager_users_user_id"}),
]);

export const time_zone = mysqlTable("time_zone", {
	time_zone_id: int("time_zone_id").autoincrement().notNull(),
	time_zone_code: int("time_zone_code").notNull(),
	time_zone_name: varchar("time_zone_name", { length: 50 }).notNull(),
	site_id: int("site_id").notNull(),
	sunday_start_time: time("Sunday_start_time").notNull(),
	sunday_end_time: time("Sunday_end_time").notNull(),
	monday_start_time: time("Monday_start_time").notNull(),
	monday_end_time: time("Monday_end_time").notNull(),
	tuesday_start_time: time("Tuesday_start_time").notNull(),
	tuesday_end_time: time("Tuesday_end_time").notNull(),
	wednesday_start_time: time("Wednesday_start_time").notNull(),
	wednesday_end_time: time("Wednesday_end_time").notNull(),
	thursday_start_time: time("Thursday_start_time").notNull(),
	thursday_end_time: time("Thursday_end_time"),
	friday_start_time: time("Friday_start_time").notNull(),
	friday_end_time: time("Friday_end_time").notNull(),
	saturday_start_time: time("Saturday_start_time").notNull(),
	saturday_end_time: time("Saturday_end_time").notNull(),
	for_visitor: mysqlEnum("for_visitor", ['Yes','No']).default('No').notNull(),
	created_at: datetime("created_at", { mode: 'string'}).notNull(),
	updated_at: datetime("updated_at", { mode: 'string'}).notNull(),
},
(table) => [
	index("clocking_schedule_id").on(table.time_zone_code),
	primaryKey({ columns: [table.time_zone_id], name: "time_zone_time_zone_id"}),
]);

export const time_zone_trans = mysqlTable("time_zone_trans", {
	time_zone_trans_id: int("time_zone_trans_id").autoincrement().notNull(),
	reader_access_groups_id: int("reader_access_groups_id").notNull(),
	time_zone_id: int("time_zone_id").notNull(),
},
(table) => [
	primaryKey({ columns: [table.time_zone_trans_id], name: "time_zone_trans_time_zone_trans_id"}),
]);

export const visitors_access_code = mysqlTable("visitors_access_code", {
	access_code_id: int("access_code_id").autoincrement().notNull(),
	access_code: int("access_code").notNull(),
	visitors_name: varchar("visitors_name", { length: 50 }).notNull(),
	visitors_mobile_no: varchar("visitors_mobile_no", { length: 15 }).notNull(),
	visit_date: datetime("visit_date", { mode: 'string'}).notNull(),
	reader_id: int("reader_id").notNull(),
	site_id: int("site_id").notNull(),
	visit_multi_times: mysqlEnum("visit_multi_times", ['Yes','No']).default('No'),
	end_time: time("end_time"),
	min_duration: varchar("min_duration", { length: 10 }),
	category_id: int("category_id"),
	sub_category_id: int("sub_category_id"),
	hours_duration: varchar("hours_duration", { length: 10 }),
	access_hours_duration: varchar("access_hours_duration", { length: 10 }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	start_date: date("start_date", { mode: 'string' }),
	// you can use { mode: 'date' }, if you want to have Date as type for this column
	end_date: date("end_date", { mode: 'string' }),
	created_by: int("created_by").notNull(),
	created_at: datetime("created_at", { mode: 'string'}).notNull(),
	visitor_id_photo: text("visitor_id_photo"),
	visitor_number_plate_photo: text("visitor_number_plate_photo"),
	emp_m_v_address: text("emp_m_v_address"),
},
(table) => [
	primaryKey({ columns: [table.access_code_id], name: "visitors_access_code_access_code_id"}),
]);

export const work_center = mysqlTable("work_center", {
	work_center_id: int("work_center_id", { unsigned: true }).autoincrement().notNull(),
	work_center_code: int("work_center_code").notNull(),
	description: varchar({ length: 255 }).notNull(),
	created_at: datetime("created_at", { mode: 'string'}),
	updated_at: datetime("updated_at", { mode: 'string'}).default(sql`(CURRENT_TIMESTAMP)`),
},
(table) => [
	primaryKey({ columns: [table.work_center_id], name: "work_center_work_center_id"}),
]);

export const work_code = mysqlTable("work_code", {
	id: int().autoincrement().notNull(),
	work_code_id: varchar("work_code_id", { length: 255 }),
	name: varchar({ length: 255 }),
	code: varchar({ length: 255 }),
	site_id: varchar("site_id", { length: 255 }),
	employee_activity_category_id: varchar("employee_activity_category_id", { length: 255 }),
	measurement_unit: varchar("measurement_unit", { length: 255 }),
	calculated_unit: varchar("calculated_unit", { length: 255 }),
	unit_factor: varchar("unit_factor", { length: 255 }),
	inactive: varchar({ length: 5 }),
	packhouse: varchar({ length: 5 }),
},
(table) => [
	primaryKey({ columns: [table.id], name: "work_code_id"}),
]);

export const work_code_reader_trans = mysqlTable("work_code_reader_trans", {
	id: int().autoincrement().notNull(),
	work_code_id: int("work_code_id"),
	reader_id: int("reader_id"),
},
(table) => [
	primaryKey({ columns: [table.id], name: "work_code_reader_trans_id"}),
]);
