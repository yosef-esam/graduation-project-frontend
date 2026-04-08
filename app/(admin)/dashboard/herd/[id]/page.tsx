import { getAnimalById } from '@/lib/actions/animalActions';
import EntityContent from './_components/EntityContent';


interface PageProps {
  params: Promise<{ id: string }>;
}

export default async function EntityPage({ params }: PageProps) {
  const { id } = await params;
  let entity = await getAnimalById(id);
  console.log(entity)
  // Fallback dummy data if API fails or animal not found
  if (!entity) {
    const isEven = parseInt(id) % 2 === 0;
    entity = {
      id: id,
      name: isEven ? "Matrix Sentinel" : "Node Alpha",
      species: isEven ? "Bovine Prime" : "Bio-Unit",
      age: { years: isEven ? 3 : 5, months: 2, days: 15 },
      weight: isEven ? 650 : 720,
      dateOfBirth: "2021-03-24T00:00:00",
      notes: "High-performance genetic profile with 99% sync stability.",
      healthStatus: isEven ? "Healthy" : "Fever",
      temperature: isEven ? 38.5 : 40.2,
      distance: 1.2,
      deviceId: `FIQ-${id}-ALPHA`,
      batteryPercentage: 88,
      isActive: true,
      accX: 0.1,
      accY: -0.2,
      accZ: 9.8
    };
  }

  return (
    <div className="min-h-screen bg-gray-50/50 p-0 font-poppins ">
      <div className="mx-auto max-w-[1440px]">
        <EntityContent entity={entity} id={id} />
      </div>
    </div>
  );
}
