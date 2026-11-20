import { useState } from "react";
import { ArrowRight, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Reveal from "@/components/site/Reveal";

const emptyForm = { name: "", email: "", company: "", message: "" };

export default function DemoForm() {
  const [form, setForm] = useState(emptyForm);
  const [status, setStatus] = useState("idle");
  const [error, setError] = useState("");

  const update = (field) => (event) =>
    setForm((current) => ({ ...current, [field]: event.target.value }));

  const submit = async (event) => {
    event.preventDefault();
    if (!form.name.trim() || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(form.email.trim())) {
      setError("Please add your name and a valid email address.");
      return;
    }
    setError("");
    setStatus("sending");
    try {
      await base44.entities.DemoRequest.create({
        name: form.name.trim(),
        email: form.email.trim(),
        company: form.company.trim(),
        message: form.message.trim(),
      });
      setStatus("done");
    } catch (err) {
      setStatus("idle");
      setError("Something went wrong sending your request. Please try again.");
    }
  };

  return (
    <section id="contact" className="border-t border-black/10 bg-[#eeeeee] py-20 md:py-28 lg:py-32">
      <div className="shell grid gap-14 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-5">
          <Reveal>
            <p className="eyebrow">08 — Contact</p>
            <h2 className="display-xl mt-6 max-w-[10ch]">Book Your Demo</h2>
            <p className="mt-8 max-w-sm text-[17px] leading-relaxed text-black/55">
              See ARTISO on your own collection. We will walk your team through brand DNA,
              design development and the tech pack in a single session.
            </p>
            <div className="mt-10 flex items-center gap-3 border-t border-black/12 pt-5">
              <span className="h-1.5 w-1.5 rounded-full bg-black" />
              <span className="eyebrow">30 minute walkthrough, your own collection</span>
            </div>
          </Reveal>
        </div>

        <div className="lg:col-span-6 lg:col-start-7">
          <Reveal i={1}>
            {status === "done" ? (
              <div className="flex min-h-[380px] flex-col justify-center border border-black/12 bg-white p-8 md:p-12">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-[#c9d6df]">
                  <Check className="h-5 w-5" strokeWidth={1.5} />
                </span>
                <h3 className="mt-8 text-2xl font-light tracking-tight">
                  Thank you, {form.name.split(" ")[0]}.
                </h3>
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
              <form onSubmit={submit} className="grid gap-7 sm:grid-cols-2">
                <label className="block sm:col-span-1">
                  <span className="eyebrow">Name</span>
                  <input
                    value={form.name}
                    onChange={update("name")}
                    placeholder="Your full name"
                    className="mt-3 w-full border-b border-black/20 bg-transparent pb-3 text-[16px] text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </label>
                <label className="block sm:col-span-1">
                  <span className="eyebrow">Email</span>
                  <input
                    type="email"
                    value={form.email}
                    onChange={update("email")}
                    placeholder="you@brand.com"
                    className="mt-3 w-full border-b border-black/20 bg-transparent pb-3 text-[16px] text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="eyebrow">Company</span>
                  <input
                    value={form.company}
                    onChange={update("company")}
                    placeholder="Brand or organisation"
                    className="mt-3 w-full border-b border-black/20 bg-transparent pb-3 text-[16px] text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </label>
                <label className="block sm:col-span-2">
                  <span className="eyebrow">Message</span>
                  <textarea
                    value={form.message}
                    onChange={update("message")}
                    rows={3}
                    placeholder="Tell us about your teams and what you would like to see"
                    className="mt-3 w-full resize-none border-b border-black/20 bg-transparent pb-3 text-[16px] leading-relaxed text-black outline-none transition-colors placeholder:text-black/30 focus:border-black"
                  />
                </label>

                {error && <p className="text-sm text-[#a32222] sm:col-span-2">{error}</p>}

                <div className="flex flex-wrap items-center gap-5 sm:col-span-2">
                  <button type="submit" disabled={status === "sending"} className="pill disabled:opacity-60">
                    {status === "sending" ? "Sending" : "Book Your Demo"}
                    <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                  </button>
                  <p className="max-w-[22ch] text-xs leading-relaxed text-black/40">
                    We reply within one working day.
                  </p>
                </div>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}