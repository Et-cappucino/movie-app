export type MailOptions = {

    to: string,

    subject: string,
    
    from: string,

    template: string,
            
    context: { link: string }
}