import { useState, useEffect } from 'react';
import axios from 'axios';
import { Plus, RefreshCw } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination';
import SettingsList from './SettingsList';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

interface Setting {
    uid: string;
    data: any;
    created_at: string;
}

interface SettingsResponse {
    data: Setting[];
    page: number;
    limit: number;
    total: number;
    totalPages: number;
}

export default function Main() {
    const [settings, setSettings] = useState<Setting[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [page, setPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const navigate = useNavigate();

    async function fetchSettings(pageNum = 1) {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get<SettingsResponse>(`${API_URL}/settings?page=${pageNum}&limit=10`);
            setSettings(response.data.data);
            setTotalPages(response.data.totalPages);
            setPage(response.data.page);
        } catch (err) {
            setError('Failed to fetch settings');
            console.error(err);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        fetchSettings();
    }, []);

    async function handleDelete(uid: string) {
        if (!window.confirm('Are you sure you want to delete this setting?')) return;
        try {
            await axios.delete(`${API_URL}/settings/${uid}`);
            fetchSettings(page);
        } catch (err) {
            alert('Failed to delete setting');
        }
    }

    return (
        <div className="w-full p-4">
            <div className="flex justify-between items-center mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Settings Manager</h1>
                <button
                    onClick={() => navigate('/create')}
                    className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded inline-flex items-center gap-2"
                >
                    <Plus size={20} />
                    Create New
                </button>
            </div>

            {error && (
                <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
                    {error}
                </div>
            )}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <RefreshCw className="animate-spin text-blue-500" size={40} />
                </div>
            ) : (
                <SettingsList settings={settings} handleDelete={handleDelete} navigate={navigate} />
            )}
            <Pagination page={page} totalPages={totalPages} onPageChange={fetchSettings} />
        </div>
    );
}
