import React, { useEffect } from 'react';
import { ITranslation, StoreType } from '../../types';
import { Card, Empty, Image, Pagination, message } from 'antd';
import './Articles.scss';
import { Link, useNavigate } from 'react-router-dom';
import { IoIosArrowForward } from 'react-icons/io';
import { useSelector } from 'react-redux';
import { articlesAr, articlesEn } from '../../Data/Data';
import { getBlogs } from '../../services/Strapi/getBlogs';
import { useQuery } from '@tanstack/react-query';

const Articles: React.FC<ITranslation> = ({ t }) => {
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

  // AntDesign message popup error

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
        </div>
      </div>
    </>
  );
};

export default Articles;
