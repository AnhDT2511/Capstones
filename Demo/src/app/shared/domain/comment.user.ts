export class Comment {
    
        constructor(content : string,tourPostID : any, commentByID : any
        ) {
            this.content = content;
            this.tourPostID = tourPostID;
            this.commentByID = commentByID;
        };
        public Id: any;
        public content: any;
        public tourPostID: any;
        public commentByID: any;
        public deleted: any = 0;
        public createTime: any;
    }