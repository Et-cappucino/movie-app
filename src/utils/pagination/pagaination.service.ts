import { Injectable } from "@nestjs/common";
import { Page } from "../types/page.interface";

@Injectable()
export class PaginationService {

  paginate(content: any[], pageNumber: number, pageSize: number, totalElements?: number) {
    if(totalElements) {
      return this.getPage(content, totalElements, pageSize)
    }

    totalElements = content.length
    const totalPages = Math.ceil(totalElements / pageSize)

    if (pageNumber >= totalPages) {
      return this.getPage([], totalElements, pageSize)
    }

    const fromIndex = pageNumber * pageSize
    const toIndex = Math.min(fromIndex + pageSize, totalElements)
  
    return this.getPage(content.slice(fromIndex, toIndex), totalElements, pageSize)
  }

  private getPage(content: any[], totalElements: number, pageSize: number) {
    const page: Page = {
      numberOfElements: content.length,
      totalPages: Math.ceil(totalElements / pageSize),
      totalElements,
      content
    }
    return page
  }
}