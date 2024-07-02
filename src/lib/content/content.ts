
export interface Author {
    id: number;
    name: string;
    description: string;
    avatar: string;
    slug: string;
}
export interface Category {
    id: number;
    name: string;
    slug: string;
    articles: Article[];
}
export interface Article {
    id: number;
    title: string;
    description: string;
    short_description: string;
    publishedAt: string;
    slug: string;
    imageURL: string;
    category: string;
    author: string;
}
export const blogs: Article[] = [
    {
        id: 1,
        title: "Blog 1",
        description: "Blog 1 description",
        short_description: "Blog 1 short description",
        publishedAt: "2021-01-01",
        slug: "blog-1",
        imageURL: "https://via.placeholder.com/150",
        category: "category-1",
        author: "fortan-pireva",
    },
]
export const categories: Category[] = [
    {
        id: 1,
        name: "Science",
        slug: "science",
        articles: blogs,
    },
    {
        id: 2,
        name: "Tutorials",
        slug: "tutorials",
        articles: blogs,
    },
]


export const authors: Author[] = [
    {
        id: 1,
        name: "Fortan Pireva",
        description: "Distinguished Software Engineer",

        slug: "fortan-pireva",
        avatar: "/images/author-1.jpeg",
    },
    {
        id: 2,
        name: "Enis Presheva",
        description: "Distinguished Software Engineer",
        slug: "enis-presheva",
        avatar: "https://via.placeholder.com/150",
    },
]


export const getCategoryBySlug = (slug: string) => {
    return categories.find((category) => category.slug === slug);
}

export const getAuthorBySlug = (slug: string) => {
    return authors.find((author) => author.slug === slug);
};
