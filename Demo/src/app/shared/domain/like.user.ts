export class Like {
    
        constructor(Id : any, tourPostID: any, likeByID: any , deleted : any
        ) {
            this.Id = Id;
            this.tourPostID = tourPostID;
            this.likeByID = likeByID;
            this.deleted = deleted;
        };
        public Id: any;
        public tourPostID: any;
        public likeByID: any;
        public deleted: any = 0;
        public createTime: any ;
    }