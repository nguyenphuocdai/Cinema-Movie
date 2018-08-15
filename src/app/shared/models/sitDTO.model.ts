interface SitDTO extends ISit {
    MaLichChieu: number;
    DanhSachGhe: Array<ISit>[];
}

interface ISit {
    MaGhe: number;
    TenGhe: String;
    MaRap: number;
    LoaiGhe: String;
    STT: number;
    GiaVe: number;
    DaDat: Boolean;
    MaNhom: String;
    TaiKhoanNguoiDat: String;
}
export class DTO implements ISit, SitDTO {
    MaGhe: number;
    TenGhe: String;
    MaRap: number;
    LoaiGhe: String;
    STT: number;
    GiaVe: number;
    DaDat: Boolean;
    MaNhom: String;
    TaiKhoanNguoiDat: String;
    MaLichChieu: number;
    DanhSachGhe: Array<ISit>[];
}

