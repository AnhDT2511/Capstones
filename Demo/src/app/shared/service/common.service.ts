import { Injectable } from "@angular/core";
import { Http, Headers } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { SystemConstants } from '../common/system.constants';
import { DataService } from './data.service'

@Injectable()
export class CommonService {

    account: any;
    constructor(
        private http: Http,
        private dataService: DataService
    ) { }

    searchByTitle(text, callback: (data) => void) {
        return this.dataService.get('/tours/post/title/' + text).subscribe(
            res => {
                callback(res);
            },
            err => {
                callback(err);
            }
        );
    }

    searchByAccount(text, callback: (data) => void) {
        // console.log(text);
        return this.dataService.get('/tours/post/name/' + text).subscribe(
            res => {
                callback(res);
            },
            err => {
                callback(err);
            }
        );
    }

    searchByDuration(text, callback: (data) => void) {
        // console.log(text);
        return this.dataService.get('/tours/post/duration/' + text).subscribe(
            res => {
                callback(res);
            },
            err => {
                callback(err);
            }
        );
    }

    joinGroup(_joinGroup, callback: (data) => void) {
        // console.log(id);
        return this.dataService.post('/tours/post/joingroup/', _joinGroup).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    updateJoinGroup(_joinGroup, callback: (data) => void) {
        // console.log(id);
        return this.dataService.put('/tours/post/joingroup/', _joinGroup).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getMemberGroup(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/joingroup/get-all-by-tourpost/'+ id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getNumberMember(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/joingroup/get-number-by-tourpost/'+ id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    addBookMark(_bookmark, callback: (data) => void) {
        // console.log(id);
        return this.dataService.post('/user/account/marking/', _bookmark).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    addImage(_media, callback: (data) => void) {
        // console.log(id);
        return this.dataService.post('/tours/post/media/', _media).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    updateImage(_media, callback: (data) => void) {
        // console.log(id);
        return this.dataService.put('/tours/post/media/', _media).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getImageByAccountID(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/media/get-by-account/' + id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getImageByTourByDayID(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/media/get-by-tourbyday/' + id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getImageByTourPostID(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/media/get-by-tourpost/' + id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    updateBookMark(_bookmark, callback: (data) => void) {
        // console.log(id);
        return this.dataService.put('/user/account/marking/', _bookmark).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    addReport(_report, callback: (data) => void) {
        // console.log(id);
        return this.dataService.post('/tours/post/report-tour/', _report).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getReportByAccountID(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/get-all-report-by-account/'+ id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getNumberReport(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/get-number-report-of-post/'+ id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getNumberComment(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/get-number-comment-of-post/'+ id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getBookMarkByAccountID(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/user/account/marking/get-all/' + id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getLikeByTourPostID(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/'+ id +'/like/get-all/' ).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getAllLike(callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/tours/post/like/get-all/').subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getListBookMarkByAccount(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/user/account/marking/get-all/' + id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getAccountInfo(id, callback: (data) => void) {
        // console.log(id);
        return this.dataService.get('/user/account/' + id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getAccountDetailsInfo(id, callback: (data) => void) {
        return this.dataService.get('/user/accountdetails/' + id).subscribe(
            res => {
                callback(res);
            },
            err => {
                // console.error(err);
            }
        );
    }

    getTourByDayDetails(id, callback: (data) => void) {
        return this.dataService.get('/tours/post/' + id + '/get-all').subscribe(res => {
            callback(res);
        });
    }

    getTourByDay(id, callback: (data) => void) {
        this.dataService.get('/tours/post/' + id + '/get-all').subscribe(res => {
            callback(res);
        });
    }

    disLike(id, _dislike,  callback: (data) => void) {
        this.dataService.put('/tours/post/' + id + '/Like', _dislike).subscribe(res => {
            callback(res);
        }, error => {
        });
    }
    getTourPostByID(id,  callback: (data) => void) {
        this.dataService.get('/tours/post/'+ id).subscribe(res => {
            callback(res);
        }, error => {
            callback(error);
        });
    }
    getAllTourPost(callback: (data) => void) {
       this.dataService.get('/tours/post/get-all').subscribe(res => {
             callback(res);
        }, error => {
            callback(error);
        });
    }
    createPost(_tourPost,  callback: (data) => void) {
        this.dataService.post('/tours/post/', _tourPost).subscribe(res => {
            callback(res);
        }, error => {
            callback(error);
        });
    }
    updatePost(_tourPost,  callback: (data) => void) {
        this.dataService.put('/tours/post/', _tourPost).subscribe(res => {
            callback(res);
        }, error => {
            callback(error);
        });
    }
}