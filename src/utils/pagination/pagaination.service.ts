import { Injectable } from "@nestjs/common";
import { Page } from "../types/page.interface";

@Injectable()
export class PaginationService {

  paginate(content: any[], totalElements: number, pageSize: number) {
    const page: Page = {
      numberOfElements: content.length,
      totalPages: Math.ceil(totalElements / pageSize),
      totalElements,
      content
    }
    return page
  }
}