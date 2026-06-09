import { headers } from "next/headers";
import { redirect } from "next/navigation";
import pool from "@/lib/db";

async function getLeads(secret: string) {
  if (secret !== process.env.ADMIN_SECRET) return null;
  try {
    const result = await pool.query(
      `SELECT id, full_name, email, company, ai_vendor, use_case, created_at
       FROM waitlist
       ORDER BY created_at DESC`
    );
    return result.rows;
  } catch {
    return [];
  }
}

export default async function AdminPage({
  searchParams,
}: {
  searchParams: Promise<{ secret?: string }>;
}) {
  const { secret } = await searchParams;

  if (!secret || secret !== process.env.ADMIN_SECRET) {
    redirect("/admin?error=unauthorized");
  }

  const leads = await getLeads(secret);
  if (!leads) redirect("/admin?error=unauthorized");

  return (
    <html lang="en">
      <head>
        <meta charSet="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Garantir · Waitlist Admin</title>
        <style>{adminStyles}</style>
      </head>
      <body>
        <div className="wrap">
          <header>
            <div className="brand">Garantir · Waitlist</div>
            <div className="count">{leads.length} leads</div>
          </header>

          {leads.length === 0 ? (
            <div className="empty">No signups yet.</div>
          ) : (
            <table>
              <thead>
                <tr>
                  <th>#</th>
                  <th>Date</th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Company</th>
                  <th>AI Vendor</th>
                  <th>Use Case</th>
                </tr>
              </thead>
              <tbody>
                {leads.map((lead) => (
                  <tr key={lead.id}>
                    <td className="mono">{lead.id}</td>
                    <td className="mono">
                      {new Date(lead.created_at).toLocaleDateString("en-GB", {
                        day: "2-digit",
                        month: "short",
                        year: "numeric",
                      })}
                    </td>
                    <td>{lead.full_name}</td>
                    <td className="mono email">{lead.email}</td>
                    <td>{lead.company}</td>
                    <td>{lead.ai_vendor ?? "—"}</td>
                    <td className="usecase">{lead.use_case ?? "—"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </body>
    </html>
  );
}

const adminStyles = `
  *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; }
  body { background: #0e0d0b; color: #ece6d8; font-family: system-ui, sans-serif; font-size: 14px; }
  .wrap { max-width: 1200px; margin: 0 auto; padding: 40px 24px; }
  header { display: flex; align-items: center; justify-content: space-between; margin-bottom: 32px;
           border-bottom: 1px solid rgba(236,230,216,0.13); padding-bottom: 16px; }
  .brand { font-size: 20px; font-weight: 600; letter-spacing: .02em; }
  .count { font-family: monospace; font-size: 12px; background: rgba(203,242,78,.15);
           color: #cbf24e; padding: 4px 10px; border-radius: 20px; }
  table { width: 100%; border-collapse: collapse; }
  th { text-align: left; font-family: monospace; font-size: 10px; letter-spacing: .12em;
       text-transform: uppercase; color: #6a655b; padding: 10px 12px;
       border-bottom: 1px solid rgba(236,230,216,0.13); }
  td { padding: 12px; border-bottom: 1px solid rgba(236,230,216,0.07);
       vertical-align: top; color: #ece6d8; }
  tr:hover td { background: rgba(236,230,216,0.03); }
  .mono { font-family: monospace; font-size: 12px; }
  .email { color: #cbf24e; }
  .usecase { max-width: 260px; color: #9d978a; font-size: 13px; }
  .empty { text-align: center; padding: 60px; color: #6a655b; font-family: monospace; }
`;
