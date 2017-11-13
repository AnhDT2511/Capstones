export class TourPost {

    constructor( id : any , accountID: any, startPlaceID: any, 
        endPlaceID: any,duration: any, tourArticleTitle:any , deleted:any , createTime : any,
        description  : any , vehicle : any
    ) {
        // this.access_token = access_token;
        this.id = id;
        this.accountID = accountID;
        this.startPlaceID = startPlaceID;
        this.endPlaceID = endPlaceID;
        this.duration = duration;
        this.tourArticleTitle = tourArticleTitle;
        this.deleted = deleted;
        this.createTime = createTime;
        this.description = description;
        this.vehicle = vehicle;
    }
    public id: any;
    public accountID: any;
    public startPlaceID: any;
    public endPlaceID: boolean;
    public duration: any;
    public tourArticleTitle: any;
    public deleted: any;
    public createTime: any;
    public description: any;
    public vehicle:any;
}