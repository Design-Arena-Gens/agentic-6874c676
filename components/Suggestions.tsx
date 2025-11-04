export default function Suggestions({ onPick }: { onPick: (text: string) => void }) {
  const items = [
    'Show popular menu items',
    'How many calories in a Big Mac?',
    'Price of large fries',
    'Find a store in New York',
    'Breakfast options',
    'Vegetarian choices',
    'Allergens in McFlurry',
  ];
  return (
    <div className="suggestions">
      {items.map((t) => (
        <button key={t} onClick={() => onPick(t)}>{t}</button>
      ))}
    </div>
  );
}
