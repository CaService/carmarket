const Button = ({ variant = "primary", children, onClick, onClose }) => {
  const buttonStyles = {
    primary:
      "bg-primary border border-teal-500 text-white cursor-pointer hover:border-[#0f3549] hover:text-[#0f3549] font-chillax",
    secondary:
      "bg-secondary border border-black text-white cursor-pointer hover:border-[#0f3549] hover:text-[#0f3549] font-chillax",
    danger:
      "bg-red-500 border border-red-500 text-white cursor-pointer hover:bg-white hover:text-red-500 font-chillax",
  };

  return (
    <button
      onClick={onClick}
      className={`${buttonStyles[variant]} px-4 py-2 rounded-full font-medium transition-all duration-300 font-chillax`}
    >
      {children}
    </button>
  );
};

export default Button;
