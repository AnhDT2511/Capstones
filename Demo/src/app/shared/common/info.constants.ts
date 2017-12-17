export class InfoContstants {
    public static CATEGORY = [
        { id : '1' ,title: 'Văn Hóa'},
        { id : '2' ,title: 'Leo Núi'},
        { id : '3' ,title: 'Biển'},
        { id : '4' ,title: 'Chùa'},
        { id : '5' ,title: 'Hoang Sơ'},
        { title: 'Cắm Trại', id: '6' },
        { title: 'Thiên Nhiên', id: '7' },
    ]
    public static CITY_VN = [
        { id: '1', title: ' An Giang' },
        { id: '2', title: ' Bà Rịa-Vũng Tàu' },
        { id: '3', title: ' Bạc Liêu' },
        { id: '4', title: ' Bắc Kạn' },
        { id: '5', title: ' Bắc Giang' },
        { id: '6', title: ' Bắc Ninh' },
        { id: '7', title: ' Bến Tre' },
        { id: '8', title: ' Bình Dương ' },
        { id: '9', title: ' Bình Định' },
        { id: '10', title: ' Bình Phước' },
        { id: '11', title: ' Bình Thuận' },
        { id: '12', title: ' Cà Mau' },
        { id: '13', title: ' Cao Bằng' },
        { id: '14', title: ' Cần Thơ (TP)' },
        { id: '15', title: ' Đà Nẵng (TP)' },
        { id: '16', title: ' Đắk Lắk' },
        { id: '17', title: ' Đắk Nông' },
        { id: '18', title: ' Điện Biên' },
        { id: '19', title: ' Đồng Nai' },
        { id: '20', title: ' Đồng Tháp' },
        { id: '21', title: ' Gia Lai' },
        { id: '22', title: ' Hà Giang' },
        { id: '23', title: ' Hà Nam' },
        { id: '24', title: ' Hà Nội (TP)' },
        { id: '25', title: ' Hà Tây' },
        { id: '26', title: ' Hà Tĩnh' },
        { id: '27', title: ' Hải Dương' },
        { id: '28', title: ' Hải Phòng (TP)' },
        { id: '29', title: ' Hòa Bình ' },
        { id: '30', title: ' Hồ Chí Minh (TP)' },
        { id: '31', title: ' Hậu Giang' },
        { id: '32', title: ' Hưng Yên ' },
        { id: '33', title: ' Khánh Hòa' },
        { id: '34', title: ' Kiên Giang ' },
        { id: '35', title: ' Kon Tum' },
        { id: '36', title: ' Lai Châu' },
        { id: '37', title: ' Lào Cai' },
        { id: '38', title: ' Lạng Sơn' },
        { id: '39', title: ' Lâm Đồng' },
        { id: '40', title: ' Long An' },
        { id: '41', title: ' Nam Định' },
        { id: '42', title: ' Nghệ An' },
        { id: '43', title: ' Ninh Bình' },
        { id: '44', title: ' Ninh Thuận' },
        { id: '45', title: ' Phú Thọ' },
        { id: '46', title: ' Phú Yên' },
        { id: '47', title: ' Quảng Bình' },
        { id: '48', title: ' Quảng Nam' },
        { id: '49', title: ' Quảng Ngãi' },
        { id: '50', title: ' Quảng Ninh' },
        { id: '51', title: ' Quảng Trị' },
        { id: '52', title: ' Sóc Trăng' },
        { id: '53', title: ' Sơn La' },
        { id: '54', title: ' Tây Ninh' },
        { id: '55', title: ' Thái Bình' },
        { id: '56', title: ' Thái Nguyên' },
        { id: '57', title: ' Thanh Hóa' },
        { id: '58', title: ' Thừa Thiên - Huế' },
        { id: '59', title: ' Tiền Giang' },
        { id: '60', title: ' Trà Vinh' },
        { id: '61', title: ' Tuyên Quang' },
        { id: '62', title: ' Vĩnh Long' },
        { id: '63', title: ' Vĩnh Phúc' },
        { id: '64', title: ' Yên Bái' },
    ];

    public static hasOwnProperty = Object.prototype.hasOwnProperty;

    public static isEmpty(obj) {
        // if (obj == "") return true;
        // null and undefined are "empty"
        if (obj == null) return true;

        // Assume if it has a length property with a non-zero value
        // that that property is correct.
        if (obj.length > 0) return false;
        if (obj.length === 0) return true;

        // If it isn't an object at this point
        // it is empty, but it can't be anything *but* empty
        // Is it empty?  Depends on your application.
        if (typeof obj !== "object") return true;

        // Otherwise, does it have any properties of its own?
        // Note that this doesn't handle
        // toString and valueOf enumeration bugs in IE < 9
        for (var key in obj) {
            if (this.hasOwnProperty.call(obj, key)) return false;
        }

        return true;
    }
}

