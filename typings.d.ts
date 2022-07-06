export interface Post {
  _id: string;
  _createdAt: string;
  title: String;
  author: {
    name: String;
    image: String;
  };
  comments: [Comment];
  description: String;
  mainImage: {
    asset: {
      urt: String;
    };
  };
  slug: {
    current: String;
  };
  body: [object];
}

export interface Comment {
  approved: boolean;
  comment: string;
  email: string;
  name: string;
  post: {
    _ref: string;
    _type: string;
  };
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}
