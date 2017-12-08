export class Bookmark {

    constructor(Id: any, tourPostID: any, bookmarkByID: any, deleted: any
    ) {
        this.Id = Id;
        this.tourPostID = tourPostID;
        this.bookmarkByID = bookmarkByID;
        this.deleted = deleted;
    }
    public Id: any;
    public tourPostID: any;
    public bookmarkByID: any;
    public deleted: any = 0;
    public createTime: any;
}