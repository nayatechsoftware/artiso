import { roleGroups } from "@/data/careers";

export default function RoleList() {
  return (
    <div>
      {roleGroups.map((group) => (
        <div
          key={group.label}
          className="border-t border-black/12 pt-6 md:grid md:grid-cols-12 md:gap-8"
        >
          <p className="eyebrow md:col-span-3">{group.label}</p>
          <div className="mt-4 md:col-span-9 md:mt-0">
            {group.roles.map((role) => (
              <article
                key={role.title}
                className="border-b border-black/10 py-6 first:pt-0 last:border-b-0 last:pb-0"
              >
                <h3 className="text-xl font-light tracking-tight text-black md:text-2xl">
                  {role.title}
                </h3>
                <p className="mt-2 max-w-[54ch] text-[15px] leading-relaxed text-black/55">
                  {role.summary}
                </p>
                <p className="mt-3 text-[11px] uppercase tracking-[0.16em] text-black/40">
                  {role.meta}
                </p>
              </article>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}