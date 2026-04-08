import { Controller, useForm } from "react-hook-form";
import type { FormType, HTMType } from "../types/FormType";
import { Alert, Autocomplete, Button, CircularProgress, InputAdornment, TextField } from "@mui/material";
import { SearchIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { NumericFormat } from "react-number-format";
import { useDispatch } from "react-redux";
import { addData } from "../redux/actions/dataAction";
import { useSearchData } from "./searchDataHook";
import Notif from "./Notif";

const FormInput = () => {
    const { register, handleSubmit, control, reset, getValues } = useForm<FormType>();
    const [currentDate, setCurrentDate] = useState<string>('');
    const [searchQuery, setSearchQuery] = useState<string>('');
    const { data, isLoading, error } = useSearchData(searchQuery);
    const [price, setPrice] = useState<number>(0);
    const [notif, setNotif] = useState<boolean>(false);
    const dispatch = useDispatch();
    const [htm, setHtm] = useState<HTMType>({
        sK: 20000,
        jS: 25000,
        m: 300000,
    });

    const onSubmit = (data: FormType) => {
        const payload = {
            ...data,
            harga: price,
        };
        dispatch(addData(payload));
        reset();
        setPrice(0);
        setCurrentDate('');
        setSearchQuery('');

        setNotif(true);
    };

    const handleDateChange = () => {
        const day = new Date(currentDate).getDay();
        if (day >= 1 && day <= 4) {
            setPrice(htm.sK);
        } else if (day === 5 || day === 6) {
            setPrice(htm.jS);
        } else if (day === 0) {
            setPrice(htm.m);
        }
    };

    useEffect(() => {
        handleDateChange();
    }, [currentDate]);

    useEffect(() => {
        handleDateChange();
    }, [htm]);

    const handleSearch = () => {
        const title = getValues("judulSingle")        
        setSearchQuery(title);
    };   

    return (
        <section className="container md:order-2 relative">
            {notif && <Notif message="Data berhasil ditambahkan" status={true} setStatus={setNotif} />}
            
            <h1 className="text-center text-lg font-bold mb-5">Form Pembelian Tiket Bioskop</h1>
            <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
                <TextField
                    {...register("jumlahTiket")}
                    label="Jumlah Tiket"
                    variant="outlined"
                    size="small"
                    required
                    type="number"
                    sx={{ width: "60%" }}
                />

                <div className="flex gap-2">
                    <TextField label="Cari Film" variant="outlined" size="small" fullWidth {...register("judulSingle")} />

                    <Button type="button" variant="contained" size="small" onClick={() => handleSearch()}>
                        <SearchIcon />
                    </Button>
                </div>

                {isLoading && <CircularProgress enableTrackSlot size="3rem" />}
                {error && <Alert severity="error">{error.message}</Alert>}

                <Controller
                    name="judulFilm"
                    control={control}
                    render={({ field }) => (
                        <Autocomplete
                            {...field}
                            options={data || []}
                            getOptionLabel={(option) => option.Title}
                            onChange={(_, value) => field.onChange(value)}
                            value={field.value || null}
                            isOptionEqualToValue={(option, value) => option.imdbID === value.imdbID}
                            renderOption={(props, option) => (
                                <li {...props} key={option.imdbID} className="flex gap-3 items-center p-2">
                                    <img
                                        src={option.Poster}
                                        alt={option.Title}
                                        className="w-10 h-14 object-cover rounded"
                                    />

                                    <div className="flex flex-col">
                                        <span className="font-semibold">{option.Title}</span>
                                        <span className="text-xs text-gray-500">{option.Year}</span>
                                    </div>
                                </li>
                            )}
                            renderInput={(params) => (
                                <TextField {...params} label="Judul Film" size="small" fullWidth />
                            )}
                        />
                    )}
                />

                <NumericFormat
                    thousandSeparator="."
                    decimalSeparator=","
                    customInput={TextField}
                    label="Harga"
                    size="small"
                    slotProps={{
                        input: {
                            startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                            readOnly: true,
                        },
                    }}
                    fullWidth
                    value={price}
                />

                <input
                    type="date"
                    {...register("tanggal")}
                    id="tanggal"
                    className="border-2 border-gray-300 rounded-lg p-2 text-gray-600"
                    onChange={(e) => setCurrentDate(e.target.value)}
                />

                <Button type="submit" variant="contained" size="small">
                    Simpan
                </Button>
            </form>

            <>
                <h2 className="text-left text-lg font-bold mt-20">HTM : </h2>
                <div className="grid grid-cols-2 items-center gap-x-3 gap-y-3 text-sm">
                    <p>Senin - Kamis:</p>
                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        customInput={TextField}
                        label="Harga"
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                            },
                        }}
                        fullWidth
                        defaultValue={htm.sK}
                        onValueChange={(e) => setHtm({ ...htm, sK: Number(e.floatValue) })}
                    />

                    <p>Jumat - Sabtu:</p>
                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        customInput={TextField}
                        label="Harga"
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                            },
                        }}
                        fullWidth
                        defaultValue={htm.jS}
                        onValueChange={(e) => setHtm({ ...htm, jS: Number(e.floatValue) })}
                    />

                    <p>Minggu:</p>
                    <NumericFormat
                        thousandSeparator="."
                        decimalSeparator=","
                        customInput={TextField}
                        label="Harga"
                        size="small"
                        slotProps={{
                            input: {
                                startAdornment: <InputAdornment position="start">Rp</InputAdornment>,
                            },
                        }}
                        fullWidth
                        defaultValue={htm.m}
                        onValueChange={(e) => setHtm({ ...htm, m: Number(e.floatValue) })}
                    />
                </div>
            </>
        </section>
    );
};

export default FormInput;

