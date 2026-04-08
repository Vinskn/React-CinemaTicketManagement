import type { APIType } from "./APIType";

export type FormType = {
    jumlahTiket: number;
    judulFilm: APIType | null;
    harga: number;
    tanggal: string;
    judulSingle?: string;
}

export type HTMType = {
    sK: number;
    jS: number;
    m: number;
}