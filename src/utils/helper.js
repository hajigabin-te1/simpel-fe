import { format, formatDistanceToNow } from "date-fns";
import { id } from "date-fns/locale";


// Bikin format tanggal
export const formatTanggal = (date) => {
    format( new Date(date), 'dd MM yyyy' , {locale: id} );
}

// Bikin format tanngal dengan jam
export const formatTanggalJam = (datehour) => format( new Date(datehour), 'dd MM yyyy HH:mm', {locale : id});

// Bikin format yang menyesuiakan
export const formatRelatif = (relative) => formatDistanceToNow(new Date(relative),{
    addSuffix : true,
    locale : id
});

// ambil status untuk kebutuhan pada tampilan
export const statusClass = (status) => {
    const map = {
        menunggu : 'badge-wait',
        diproses : 'badge-process',
        selesai : 'badge-complete',
        ditolak : 'badge-reject'
    }
    return map[status] || 'badge-wait';
}

// Ambil label status
export const statusLabel = (status) => {
    const map = {
        menunggu : "Menunggu",
        diproses : "Diproses",
        selesai : "Selesai",
        ditolak : "Ditolak"
    }
    return map[status] || status;
}

// ambil label role yang login
export const roleLabel = (role) => {
    const map = {
        admin : 'Administrator',
        operator : 'Operator',
        mahasiswa : 'Mahasiswa'
    }
    return map[role] || role;
}

export const prioritasClass = (p) => {
    p === 'mendesak' ? 'text-xs font-semibold text-red-600 bg-red-60 border border-red-200 px-2 py-1 rounded-full' :
    'text-xs font-semibold text-slate-500 bg-slate-100 border border-slate-200 px-2 py-1 rounded-full';    
}

// Ambil pesan error dari axios
export const pesanError = (error) => {
    error?.response?.data?.message || error?.message || "Terjadi kesalahan";
}

