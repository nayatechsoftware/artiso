import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/site/Reveal";
import { Image } from "@/components/ui/image";
import { countryCodes } from "@/data/countryCodes";

const emptyForm = {
  firstName: "",
  lastName: "",
  company: "",
  website: "",
  role: "",
  email: "",
  countryCode: "+34",
  phone: "",
};

const inputClass =
  "mt-3 w-full border-b border-black/20 bg-transparent pb-3 text-[16px] text-black outline-none transition-colors placeholder:text-black/30 focus:border-black";

export default function BookDemoForm({ image }) {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (
      !form.firstName.trim() ||
      !form.lastName.trim() ||
      !form.role.trim() ||
      !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())
    ) {
      setError("Please add your name, role and a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      await base44.entities.DemoRequest.create({
        name: `${form.firstName.trim()} ${form.lastName.trim()}`,
        first_name: form.firstName.trim(),
        last_name: form.lastName.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        website: form.website.trim(),
        role_title: form.role.trim(),
        country_code: form.countryCode,
        phone: form.phone.trim(),
      });
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError("Something went wrong sending your request. Please try again.");
    }
  };

  return (
    <section className="shell pb-24 pt-16 md:pb-32 md:pt-20">
      <div className="grid gap-14 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-7">
          <Reveal>
            {status === "done" ? (
              <div className="flex min-h-[420px] flex-col justify-center border border-black/12 bg-white p-8 md:p-12">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9d6df]">
                  <Check className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h2 className="mt-8 text-2xl font-light tracking-tight">
                  Thank you, {form.firstName}.
                </h2>
                <p className="mt-3 max-w-sm text-[15px] leading-relaxed text-black/55">
                  Your request is with the ARTISO team. We will be in touch within one working
                  day to arrange a time that suits you.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setForm(emptyForm);
                    setStatus("idle");
                  }}
                  className="mt-8 self-start text-[12px] uppercase tracking-[0.18em] text-black/60 underline underline-offset-4 transition-colors hover:text-black"
                >
                  Send another request
                </button>
              </div>
            ) : (
              <form onSubmit={submit}>
                <p className="eyebrow">Your demo request details</p>

                <div className="mt-8 grid gap-7 sm:grid-cols-2">
                  <label className="block">
                    <span className="eyebrow">First name*</span>
                    <input
                      value={form.firstName}
                      onChange={update("firstName")}
                      placeholder="Sarah"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Last name*</span>
                    <input
                      value={form.lastName}
                      onChange={update("lastName")}
                      placeholder="Iglesias"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Company name</span>
                    <span className="ml-1 text-[10px] uppercase tracking-[0.12em] text-black/30">
                      Optional
                    </span>
                    <input
                      value={form.company}
                      onChange={update("company")}
                      placeholder="Your brand or studio"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Company website</span>
                    <span className="ml-1 text-[10px] uppercase tracking-[0.12em] text-black/30">
                      Optional
                    </span>
                    <input
                      value={form.website}
                      onChange={update("website")}
                      placeholder="brand.com"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Role / title*</span>
                    <input
                      value={form.role}
                      onChange={update("role")}
                      placeholder="Creative Director"
                      className={inputClass}
                    />
                  </label>
                  <label className="block">
                    <span className="eyebrow">Work email*</span>
                    <input
                      type="email"
                      value={form.email}
                      onChange={update("email")}
                      placeholder="you@brand.com"
                      className={inputClass}
                    />
                  </label>
                  <p className="text-xs leading-relaxed text-black/40 sm:col-span-2">
                    Independent designer? Your personal email is welcome too.
                  </p>
                  <label className="block">
                    <span className="eyebrow">Country code</span>
                    <span className="ml-1 text-[10px] uppercase tracking-[0.12em] text-black/30">
                      Optional
                    </span>
                    <select
                      value={form.countryCode}
                      onChange={update("countryCode")}
                      className={`${inputClass} appearance-none rounded-none`}
                    >
                      {countryCodes.map((country) => (
                        <option key={country.name} value={country.code}>
                          {country.name} ({country.code})
                        </option>
                      ))}
                    </select>
                  </label>
                  <label className="block">
                    <span className="eyebrow">Mobile phone</span>
                    <span className="ml-1 text-[10px] uppercase tracking-[0.12em] text-black/30">
                      Optional
                    </span>
                    <input
                      value={form.phone}
                      onChange={update("phone")}
                      placeholder="600 000 000"
                      className={inputClass}
                    />
                  </label>
                </div>

                <p className="mt-8 text-[11px] uppercase tracking-[0.16em] text-black/35">
                  * Required fields
                </p>

                {error && <p className="mt-4 text-sm text-[#a32222]">{error}</p>}

                <div className="mt-8 flex flex-wrap items-center gap-5">
                  <button type="submit" disabled={status === "sending"} className="pill disabled:opacity-60">
                    {status === "sending" ? "Sending" : "Book Your Demo"}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </button>
                  <p className="max-w-[26ch] text-xs leading-relaxed text-black/40">
                    We reply within one working day.
                  </p>
                </div>

                <p className="mt-10 max-w-[62ch] border-t border-black/12 pt-5 text-xs leading-relaxed text-black/45">
                  We’ll use the details you share to arrange your personalized demo and follow up
                  with you about it. We also note how you found us, so we can keep showing up where
                  creative minds look for inspiration. See our{" "}
                  <Link to="/privacy-policy" className="underline decoration-black/25 underline-offset-2 hover:text-black">
                    Privacy Policy
                  </Link>
                  .
                </p>
              </form>
            )}
          </Reveal>
        </div>

        <div className="lg:col-span-5">
          <Reveal i={1}>
            <div className="aspect-[4/5] w-full overflow-hidden bg-black/5">
              <Image
                src={image}
                alt="An ARTISO label pinned to cream wool beside a moodboard of garments and fabric swatches"
                className="h-full w-full"
                fittingType="fill"
              />
            </div>
            <div className="mt-8 border-t border-black/12 pt-6">
              <h2 className="display-lg max-w-[16ch]">Let’s tailor your demo</h2>
              <p className="mt-4 text-[15px] leading-relaxed text-black/55">
                Like a well-cut garment, the best demos are made to measure. If you have a brand or
                studio email, we’d love you to use it: company emails are prioritised, so we can
                tailor the session to your collections. Working independently? You’re warmly welcome
                to continue.
              </p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}