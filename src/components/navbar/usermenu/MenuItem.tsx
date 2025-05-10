"use client";

interface MenuItemProps {
  onClick: () => void;
  label: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ onClick, label }) => {
  return (
    <div
      onClick={onClick}
      className="hover:border-custom-red hover:bg-custom-red px-4 py-3 font-semibold transition duration-300 hover:text-white"
    >
      {label}
    </div>
  );
};

export default MenuItem;
