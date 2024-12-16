import  { useState } from 'react';

// Define the props interface
interface OngoingTaskProps {
  label: string;  // Specify that label should be a string

}

const OngoingTaskProps: React.FC<OngoingTaskProps> = ({ label }) => {
  const [selected, setSelected] = useState(false);

  const handleChange = () => {
    setSelected(!selected);
  };

  return (
    <div className="flex items-center space-x-2 cursor-pointer" onClick={handleChange}>
      <div
        className={`w-5 h-5 rounded-full border-2 border-gray-300 flex items-center justify-center ${
          selected ? 'bg-[#1ED11E]' : 'bg-white'
        }`}
      >
        {selected && (
          <span className="text-white text-xs font-bold">✓</span>
        )}
      </div>
      <span className={`${selected ? 'line-through text-gray-500' : ''}`}>
        {label}
      </span>
    </div>
  );
};

export default OngoingTaskProps;
