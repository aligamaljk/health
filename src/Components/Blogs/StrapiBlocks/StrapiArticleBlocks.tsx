import {
  CodeType,
  ContentType,
  HeadingType,
  ImageType,
  LinkType,
  ListItemType,
  ListType,
  ParagraphType,
  QuoteType,
  TextType
} from '../../../types/articleBlocksTypes';
import { v4 as uuid } from 'uuid';
import './StrapiArticleBlocks.scss';

// ======================================================================
// console.log(
//   createChild({
//     type: 'text',
//     text: 'asldsjfldsaslf',
//     underline: true,
//     italic: true,
//     bold: true
//   })
// );
// output: <span className=" underline italic bold">asldsjfldsaslf</span>
// ======================================================================
export function TextBlock({
  obj,
  disabled
}: {
  obj: TextType;
  disabled?: boolean;
}) {
  let classNames = '';
  if (obj.type === 'text') {
    if (disabled) {
      return obj.text;
    }
    for (const key in obj) {
      if (key !== 'type' && key !== 'text') {
        classNames = classNames + ' ' + key;
      }
    }

    if (classNames.length > 0) {
      return <span className={`${classNames}`}>{obj.text}</span>;
    }

    return obj.text;
  }

  return '';
}

// ==============================================================
// console.log(
//   createLink({
//     type: 'link',
//     url: 'https://google.com',
//     children: [
//       {
//         type: 'text',
//         text: 'asjgladhslgadhsflads'
//       }
//     ]
//   })
// );
// output: <a href="https://google.com">asjgladhslgadhsflads</a>
// ==============================================================
export function LinkBlock({
  obj,
  disabled
}: {
  obj: LinkType;
  disabled?: boolean;
}) {
  if (obj.type === 'link') {
    if (disabled) {
      return obj.children.map((el) => {
        return <TextBlock obj={el} key={uuid()} disabled={true} />;
      });
    }
    return (
      <a href={obj.url} target='_blank'>
        {obj.children.map((el) => {
          return <TextBlock obj={el} key={uuid()} />;
        })}
      </a>
    );
  }

  return '';
}

export function ChildBlock({
  obj,
  disabled
}: {
  obj: TextType | LinkType;
  disabled?: boolean;
}) {
  if (obj.type === 'link') {
    return <LinkBlock obj={obj} disabled={disabled} />;
  }
  if (obj.type === 'text') {
    return <TextBlock obj={obj} disabled={disabled} />;
  }

  return '';
}

// ==============================================================
// const para: ParagraphType = {
//   type: 'paragraph',
//   children: [
//     {
//       type: 'text',
//       text: ''
//     },
//     {
//       type: 'link',
//       url: 'https://google.com',
//       children: [
//         {
//           type: 'text',
//           text: 'asjgladhslgadhsflads'
//         }
//       ]
//     },
//     {
//       text: ' sddafdfasf ',
//       type: 'text'
//     },
//     {
//       type: 'link',
//       url: 'https://google.com',
//       children: [
//         {
//           type: 'text',
//           text: 'asfdafasd',
//           strikethrough: true,
//           underline: true,
//           italic: true,
//           bold: true,
//           code: true
//         }
//       ]
//     },
//     {
//       text: '',
//       type: 'text'
//     }
//   ]
// };
// output: <p><a href="https://google.com">asjgladhslgadhsflads</a> sddafdfasf <a href="https://google.com"><span class=" strikethrough underline italic bold code">asfdafasd</span></a></p>
// ==============================================================
export function ParagraphBlock({ obj }: { obj: ParagraphType }) {
  if (obj.type === 'paragraph') {
    return (
      <p>
        {obj.children.map((el) => (
          <ChildBlock obj={el} key={uuid()} />
        ))}
      </p>
    );
  }

  return '';
}

// ==============================================================
// const q: QuoteType = {
//   type: 'quote',
//   children: [
//     {
//       type: 'text',
//       text: 'quote text '
//     },
//     {
//       type: 'text',
//       text: 'some ',
//       bold: true,
//       italic: true,
//       underline: true,
//       strikethrough: true,
//       code: true
//     },
//     {
//       type: 'link',
//       url: 'https://google.com',
//       children: [
//         {
//           type: 'text',
//           text: 'example'
//         }
//       ]
//     },
//     {
//       text: '',
//       type: 'text'
//     }
//   ]
// };

// output: <q>
//   quote text{' '}
//   <span class=' bold italic underline strikethrough code'>some </span>
//   <a href='https://google.com'>example</a>
// </q>;
// ==============================================================
export function QuoteBlock({ obj }: { obj: QuoteType }) {
  if (obj.type === 'quote') {
    return (
      <div className='quote-wrapper'>
        <q>
          {obj.children.map((el) => (
            <ChildBlock obj={el} key={uuid()} disabled={true} />
          ))}
        </q>
      </div>
    );
  }

  return '';
}

export function CodeBlock({ obj }: { obj: CodeType }) {
  if (obj.type === 'code') {
    return (
      <div className='code-wrapper'>
        <code>
          {obj.children.map((el) => (
            <TextBlock obj={el} key={uuid()} disabled={true} />
          ))}
        </code>
      </div>
    );
  }

  return '';
}

function ListItemBlock({ obj }: { obj: ListItemType }) {
  if (obj.type === 'list-item') {
    return (
      <li>
        {obj.children.map((el) => (
          <ChildBlock obj={el} key={uuid()} />
        ))}
      </li>
    );
  }
  return '';
}
// ==============================================================
// const list: ListType = {
//   type: 'list',
//   format: 'ordered',
//   children: [
//     {
//       type: 'list-item',
//       children: [
//         {
//           type: 'text',
//           text: 'quote text '
//         },
//         {
//           type: 'text',
//           text: 'some ',
//           bold: true,
//           italic: true,
//           underline: true,
//           strikethrough: true,
//           code: true
//         },
//         {
//           type: 'text',
//           text: 'example'
//         }
//       ]
//     },
//     {
//       type: 'list-item',
//       children: [
//         {
//           type: 'text',
//           text: 'quote text'
//         }
//       ]
//     },
//     {
//       type: 'list-item',
//       children: [
//         {
//           type: 'text',
//           text: ''
//         }
//       ]
//     },
//     {
//       type: 'list-item',
//       children: [
//         {
//           type: 'text',
//           text: 'quote text '
//         },
//         {
//           type: 'text',
//           text: 'some ',
//           bold: true,
//           italic: true,
//           underline: true,
//           strikethrough: true,
//           code: true
//         },
//         {
//           type: 'text',
//           text: 'example'
//         }
//       ]
//     },
//     {
//       type: 'list-item',
//       children: [
//         {
//           type: 'text',
//           text: ''
//         }
//       ]
//     }
//   ]
// };
// output: <ol>
//   <li>
//     quote text{' '}
//     <span class=' bold italic underline strikethrough code'>
//       some{' '}
//     </span>
//     example
//   </li>
//   <li>quote text</li>
//   <li></li>
//   <li>
//     quote text{' '}
//     <span class=' bold italic underline strikethrough code'>
//       some{' '}
//     </span>
//     example
//   </li>
//   <li></li>
// </ol>;
// ==============================================================
export function ListBlock({ obj }: { obj: ListType }) {
  if (obj.format === 'ordered') {
    return (
      <ol>
        {obj.children.map((el) => (
          <ListItemBlock obj={el} key={uuid()} />
        ))}
      </ol>
    );
  }
  if (obj.format === 'unordered') {
    return (
      <ul>
        {obj.children.map((el) => (
          <ListItemBlock obj={el} key={uuid()} />
        ))}
      </ul>
    );
  }

  return '';
}
// ==============================================================
// const headeing1: HeadingType = {
//   type: 'heading',
//   children: [
//     {
//       type: 'text',
//       text: 'heading '
//     },
//     {
//       type: 'link',
//       url: 'https:1',
//       children: [
//         {
//           type: 'text',
//           text: '1',
//           bold: true,
//           italic: true,
//           underline: true,
//           strikethrough: true,
//           code: true
//         }
//       ]
//     },
//     {
//       text: '',
//       type: 'text'
//     }
//   ],
//   level: 1
// };
// output: <h1>
//   heading{' '}
//   <a href='https:1'>
//     <span class=' bold italic underline strikethrough code'>1</span>
//   </a>
// </h1>;
// ==============================================================
export function HeadingBlock({ obj }: { obj: HeadingType }) {
  if (obj.type === 'heading') {
    switch (obj.level) {
      case 1:
        return (
          <h1>
            {obj.children.map((el) => (
              <ChildBlock obj={el} key={uuid()} />
            ))}
          </h1>
        );
      case 2:
        return (
          <h2>
            {obj.children.map((el) => (
              <ChildBlock obj={el} key={uuid()} />
            ))}
          </h2>
        );
      case 3:
        return (
          <h3>
            {obj.children.map((el) => (
              <ChildBlock obj={el} key={uuid()} />
            ))}
          </h3>
        );
      case 4:
        return (
          <h4>
            {obj.children.map((el) => (
              <ChildBlock obj={el} key={uuid()} />
            ))}
          </h4>
        );
      case 5:
        return (
          <h5>
            {obj.children.map((el) => (
              <ChildBlock obj={el} key={uuid()} />
            ))}
          </h5>
        );
      case 6:
        return (
          <h6>
            {obj.children.map((el) => (
              <ChildBlock obj={el} key={uuid()} />
            ))}
          </h6>
        );
      default:
        console.error('Error while createing heading element');
    }
  }

  return '';
}
// ==============================================================
// {
//   type: 'image',
//   image: {
//     name: 'Healthy-eatin-habits-fb-cover.jpg',
//     alternativeText: 'Healthy-eatin-habits-fb-cover.jpg',
//     url: 'http://localhost:1337/uploads/Healthy_eatin_habits_fb_cover_f68c18383b.jpg'
//   }
// };

// Output:
// <div className='image-block-wrapper'>
//   <img
//     src='http://localhost:1337/uploads/Healthy_eatin_habits_fb_cover_f68c18383b.jpg'
//     alt='Healthy-eatin-habits-fb-cover.jpg'
//   />
// </div>;
// ==============================================================
export function ImgageBlock({ obj }: { obj: ImageType }) {
  if (obj.type === 'image') {
    return (
      <div className='image-block-wrapper'>
        <img src={obj.image.url} alt={obj.image.name} />
      </div>
    );
  }
  return '';
}

export function IdentifyBlockContent({ arr }: { arr: ContentType }) {
  return arr.map((item) => {
    switch (item.type) {
      case 'paragraph':
        return <ParagraphBlock obj={item} key={uuid()} />;
      case 'heading':
        return <HeadingBlock obj={item} key={uuid()} />;
      case 'list':
        return <ListBlock obj={item} key={uuid()} />;
      case 'image':
        return <ImgageBlock obj={item} key={uuid()} />;
      case 'quote':
        return <QuoteBlock obj={item} key={uuid()} />;
      case 'code':
        return <CodeBlock obj={item} key={uuid()} />;
      default:
        return null;
    }
  });
}
