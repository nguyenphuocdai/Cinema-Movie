export class DetailMovie {
    MaPhim: String;
    TenPhim: String;
    Trailer: String;
    HinhAnh: String;
    MoTa: String;
    MaNhom: String;
    NgayKhoiChieu: String;
    DanhGia: String;
    LichChieu: [ShowTime];
}

export class ShowTime implements Rap {
    TenRap: String;
    SoGhe: String;
    MaLichChieu: String;
    MaRap: String;
    MaPhim: String;
    NgayChieuGioChieu: String;
    GiaVe: String;
    ThoiLuong: String;
    MaNhom: String;
    Rap: [Rap];
}

interface Rap {
    MaRap: String;
    TenRap: String;
    SoGhe: String;
    MaNhom: String;
}
