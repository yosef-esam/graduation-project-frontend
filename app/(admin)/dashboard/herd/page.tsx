import { getAnimals } from '@/actions/animalActions';
import HerdContent from './_components/HerdContent';

async function Herd() {
  const cows = await getAnimals();

  return (
    <div className="min-h-screen bg-gray-50/50 font-poppins">
      <div className="mx-auto max-w-screen-2xl">
        <HerdContent initialCows={cows} />
      </div>
    </div>
  );
}

export default Herd;
