import { Watchable } from "src/watchable/entities";
import { Profile } from "src/profile/entities/profile.entity";
import { User } from "src/user/entities/user.entity";

export interface Page {
    
    numberOfElements: number,
    
    totalPages: number,
    
    totalElements: number,
    
    content: Watchable[] | Profile[] | User[]
}