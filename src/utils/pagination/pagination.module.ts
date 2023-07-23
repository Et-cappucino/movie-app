import { Module } from "@nestjs/common";
import { PaginationService } from "./pagaination.service";

@Module({
    imports: [],
    controllers: [],
    providers: [PaginationService],
    exports: [PaginationService]
})
export class PaginationModule {}