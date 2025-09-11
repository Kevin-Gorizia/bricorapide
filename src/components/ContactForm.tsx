import React, { useState, type FormEvent } from "react";

interface FormData {
  name: string;
  phone: string;
  email?: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const [data, setData] = useState<FormData>({
    name: "",
    phone: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const submit = (e: FormEvent) => {
    e.preventDefault();
    console.log("Formulaire envoyé :", data);
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <form
      onSubmit={submit}
      className="bg-white p-6 rounded-lg shadow max-w-2xl"
    >
      {sent && (
        <div className="mb-4 p-3 bg-green-100 text-green-800 rounded">
          Message envoyé !
        </div>
      )}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <input
          required
          placeholder="Nom"
          className="p-3 border rounded"
          value={data.name}
          onChange={(e) => setData({ ...data, name: e.target.value })}
        />
        <input
          required
          placeholder="Téléphone"
          className="p-3 border rounded"
          value={data.phone}
          onChange={(e) => setData({ ...data, phone: e.target.value })}
        />
        <input
          placeholder="Email"
          className="p-3 border rounded md:col-span-2"
          value={data.email}
          onChange={(e) => setData({ ...data, email: e.target.value })}
        />
        <textarea
          required
          placeholder="Décris ton projet"
          className="p-3 border rounded md:col-span-2 h-28"
          value={data.message}
          onChange={(e) => setData({ ...data, message: e.target.value })}
        />
      </div>
      <div className="mt-4 flex justify-end">
        <button
          type="submit"
          className="px-5 py-2 bg-primary text-white rounded"
        >
          Envoyer
        </button>
      </div>
    </form>
  );
};

export default ContactForm;
