const InfoItem = ({ label, value, className }) => {
  return (
    <div className={className}>
      <span>{label}</span>
      <p>{value}</p>
    </div>
  );
};

export default InfoItem;
