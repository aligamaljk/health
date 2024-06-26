import { Button } from 'antd';
import { ITranslation } from '../../types';
import { AiFillHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import './OwnNotFound.scss';
import img from '../../assets/404-with-a-cat.svg';

const OwnNotFound = ({ t }: ITranslation) => {
  return (
    <div className='page-not-found'>
      <img src={img} alt='404 error photo with a cute cat' />
      <Link to='/'>
        <Button type='primary' className='btn-homePage'>
          <AiFillHome />
          <span>{t?.OwnNotFound}</span>
        </Button>
      </Link>
    </div>
  );
};

export default OwnNotFound;
