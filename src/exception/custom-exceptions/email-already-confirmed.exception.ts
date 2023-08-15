import { HttpException, HttpStatus } from "@nestjs/common";

export class EmailAlreadyConfirmedException extends HttpException {
    constructor() {
        super('Email has been already confirmed', HttpStatus.BAD_REQUEST);
    }
}