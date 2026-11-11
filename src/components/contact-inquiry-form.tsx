"use client";

import { useId, useState, type FormEvent } from "react";
import { ArrowUpRight } from "lucide-react";

type Values = { name: string; phone: string; email: string; projectType: string; location: string; details: string; preferredContact: string; website: string };
const initialValues: Values = { name: "", phone: "", email: "", projectType: "", location: "", details: "", preferredContact: "", website: "" };
const types = ["Residential Construction", "Commercial Construction", "Renovation & Remodeling", "Civil Works", "Turnkey Projects", "Interior Finishing", "Project Management", "Other"];

export function ContactInquiryForm() {
  const id = useId();
  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<Partial<Record<keyof Values, string>>>({});
  const [status, setStatus] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const update = (field: keyof Values, value: string) => { setValues(current => ({ ...current, [field]: value })); setErrors(current => ({ ...current, [field]: undefined })); };
  const validate = () => {
    const next: Partial<Record<keyof Values, string>> = {};
    if (values.name.trim().length < 2) next.name = "Enter your full name.";
    if (!/^(?:\+91[ -]?)?[6-9]\d{9}$/.test(values.phone.replace(/\s|-/g, ""))) next.phone = "Enter a valid Indian mobile number.";
    if (values.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) next.email = "Enter a valid email address.";
    if (!values.projectType) next.projectType = "Choose a project type.";
    if (values.location.trim().length < 2) next.location = "Enter the project location.";
    if (values.details.trim().length < 10) next.details = "Please share a few details about the project.";
    setErrors(next); return Object.keys(next).length === 0;
  };
  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault(); setStatus(""); if (!validate() || submitting) return;
    setSubmitting(true);
    try { const response = await fetch("/api/inquiry", { method: "POST", headers: { "content-type": "application/json" }, body: JSON.stringify(values) }); const data = await response.json(); if (!response.ok) throw new Error(data.message); setStatus(data.message); setValues(initialValues); } catch (error) { setStatus(error instanceof Error ? error.message : "We could not send your inquiry right now. Please use the direct contact options below."); } finally { setSubmitting(false); }
  };
  const field = (name: keyof Values) => `${id}-${name}`;
  return <form className="contact-form" noValidate onSubmit={submit}>
    <div className="contact-honeypot" aria-hidden="true"><label htmlFor={field("website")}>Website</label><input id={field("website")} name="website" tabIndex={-1} autoComplete="off" value={values.website} onChange={event => update("website", event.target.value)} /></div>
    <div className="contact-fields">
      <label><span>Full Name <b>*</b></span><input id={field("name")} name="name" autoComplete="name" value={values.name} onChange={event => update("name", event.target.value)} aria-invalid={Boolean(errors.name)} aria-describedby={errors.name ? `${field("name")}-error` : undefined} />{errors.name && <em id={`${field("name")}-error`}>{errors.name}</em>}</label>
      <label><span>Phone Number <b>*</b></span><input id={field("phone")} name="phone" type="tel" inputMode="tel" autoComplete="tel" placeholder="+91 98765 43210" value={values.phone} onChange={event => update("phone", event.target.value)} aria-invalid={Boolean(errors.phone)} aria-describedby={errors.phone ? `${field("phone")}-error` : undefined} />{errors.phone && <em id={`${field("phone")}-error`}>{errors.phone}</em>}</label>
      <label><span>Email Address <small>Optional</small></span><input id={field("email")} name="email" type="email" autoComplete="email" value={values.email} onChange={event => update("email", event.target.value)} aria-invalid={Boolean(errors.email)} aria-describedby={errors.email ? `${field("email")}-error` : undefined} />{errors.email && <em id={`${field("email")}-error`}>{errors.email}</em>}</label>
      <label><span>Project Type <b>*</b></span><select id={field("projectType")} name="projectType" value={values.projectType} onChange={event => update("projectType", event.target.value)} aria-invalid={Boolean(errors.projectType)} aria-describedby={errors.projectType ? `${field("projectType")}-error` : undefined}><option value="">Select a project type</option>{types.map(type => <option key={type}>{type}</option>)}</select>{errors.projectType && <em id={`${field("projectType")}-error`}>{errors.projectType}</em>}</label>
      <label className="contact-field-wide"><span>Project Location <b>*</b></span><input id={field("location")} name="location" autoComplete="address-level2" value={values.location} onChange={event => update("location", event.target.value)} aria-invalid={Boolean(errors.location)} aria-describedby={errors.location ? `${field("location")}-error` : undefined} />{errors.location && <em id={`${field("location")}-error`}>{errors.location}</em>}</label>
      <label className="contact-field-wide"><span>Project Details <b>*</b></span><textarea id={field("details")} name="details" rows={6} value={values.details} onChange={event => update("details", event.target.value)} aria-invalid={Boolean(errors.details)} aria-describedby={errors.details ? `${field("details")}-error` : undefined} />{errors.details && <em id={`${field("details")}-error`}>{errors.details}</em>}</label>
      <label className="contact-field-wide"><span>Preferred Contact Method <small>Optional</small></span><select id={field("preferredContact")} name="preferredContact" value={values.preferredContact} onChange={event => update("preferredContact", event.target.value)}><option value="">No preference</option><option>Phone Call</option><option>WhatsApp</option><option>Email</option></select></label>
    </div>
    <div className="contact-form-bottom"><p>Your details are only used to respond to this inquiry.</p><button type="submit" className="home-button" disabled={submitting}>{submitting ? "Sending Inquiry…" : <>Send Project Inquiry <ArrowUpRight size={17} aria-hidden="true" /></>}</button></div>
    <p className="contact-form-status" role="status" aria-live="polite">{status}</p>
  </form>;
}
