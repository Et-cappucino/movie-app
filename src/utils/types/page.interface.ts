
export interface Page<T> {
    
    numberOfElements: number,
    
    totalPages: number,
    
    totalElements: number,
    
    content: T[]
}