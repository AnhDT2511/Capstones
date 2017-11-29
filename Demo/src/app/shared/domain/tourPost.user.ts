export class TourPost {

    constructor( id : any , accountID: any, startPlaceID: any, 
        endPlaceID: any,duration: any, tourArticleTitle:any , deleted:any , createTime : any,
        description  : any  , postViewNumber  : any , note : any ,prepare  : any 
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
        this.postViewNumber = postViewNumber;
        this.note = note;
        this.prepare = prepare;
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
    public postViewNumber: any ;
    public note: any ;
    public prepare: any ;
}