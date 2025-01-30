import Warning from '../../../public/warning.png';

const Banner = ({ icon, description }) => {
  const [isVisible, setIsVisible] = useState(true);

  //   const handleClick = () => {
  //     setIsVisible(false);
  //   };
  return (
    <div style={styles.banner}>
      <div className='text' style={styles.text}>
        <img src={Warning} alt='' style={styles.img} />
        <p style={styles.description}>{description}</p>
      </div>
      <div
        style={{ fontWeight: 'bold', fontSize: '16px', cursor: 'pointer' }}
        onClick={() => {
          setIsVisible(false);
          console.log(isVisible);
        }}
      >
        I understand
      </div>
    </div>
  );
};

const styles = {
  banner: {
    display: 'flex',
    alignItems: 'center',
    padding: '10px',
    backgroundColor: '#FFF4C04D',
    borderRadius: '5px',
    border: '1px solid #ccc',
    justifyContent: 'space-between',
  },
  icon: {
    marginRight: '10px',
    fontSize: '24px',
  },
  description: {
    fontSize: '16px',
    color: '#333',
    fontFamily: 'Open Sans',
  },
  text: {
    display: 'flex',
    gap: '10px',
    alignItems: 'center',
  },
  img: {
    objectFit: 'contain',
  },
};

export default Banner;
