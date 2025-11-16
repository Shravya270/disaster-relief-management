const Card = ({ children, className = '', title, ...props }) => {
  return (
    <div className={`card ${className}`} {...props}>
      {title && <h3 className="text-xl font-bold mb-4 text-slate-800 dark:text-slate-200">{title}</h3>}
      {children}
    </div>
  );
};

export default Card;

