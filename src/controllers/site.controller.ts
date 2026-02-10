import type { FastifyReply, FastifyRequest } from "fastify";

import { asyncHandler } from "../utils/asyncHandler";
import { IPagination } from "../types/common.type";
import { db } from "../config/dbConnect";
import { admin, admin_site_trans, department, employee, site, site_trans } from "../db/schema";
import { desc, eq } from "drizzle-orm";
import { ISiteCreate } from "../types/site.type";

export const getSiteDetails = asyncHandler(
  async (
    req: FastifyRequest<{ Querystring: IPagination }>,
    res: FastifyReply,
  ) => {
    const { page, limit } = req.query;
    const admin_id_jwt = (req as any).admin?.id;

    const pageNum = parseInt(page as string, 10) || 1;
    const limitNum = parseInt(limit as string, 10) || 10;

    const data_admin_site = await db
      .select({ site })
      .from(admin)
      .leftJoin(site, eq(admin.site_id, site.site_id))
      .where(eq(admin.admin_id, admin_id_jwt));

    const data_admin_site_trans = await db
      .select({ site })
      .from(admin_site_trans)
      .leftJoin(site, eq(admin_site_trans.site_id, site.site_id))
      .where(eq(admin_site_trans.admin_id, admin_id_jwt));

      
    const all_sites: any[] = [...data_admin_site, ...data_admin_site_trans];
      
    const unique_sites = all_sites.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t.site.site_id === item.site.site_id),
    );

    const sites = unique_sites.map((item) => item.site);

    const total = sites.length;
    const offset = (pageNum - 1) * limitNum;
    const paginated_sites = sites.slice(offset, offset + limitNum);

    const sitesWithEmployeeCount = await Promise.all(
      paginated_sites.map(async (siteItem) => {
        const employees = await db
          .select()
          .from(employee)
          .where(eq(employee.site_id, siteItem.site_id));

        const departments = await db
          .select()
          .from(department)
          .where(eq(department.site_id, siteItem.site_id));
        
        return {
          ...siteItem,
          employee_count: employees.length,
          department_count: departments.length,
        };
      })
    );

    res.status(200).send({
      success: true,
      message: "Company data get successfully",
      data: sitesWithEmployeeCount,
      pagination: {
        total,
        page: pageNum,
        limit: limitNum,
      },
    });
  },
);

export const createSite = asyncHandler(
  async (req: FastifyRequest<{ Body: ISiteCreate }>, res: FastifyReply) => {
    let {
      site_code,
      name,
      contact,
      auto_remove_emp,
      site_password,
      agrigistics_site,
      pull_employees,
      send_attendance,
      easyroster,
      easyroster_token,
      eduman,
      send_agrigistics_gps,

      // license_validity,
      data_format,
      data_format_other,
      // license_key,
      server_ip,
      access_user,
    } = req.body;

    const new_site = {
      site_code: site_code || "",
      name,
      contact,
      notes: "",
      auto_remove_emp,
      site_password,
      agrigistics_site,
      pull_employees,
      send_attendance,
      easyroster,
      easyroster_token,
      eduman,
      send_agrigistics_gps,
    };
    const [result] = await db.insert(site).values(new_site);

    const new_site_trans = {
      site_id: result.insertId,
      license_validity: "2031-01-04",
      data_format,
      data_format_other,
      // license_key,
      server_ip,
      access_user,
    };

    await db.insert(site_trans).values(new_site_trans);

    res.status(201).send({
      success: true,
      message: "Site created successfully",
    });
  },
);

export const getSingleSite = asyncHandler(
  async (
    req: FastifyRequest<{ Params: { id: number } }>,
    res: FastifyReply,
  ) => {
    const { id } = req.params;

    const [site_data] = await db
      .select()
      .from(site)
      .where(eq(site.site_id, id));

    const trans_data = await db
      .select()
      .from(site_trans)
      .where(eq(site_trans.site_id, id));

    if (!site_data) {
      return res.status(404).send({ success: false, message: "Site not found" });
    }

    const latestTrans =
      trans_data.length > 0 ? trans_data[trans_data.length - 1] : null;

    res.send({
      success: true,
      data: {
        ...site_data,
        ...latestTrans,
      },
    });
  },
);

export const updateSite = asyncHandler(
  async (req: FastifyRequest<{ Params: { id: number }; Body: ISiteCreate }>, res: FastifyReply) => {
    const { id } = req.params;
    const {
      site_code,
      name,
      contact,
      auto_remove_emp,
      site_password,
      agrigistics_site,
      pull_employees,
      send_attendance,
      easyroster,
      easyroster_token,
      eduman,
      send_agrigistics_gps,

      // license_validity,
      data_format,
      data_format_other,
      // license_key,
      server_ip,
      access_user,
    } = req.body;

    await db.transaction(async (tx) => {
      await tx.update(site)
        .set({
          name,
          contact,
          auto_remove_emp,
          site_password,
          agrigistics_site,
          pull_employees,
          send_attendance,
          easyroster,
          easyroster_token,
          eduman,
          send_agrigistics_gps,
        })
        .where(eq(site.site_id, id));

      // Append new history to site_trans
      await tx.insert(site_trans).values({
        site_id: id,
        license_validity: "2031-01-04",
        data_format,
        data_format_other,
        // license_key: license_key,
        server_ip,
        access_user,
      });
    });

    res.status(200).send({ success: true, message: "Updated successfully" });
  }
);


export const deleteSite = asyncHandler(
  async (req: FastifyRequest<{ Params: { id: number } }>, res: FastifyReply) => {
    const { id } = req.params;

    await db.transaction(async (tx) => {
      await tx.delete(site_trans).where(eq(site_trans.site_id, id));
      await tx.delete(site).where(eq(site.site_id, id));
    });

    res.send({ success: true, message: "Site deleted" });
  }
);