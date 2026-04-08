export type HistoryType = {
    tanggal: string;
    movieList: HistoryMovieList[];
}

export type HistoryMovieList = {
    judulFilm: string;
    jumlahTiket: number;
    totalHarga: number;
}