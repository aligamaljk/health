import React from 'react';
import { ITranslation, StoreType } from '../../types';
import {
  Card,
  Empty,
  Image,
  Pagination,
  message,
  Skeleton
} from 'antd';
import './Articles.scss';
import { Link } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../Firebase/Firebase';
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

          {/* <div className='cards'>
            {(currentLang === 'en' ? articlesEn : articlesAr)?.map(
              (item) => (
                <Card
                  key={item?.id}
                  className='card'
                  onClick={() => navigate(`/articles/${item?.id}`)}
                  hoverable
                >
                  <div className='img'>
                    <Image preview={false} src={item?.image} />
                  </div>
                  <div className='title-card'>
                    <h1>{item?.title}</h1>
                  </div>
                  <div className='desc'>
                    {item?.desShow
                      .split(' ')
                      .reduce((acc, cur, i) => {
                        // Enter the length of words to display like here    : 9
                        if (cur !== ' ' && i < 9) {
                          return (acc = acc + ' ' + cur);
                        }
                        return acc;
                      }, '')}
                    
                  </div>
                </Card>
              )
            )}
          </div>
          <Pagination
            responsive={true}
            defaultCurrent={1}
            total={10}
            style={{
              justifyContent: 'center',
              margin: '20px 0 50px',
              display: 'flex'
            }}
          /> */}
        </div>
      </div>
    </>
  );
};

export default Articles;
