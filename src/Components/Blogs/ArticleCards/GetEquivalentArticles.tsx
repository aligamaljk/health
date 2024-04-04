import { useSelector } from 'react-redux';
import { ArticlesType } from '../../../types/articleBlocksTypes';
import { StoreType } from '../../../types';
import { useNavigate } from 'react-router-dom';
import { Image, Card } from 'antd';
import { getNWords } from '../../../utils/helpers';

export function CardArticleInArabic({
  item
}: {
  item: ArticlesType;
}) {
  const navigate = useNavigate();
  const data = item.attributes.localizations.data;
  if (data.length === 0) return null;

  const { id, attributes } = data[0];

  return (
    <Card
      key={id}
      className='card'
      onClick={() => navigate(`/articles/${id}`)}
      hoverable
    >
      <div className='img'>
        <Image
          preview={false}
          src={`${import.meta.env.VITE_STRAPI_BASE_URL}${item.attributes.coverPhoto.data.attributes.url}`}
          alt={attributes.coverPhoto.data.attributes.name}
        />
      </div>
      <div className='title-card'>
        <h1>{attributes.title}</h1>
      </div>

      <div className='desc'>
        {getNWords(attributes.description, 9)}
        ...
      </div>
    </Card>
  );
}

export function CardArticleInEnglish({
  item
}: {
  item: ArticlesType;
}) {
  const navigate = useNavigate();
  return (
    <Card
      key={item.id}
      className='card'
      onClick={() => navigate(`/articles/${item.id}`)}
      hoverable
    >
      <div className='img'>
        <Image
          preview={false}
          src={`${import.meta.env.VITE_STRAPI_BASE_URL}${item.attributes.coverPhoto.data.attributes.url}`}
          alt={item.attributes.coverPhoto.data.attributes.name}
        />
      </div>
      <div className='title-card'>
        <h1>{item.attributes.title}</h1>
      </div>

      <p className='desc'>
        {getNWords(item.attributes.description, 9)}
      </p>
    </Card>
  );
}

export function ArticleCards({ data }: { data: ArticlesType[] }) {
  const { currentLang } = useSelector(
    (state: StoreType) => state?.user
  );

  return currentLang === 'en' ?
      data.map((ele) => <CardArticleInEnglish item={ele} />)
    : data.map((ele) => <CardArticleInArabic item={ele} />);
}
