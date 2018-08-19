
const baseAPIMovie = 'http://sv2.myclass.vn/api/QuanLyPhim/';
const baseAPIUSer = 'http://sv2.myclass.vn/api/QuanLyNguoiDung/';
const baseAPITicket = 'http://sv2.myclass.vn/api/QuanLyDatVe/';
const baseAPIShowRoom = 'http://sv2.myclass.vn/api/QuanLyPhim/';

const keyCryto = 'JZTXK6LFNYQFA2DVN5RSARDBNE======';

export const LocalKey = {
    keyCryto: keyCryto
};

export const appConfig = {
    getListMovie: `${baseAPIMovie}LayDanhSachPhim?MaNhom=GP07`,
    detailMovie: `${baseAPIMovie}/LayChiTietPhim?`,
    putTicket: `${baseAPITicket}DatVe`,
    getSitShowRoom: `${baseAPIShowRoom}ChiTietPhongVe?`,

    getUser: `${baseAPIUSer}LayDanhSachNguoiDung?MaNhom=GP07`,
    registerUser: `${baseAPIUSer}ThemNguoiDung`,
    loginUser: `${baseAPIUSer}DangNhap?`,
    updateUser: `${baseAPIUSer}CapNhatThongTin`,
    historyPutTicket: `${baseAPITicket}XemLichSuDatVe?`

};
