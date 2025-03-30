export type Book = {
    id: string,
    author: string,
    title: string,
    subTitle: string,
    imageLink: string,
    totalRating: number,
    averageRating: number,
    keyIdeas: number,
    tags: string[],
    type: string,
    status: string,
    subscriptionRequired: boolean,
    summary: string,
    bookDescription: string,
    authorDescription: string,
    audioLink: string
}