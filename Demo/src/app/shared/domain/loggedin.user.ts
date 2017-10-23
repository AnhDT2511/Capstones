export class LoggedInUser {
    constructor( id : any , userName: string, email: string, photoId: string,credit: any, point:any , roleId:any
    ) {
        // this.access_token = access_token;
        this.id = id;
        this.credit = credit;
        this.userName = userName;
        this.email = email;
        this.photoId = photoId;
        this.roleId = roleId;
        this.point = point;
    }
    public id: string;
    public access_token: string;
    public userName: string;
    public credit: any;
    public email: string;
    public photoId: string;
    public point:any;
    public roleId: any;
}