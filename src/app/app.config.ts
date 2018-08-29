
const baseAPIMovie = 'http://sv2.myclass.vn/api/QuanLyPhim/';
const baseAPIUser = 'http://sv2.myclass.vn/api/QuanLyNguoiDung/';
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
    addMovie:`${baseAPIMovie}ThemPhimMoi`,
    deleteMovie : `${baseAPIMovie}XoaPhim?`,
    updateMovie: `${baseAPIMovie}CapNhatPhim`,
    uploadFileMovie: `${baseAPIMovie}UploadFile`,
    getUser: `${baseAPIUser}LayDanhSachNguoiDung?MaNhom=GP07`,
    registerUser: `${baseAPIUser}ThemNguoiDung`,
    loginUser: `${baseAPIUser}DangNhap?`,
    deleteUser : `${baseAPIUser}XoaNguoiDung?`, 
    updateUser: `${baseAPIUser}CapNhatThongTin`,
    historyPutTicket: `${baseAPITicket}XemLichSuDatVe?`

};
