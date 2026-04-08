import { Box, Card, Divider, List, ListItem, ListItemText, Stack, Typography } from "@mui/material";
import type { HistoryMovieList, HistoryType } from "../types/HistoryType";
import { formatIDR } from "./formatIDR";
import React from "react";

const CardHistory = React.memo(({ tanggal, movieList }: HistoryType) => {
    const totalPenjualan = movieList.reduce((acc: number, elm: HistoryMovieList) => {
        return acc + elm.totalHarga;
    }, 0);

    const totalTiket = movieList.reduce((acc: number, elm: HistoryMovieList) => {
        return acc + elm.jumlahTiket;
    }, 0);

    console.log(`render card tanggal: ${tanggal}`)

    return (
        <Card variant="outlined">
            <Box sx={{ p: 3 }}>
                <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                    <Typography gutterBottom variant="subtitle1" fontWeight="bold" component="div">
                        {tanggal}
                    </Typography>
                </Stack>
                <List>
                    {movieList.map((movieList, idx) => (
                        <>
                            <ListItem key={idx} secondaryAction={<Typography fontWeight="bold">{formatIDR(movieList.totalHarga)}</Typography>}>
                                <ListItemText primary={movieList.judulFilm} secondary={`Jumlah: ${movieList.jumlahTiket}`} />
                            </ListItem>
                            <Divider component="li" />
                        </>
                    ))}
                </List>
            </Box>
            <Divider />
            <Box
                sx={{
                    p: 2,
                    borderRadius: 2,
                    bgcolor: "background.paper",
                    boxShadow: 1,
                }}
            >
                <Typography variant="h6" fontWeight="bold" gutterBottom>
                    Ringkasan Harian
                </Typography>

                <Stack direction={{ xs: "column", sm: "row" }} spacing={2} justifyContent="space-between">
                    <Box>
                        <Typography variant="body2" color="text.secondary">
                            Total Penjualan
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {formatIDR(totalPenjualan)}
                        </Typography>
                    </Box>

                    <Box textAlign={{ xs: "left", sm: "right" }}>
                        <Typography variant="body2" color="text.secondary">
                            Total Tiket
                        </Typography>
                        <Typography variant="h6" fontWeight="bold">
                            {totalTiket}
                        </Typography>
                    </Box>
                </Stack>
            </Box>
        </Card>
    );
});

export default CardHistory;
