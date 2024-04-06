import React, { useEffect, useRef } from 'react';
import { Empty, Image, Pagination, Skeleton, message } from 'antd';
import { ITranslation, StoreType } from '../../../types';
import './BlogsDetails.scss';
import { useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { findArticle } from '../../../services/Strapi/getArticles';
import { formatDateAr, formatDateEng } from '../../../utils/helpers';
import { IdentifyBlockContent } from '../StrapiBlocks/StrapiArticleBlocks';
import '../../../styles/_fonts.scss';

const BlogsDetails: React.FC<ITranslation> = ({ t }) => {
  const { currentLang } = useSelector(
    (state: StoreType) => state?.user
  );

  const { id } = useParams();
  const articlePageId = Number(id);
  const navigate = useNavigate();
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ['article', articlePageId],
    queryFn: () => findArticle(articlePageId)
  });

  const langRef = useRef<'ar' | 'en'>(currentLang);

  useEffect(() => {
    if (data && currentLang !== langRef.current) {
      console.log('triggered');
      const { articleIds } = data;
      const articleArId =
        articleIds[0].attributes?.localizations?.data[0]?.id;
      const articleEnId = articleIds[0]?.id;
      console.log(articleArId, 'articleArId');
      console.log(articleEnId, 'articleEnId');

      navigate(
        `/articles/${
          langRef.current === 'en' ? articleArId : articleEnId
        }`
      );
      langRef.current = currentLang;
    }
  }, [currentLang, data]);

  if (isLoading) {
    return (
      <div
        className='blog-details'
        style={{
          gap: '50px',
          paddingBlock: '75px',
          padding: '100px 200px'
        }}
      >
        <Skeleton active />
        <Skeleton active />
        <Skeleton active />
      </div>
    );
  }

  if (isError || !data) {
    return (
      <>
        {message.error(error?.message ?? 'Something went wrong')}
        <div className='blogs-details'>
          <div
            className='empty-error'
            style={{ padding: '100px 0px' }}
          >
            <Empty />
          </div>
        </div>
      </>
    );
  }

  const { articleData } = data;
  console.log(articleData);

  return (
    <div
      className={`blog-details  ${
        currentLang === 'en' ? 'roboto' : 'noto'
      }`}
    >
      <div className='container'>
        <h1 id='title'>{articleData.attributes.title}</h1>
      </div>
      <Image
        preview={false}
        src={articleData.attributes.coverPhoto.data.attributes.url}
        alt={articleData.attributes.coverPhoto.data.attributes.name}
      />
      <div className='container'>
        <div className='des'>
          <IdentifyBlockContent
            arr={articleData.attributes.content}
          />
        </div>
        <div className='auth'>
          <h4>
            {t.author}: <span>{articleData.attributes.author}</span>
          </h4>
          <h4>
            {t.date}:
            <span>
              {currentLang === 'en' ?
                formatDateEng(articleData.attributes.publishedAt)
              : formatDateAr(articleData.attributes.publishedAt) ??
                '2024/01/01'
              }
            </span>
          </h4>
        </div>
        <div className='pag'>
          <Pagination
            responsive={true}
            // defaultCurrent={idPage}
            defaultCurrent={articlePageId ?? 1}
            total={50}
            onChange={(page) => {
              // setIdPage(page);
              console.log(page);
              navigate(`/articles/1`);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default BlogsDetails;
