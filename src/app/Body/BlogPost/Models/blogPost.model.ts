import { GetAllCategories } from "../../Component/Models/get-category-request.model";

export interface BlogPostModel{
    id: string,
    title: string,
    shortDescription: string,
    content: string,
    urlHandle: string,
    featuredImageURL: string,
    dateCreated: Date,
    author: string,
    authorId : string,
    isVisible: boolean,
    categoryResponse: GetAllCategories[]
}