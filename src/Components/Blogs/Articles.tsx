import React from 'react';
import { ITranslation } from '../../types';
import { Card, Empty, Pagination, message, Skeleton } from 'antd';
import './Articles.scss';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { getArticles } from '../../services/Strapi/getArticles';
import { useQuery } from '@tanstack/react-query';
import { ArticleCards } from './ArticleCards/GetEquivalentArticles';

const Articles: React.FC<ITranslation> = ({ t }) => {
  const {
    data: articlesData,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getArticles
  });

  // console.log(articlesData);
  // console.log(isLoading);
  // console.log(isError);
  // console.log(error);

  return (
    <>
      <div className='articles'>
        <div className='section-header'>
          <h1 className='title'>{t.articles}</h1>
          <div className='link'>
            <Link to='/'>{t.homeTab}</Link> <IoIosArrowForward />
            {t.articles}
          </div>
        </div>
        <div className='container'>
          {isLoading ?
            <div className='loader-container'>
              <div className='cards'>
                {[1, 2, 3, 4, 5, 6]?.map((article) => (
                  <Card
                    key={article}
                    hoverable
                    loading
                    cover={
                      <Skeleton.Image
                        active
                        style={{ width: '100% !important' }}
                      />
                    }
                  />
                ))}
              </div>
            </div>
          : isError ?
            <>
              {message.error(error.message)}
              <div className='empty-error'>
                <Empty />
              </div>
            </>
          : <>
              <div className='cards'>
                <ArticleCards data={articlesData} />
              </div>
              <Pagination
                responsive={true}
                defaultCurrent={1}
                total={10}
                //  onChange={(page)=>setIdPage(page)}
                style={{
                  justifyContent: 'center',
                  margin: '20px 0 50px',
                  display: 'flex'
                }}
              />
            </>
          }
        </div>
      </div>
    </>
  );
};

export default Articles;
