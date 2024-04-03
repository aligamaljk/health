import React, { useEffect, useState } from 'react';
import { ITranslation, StoreType } from '../../types';
import { Card, Empty, Image, Pagination, message, Skeleton } from 'antd';
import './Articles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { articlesAr, articlesEn } from '../../Data/Data';
// import { collection, getDocs } from 'firebase/firestore';
// import { db } from '../../Firebase/Firebase';
import { getBlogs } from '../../services/Strapi/getBlogs';
import { useQuery } from '@tanstack/react-query';

interface ArticleType {
  id: string;
  titleEn: string;
  titleAr: string;
  descriptionEn: string;
  descriptionAr: string;
  image: string;
  authorEn: string;
  authorAr: string;
}
const Articles: React.FC<ITranslation> = ({ t }) => {
<<<<<<< HEAD
  const {
    data: articlesData,
    isLoading,
    error,
    isError
  } = useQuery({
    queryKey: ['articles'],
    queryFn: getBlogs
  });

  const navigate = useNavigate();
  const { currentLang } = useSelector(
    (state: StoreType) => state?.user
  );
  // console.log(articlesData);
  // console.log(isLoading);

  // useEffect(() => {
  //   getBlogs();
  // }, []);
  console.log(isError);
  console.log(error);

  // AntDesign message popup erro
  if(load){
    return (
      <div className="articles">
        <div className='container'>
          <div className='cards'>
          {
            [1, 2, 3, 4, 5, 6]?.map((article) => (
               <Card
                 key={article}
                 hoverable
                 loading
                 cover={
                   <Skeleton.Image
                     active
                     style={{ width: "100% !important" }}
                   />
                 }
               />
           ))
          }
          </div>
        </div>
      </div>
    )
  }
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
              <h2>Loading...</h2>
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
                {(currentLang === 'en' ? articlesEn : articlesAr
                )?.map((item) => (
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
                      ...
                      {/* {item?.content?.map((item : any)=>(
                  <div key={item} dangerouslySetInnerHTML={{__html: item.slice(0,20)}} ></div>
                ))} */}
                    </div>
                  </Card>
                ))}
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
              </div>
            </>
          }

          <div className='cards'>
            {(currentLang === 'en' ? articlesEn : articlesAr)?.map(
              (item) => (
                <Card
                  key={item?.id}
                  className='card'
                  onClick={() => navget(`/articles/${item?.id}`)}
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
                    ...
                    {/* {item?.content?.map((item : any)=>(
                  <div key={item} dangerouslySetInnerHTML={{__html: item.slice(0,20)}} ></div>
                ))} */}
                  </div>
                </Card>
              )
            )}
            {
            articles?.map((item) => (
              <Card
                key={item?.id}
                className='card'
                onClick={() => navget(`/articles/${item?.id}`)}
                hoverable
              >
                <div className='img'>
                  <Image preview={false} src={item?.image} />
                </div>
                <div className='title-card'>
                  <h1>
                    {
                      currentLang === 'en' ? item?.titleEn : item?.titleAr
                    }
                    </h1>
                    <p className='desc'>
                      {
                        currentLang === 'en' ? item?.descriptionEn?.slice(0, 100) : item?.descriptionAr?.slice(0, 100)
                      }...
                    </p>
                </div>
              </Card>
            ))
            }
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
        </div>
      </div>
    </>
  );
};

export default Articles;
