import CardHistory from "./CardHistory";
import { useSelector } from "react-redux";
import { formatIDR } from "./formatIDR";
import type { HistoryMovieList, HistoryType } from "../types/HistoryType";

const History = () => {
    const data = useSelector((state: any) => state.data.data);

    const totalPenjualan = data.reduce((acc: number, elm: HistoryType) => {
        return acc + elm.movieList.reduce((acc2: number, elm2: HistoryMovieList) => {
            return acc2 + elm2.totalHarga;
        }, 0);
    }, 0);

    const totalTiket = data.reduce((acc: number, elm: HistoryType) => {
        return acc + elm.movieList.reduce((acc2: number, elm2: HistoryMovieList) => {
            return acc2 + elm2.jumlahTiket;
        }, 0);
    }, 0);

    return (
        <section className="custom-container h-[110vh] overflow-y-auto md:order-1">
            <h1 className="text-center text-lg font-bold mb-2">History Pembelian Tiket Bioskop</h1>
            <p className="text-sm text-gray-700">Total Sepanjang Masa: {formatIDR(totalPenjualan)}</p>
            <p className="text-sm text-gray-700">Total Tiket Terjual: {totalTiket}</p>
            <div className="flex flex-col gap-4 mt-5">
                {data.length > 0 && data.map((elm: HistoryType) => (
                    <CardHistory key={elm.tanggal} tanggal={elm.tanggal} movieList={elm.movieList} />
                ))}
            </div>
        </section>
    );
};

export default History;
