'use client';

import { useTransition } from 'react';
import { toast } from 'react-hot-toast';
import { createAnimal } from '@/app/actions/animalActions';
import InputField from '@/app/utils/InputField';
import Btn from '@/app/utils/Btn';

export default function AddAnimalForm() {
  const [isPending, startTransition] = useTransition();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const form = e.currentTarget; // ✅ store reference
    const formData = new FormData(form);

    const data = {
      name: formData.get('name'),
      species: formData.get('species'),
      age: Number(formData.get('age')),
      weight: Number(formData.get('weight')),
      dateOfBirth: formData.get('dateOfBirth'),
      notes: formData.get('notes'),
    };

    startTransition(async () => {
      try {
        await createAnimal(data);
        toast.success('Animal added successfully 🐄');
        form.reset(); // ✅ SAFE
      } catch (err) {
        console.error(err);
        toast.error('Failed to add animal');
      }
    });
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-lg space-y-4 rounded-xl bg-white p-6 shadow-lg"
    >
      <h2 className="text-xl font-semibold text-gray-800">Add New Animal</h2>

      <div className="grid grid-cols-2 gap-4">
        <InputField name="name" placeholder="Name" required className="input" />
        <InputField
          name="species"
          placeholder="Species"
          required
          className="input"
        />
        <InputField
          name="age"
          type="number"
          placeholder="Age"
          className="input"
        />
        <InputField
          name="weight"
          type="number"
          placeholder="Weight"
          className="input"
        />
      </div>

      <InputField
        name="dateOfBirth"
        type="date"
        className="input w-full"
        required
      />

      <textarea
        name="notes"
        placeholder="Notes"
        rows={3}
        className="input w-full"
      />

      <Btn
        type="submit"
        text="add animal"
        disabled={isPending}
        className="w-full rounded-lg bg-green-600 py-2 text-white transition hover:bg-green-700 disabled:opacity-50"
      >
      
      </Btn>
    </form>
  );
}
