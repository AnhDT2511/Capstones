import { Component, OnInit } from '@angular/core';
import { DataService, UtilityService, NotificationService, CommonService } from '../../shared/service';
import { SystemConstants } from '../../shared/common';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { AuthenService } from '../../shared/index';
import { Comment } from '../../shared/domain/comment.user';

@Component({
  selector: 'app-group-tour',
  templateUrl: './group-page.component.html',
  styleUrls: ['./group-page.component.css']
})
export class GroupPageComponent implements OnInit {
  user: any = this.authentication.getLoggedInUser();
  groupTourId: string;
  listComment : any;
  comment: string = "";
  groupTour: any = {
    // 'tourArticleTitle': 'Khám phá Ninh Bình',
    // 'description': 'Chuyện sản phẩm của nhiều hãng khác nhau sử dụng chung một loại công nghệ màn hình, thậm chí là cùng tấm nền thật ra không mới. Nhưng câu chuyện chất lượng hình ảnh của chúng có như nhau hay không thì vẫn luôn là đề tài bàn tán của nhiều người.',
    // 'category': '1,2',
    // 'duration': 3,
    // 'startTime': '05/12/2017',
    // 'prepare': 'Áo ấm, mũ bảo hiểm, đồ sữa xe',
    // 'note': 'Áo ấm, mũ bảo hiểm, đồ sữa xe',
    // 'referenceLink': 'file:///E:/GitHub/tripnet-frontend/groupTour.html'
  };
  listCategory: any = {
    '1': 'Leo núi',
    '2': 'Hành trình',
    '3': 'Văn Hóa',
  }

  constructor(
    private dataService: DataService,
    private utiliservice: UtilityService,
    private notifyservice: NotificationService,
    private commonService: CommonService,
    private activatedRoute: ActivatedRoute,
    private authentication: AuthenService
  ) { 
    this.activatedRoute.params.subscribe((params: Params) => {
      this.groupTourId = params.id;
      this.dataService.get('/tours/post/' + params.id).subscribe((response: any) => {
        this.groupTour = response;
        this.loadComment();
      }, error => {
      });
    });
  }

  ngOnInit() {
    // lấy thể loại theo id category
    // let listCategory = this.groupTour.category.split(",");
    // let stringCategory = "";
    // listCategory.forEach(element => {
    //   stringCategory += this.listCategory[element] + ",";
    // });
    // this.groupTour.category = stringCategory;
  }
  sendComment() {
    if (this.user != null) {
      let _comment = new Comment(this.comment, this.groupTour.id, this.user.id);
      this.dataService.post('/tours/post/' + this.groupTour.id + '/comment', _comment).subscribe((response: any) => {
        this.loadComment();
      }, error => {
      });
    } else {
      this.notifyservice.printErrorMessage('Xin hãy đăng nhập trước khi thực hiện hành động này!');
    }
  }

  loadComment() {
    this.dataService.get('/tours/post/' + this.groupTour.id + '/comment/get-all').subscribe((response: any) => {
      this.listComment = response;
      for (var i in this.listComment) {
        this.dataService.get('/user/account/' + this.listComment[i].commentByID).subscribe((response: any) => {
          for (var i in this.listComment) {
            if (this.listComment[i].commentByID == response.id) {
              this.listComment[i]['userName'] = response.userName;
            }
          }
        }, error => {
        });
      }
    }, error => {
    });
  }

  logout() {
    window.localStorage.removeItem("CURRENT_USER");
    this.user = this.authentication.getLoggedInUser();
    this.notifyservice.printSuccessMessage("Đăng xuất thành công");
  }
}
