export class LoggedInUser {
    constructor( id : any , userName: string, email: string, 
        photoId: string,credit: any, point:any , roleId:any , password : string,
        createTime  : any , deleted : any
    ) {
        // this.access_token = access_token;
        this.id = id;
        this.credit = credit;
        this.userName = userName;
        this.email = email;
        this.photoId = photoId;
        this.roleId = roleId;
        this.point = point;
        this.password = password;
        this.createTime = createTime;
        this.deleted = deleted;
    }
    public id: string;
    public password: string;
    public createTime: any;
    public deleted: boolean;
    public access_token: string;
    public userName: string;
    public credit: any;
    public email: string;
    public photoId: string;
    public point:any;
    public roleId: any;
}