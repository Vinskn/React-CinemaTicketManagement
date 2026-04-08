import type { FormType } from "../../types/FormType";
import type { HistoryMovieList, HistoryType } from "../../types/HistoryType";

type ActionType = { type: "ADD_DATA"; payload: FormType } | { type: "DELETE_DATA"; payload: string };

const initialState: { data: HistoryType[] } = {
    data: [],
};

const dataReducer = (state = initialState, action: ActionType) => {
    switch (action.type) {
        case "ADD_DATA":
            const judulFilm = action.payload.judulFilm;
            if (!judulFilm) return state;

            const searchItemIndex = state.data.findIndex(
                (item: HistoryType) => item.tanggal === action.payload.tanggal,
            );

            // cek tanggal ada atau tidak
            if (searchItemIndex !== -1) {
                // cek judul film ada atau tidak
                const searchTitleIndex = state.data[searchItemIndex].movieList.findIndex(
                    (list: HistoryMovieList) => list.judulFilm === judulFilm.Title,
                );

                if (searchTitleIndex !== -1) {
                    // kondisi kalau tanggal ada dan judul film ada -> update jumlah dan total harga
                    const theData = [...state.data];

                    const item = theData[searchItemIndex];

                    theData[searchItemIndex] = {
                        ...item,
                        movieList: [...item.movieList],
                    };

                    theData[searchItemIndex].movieList[searchTitleIndex] = {
                        judulFilm: judulFilm.Title,
                        jumlahTiket:
                            Number(item.movieList[searchTitleIndex].jumlahTiket) + Number(action.payload.jumlahTiket),
                        totalHarga:
                            Number(item.movieList[searchTitleIndex].totalHarga) +
                            Number(action.payload.jumlahTiket) * Number(action.payload.harga),
                    };
                    return {
                        ...state,
                        data: theData,
                    };
                }

                // kondisi kalau tanggal ada tapi judul film tidak ada -> tambah judul film baru
                const theData = [...state.data];
                theData[searchItemIndex] = {
                    ...theData[searchItemIndex],
                    movieList: [
                        ...theData[searchItemIndex].movieList,
                        {
                            judulFilm: judulFilm.Title,
                            jumlahTiket: Number(action.payload.jumlahTiket),
                            totalHarga: Number(action.payload.jumlahTiket) * Number(action.payload.harga),
                        },
                    ],
                };
                return {
                    ...state,
                    data: theData,
                };
            }

            // kondisi kalau tanggal tidak ada -> tambah tanggal baru & movie list baru
            const newData = {
                tanggal: action.payload.tanggal,
                movieList: [
                    {
                        judulFilm: judulFilm.Title,
                        jumlahTiket: Number(action.payload.jumlahTiket),
                        totalHarga: Number(action.payload.jumlahTiket) * Number(action.payload.harga),
                    },
                ],
            };
            return {
                ...state,
                data: [...state.data, newData],
            };
        default:
            return state;
    }
};

export default dataReducer;
