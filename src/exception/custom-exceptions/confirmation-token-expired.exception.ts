import { HttpException, HttpStatus } from "@nestjs/common";

export class ConfirmationTokenExpiredException extends HttpException {
    constructor(token: string) {
        super('Confirmation Token ' + token + ' has already expired', HttpStatus.BAD_REQUEST);
    }
}