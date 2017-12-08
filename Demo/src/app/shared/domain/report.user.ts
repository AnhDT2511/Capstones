export class Report {

    constructor(description: any, tourPostID: any, reportByID: any
    ) {
        this.description = description;
        this.tourPostID = tourPostID;
        this.reportByID = reportByID;
    };
    public Id: any;
    public tourPostID: any;
    public reportByID: any;
    public description: any;
    public deleted: any = 0;
    public createTime: any;
    public updateTime: any;
}