export interface TextType {
  type: 'text';
  text: string;
  code?: boolean;
  strikethrough?: boolean;
  underline?: boolean;
  italic?: boolean;
  bold?: boolean;
}

export interface LinkType {
  type: 'link';
  url: string;
  children: TextType[];
}

type H1ToH6Nums = 1 | 2 | 3 | 4 | 5 | 6;

export interface HeadingType {
  type: 'heading';
  children: (TextType | LinkType)[];
  level: H1ToH6Nums;
}

export interface ParagraphType {
  type: 'paragraph';
  children: (TextType | LinkType)[];
}

export interface QuoteType {
  type: 'quote';
  children: (TextType | LinkType)[];
}

export interface CodeType {
  type: 'code';
  children: [
    {
      type: 'text';
      text: string;
    }
  ];
}

export interface ListItemType {
  type: 'list-item';
  children: (TextType | LinkType)[];
}

export interface ListType {
  type: 'list';
  format: 'unordered' | 'ordered';
  children: ListItemType[];
}

export interface ImageType {
  type: 'image';
  image: {
    name: string;
    alternativeText?: string;
    url: string;
  };
}

type ContentType = (
  | ParagraphType
  | HeadingType
  | ListType
  | QuoteType
  | CodeType
  | ImageType
)[];

export interface ArticlesType {
  id: number;
  attributes: {
    title: string;
    description: string;
    coverPhoto: {
      data: {
        id?: number;
        attributes: {
          name: string;
          url: string;
        };
      };
    };
    localizations: {
      data: []
        | [
            {
              id: number;
              attributes: {
                title: string;
                description: string;
                coverPhoto: {
                  data: {
                    id?: number;
                    attributes: {
                      name: string;
                      url: string;
                    };
                  };
                };
              };
            }
          ];
    };
  };
}

export interface OneArticleType {
  id: number;
  attributes: {
    title: string;
    publishedAt: string;
    content: ContentType;
    author: string;
    coverPhoto: {
      data: {
        id?: number;
        attributes: {
          name: string;
          url: string;
        };
      };
    };
  };
}
