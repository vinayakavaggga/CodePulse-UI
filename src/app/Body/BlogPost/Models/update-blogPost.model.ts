export interface updateBlogPostModel{
    Title: string,
    ShortDescription: string,
    Content: string,
    UrlHandle: string,
    FeaturedImageURL: string,
    DateCreated: Date,
    Author: string,
    IsVisible: boolean,
    Category: string[]
}